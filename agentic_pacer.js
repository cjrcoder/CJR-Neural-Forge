import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const QUEUE_FILE = '.drafts/queue.json';
const STATE_FILE = '.drafts/state.json';

if (!fs.existsSync('.drafts')) {
  fs.mkdirSync('.drafts');
}

function getCommitCount() {
  try {
    const stdout = execSync('git rev-list --count HEAD', { encoding: 'utf8' });
    return parseInt(stdout.trim(), 10);
  } catch (err) {
    console.error('Error getting commit count:', err.message);
    return 0;
  }
}

function loadQueue() {
  if (!fs.existsSync(QUEUE_FILE)) {
    return [];
  }
  try {
    return JSON.parse(fs.readFileSync(QUEUE_FILE, 'utf8'));
  } catch (err) {
    console.error('Error reading queue file:', err);
    return [];
  }
}

function loadState() {
  if (!fs.existsSync(STATE_FILE)) {
    return { completedIds: [] };
  }
  try {
    return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
  } catch (err) {
    console.error('Error reading state file:', err);
    return { completedIds: [] };
  }
}

function saveState(state) {
  try {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing state file:', err);
  }
}

function runCommand(cmd) {
  try {
    const stdout = execSync(cmd, { stdio: 'pipe', encoding: 'utf8' });
    return { success: true, output: stdout };
  } catch (err) {
    return { success: false, output: err.stdout || err.message };
  }
}

async function processQueue(delayMs = 100, dryRun = false) {
  const queue = loadQueue();
  const state = loadState();
  const completedSet = new Set(state.completedIds);

  console.log(`Pacer loaded ${queue.length} tasks. State has ${completedSet.size} completed.`);

  let localCommitsSincePush = 0;

  for (const task of queue) {
    // Check total commit count
    const currentCommits = getCommitCount();
    console.log(`Current commit count: ${currentCommits} / 509`);
    if (currentCommits >= 509) {
      console.log('Target of exactly 509 commits reached. Halting execution.');
      // Push final commits
      console.log('Executing final git push...');
      const pushRes = runCommand('git push origin main');
      if (pushRes.success) {
        console.log('Final push succeeded!');
      } else {
        console.error('Final push failed:\n', pushRes.output);
      }
      process.exit(0);
    }

    if (completedSet.has(task.id)) {
      continue;
    }

    console.log(`\nProcessing task ${task.id}: ${task.message}`);

    if (!dryRun) {
      // 1. Write file
      const dir = path.dirname(task.file);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(task.file, task.content, 'utf8');

      // 2. Validate tests
      if (task.testCmd) {
        const testRes = runCommand(task.testCmd);
        if (!testRes.success) {
          console.error(`Validation failed for task ${task.id}:\n`, testRes.output);
          process.exit(1);
        }
      }

      // 3. Stage & Commit
      const stageRes = runCommand(`git add "${task.file}"`);
      if (!stageRes.success) {
        console.error(`Failed to stage ${task.file}:\n`, stageRes.output);
        process.exit(1);
      }

      const commitRes = runCommand(`git commit -m "${task.message}"`);
      if (!commitRes.success) {
        console.error(`Failed to commit:\n`, commitRes.output);
        process.exit(1);
      }
      console.log(`Committed: ${task.message}`);

      state.completedIds.push(task.id);
      saveState(state);

      localCommitsSincePush++;

      // Batch pushing (every 50 commits)
      if (localCommitsSincePush >= 50) {
        console.log('Staged 50 local commits. Executing batch git push...');
        const pushRes = runCommand('git push origin main');
        if (pushRes.success) {
          console.log('Batch push succeeded.');
          localCommitsSincePush = 0;
        } else {
          console.error('Batch push failed:\n', pushRes.output);
          process.exit(1);
        }
      }
    } else {
      console.log(`[DRY RUN] Would process task ${task.id}: ${task.message}`);
      state.completedIds.push(task.id);
    }

    if (delayMs > 0) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }

  // Final check after queue finishes
  const finalCommits = getCommitCount();
  console.log(`Queue empty. Final commit count: ${finalCommits}`);
  console.log('Executing final git push...');
  const pushRes = runCommand('git push origin main');
  if (pushRes.success) {
    console.log('Final push succeeded.');
  } else {
    console.error('Final push failed:\n', pushRes.output);
  }
}

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const delayArg = args.find(a => a.startsWith('--delay='));
const delayMs = delayArg ? parseInt(delayArg.split('=')[1], 10) : 100;

processQueue(delayMs, dryRun);
