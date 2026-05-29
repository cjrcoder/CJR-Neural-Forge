import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const QUEUE_FILE = '.drafts/queue.json';
const STATE_FILE = '.drafts/state.json';

// Ensure drafts directory exists
if (!fs.existsSync('.drafts')) {
  fs.mkdirSync('.drafts');
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

async function processQueue(delayMs = 1000, dryRun = false) {
  const queue = loadQueue();
  const state = loadState();
  const completedSet = new Set(state.completedIds);

  console.log(`Pacer loaded ${queue.length} tasks. ${completedSet.size} completed.`);

  for (const task of queue) {
    if (completedSet.has(task.id)) {
      continue;
    }

    console.log(`\nProcessing task ${task.id}: ${task.message}`);

    if (!dryRun) {
      // 1. Write the file content
      const dir = path.dirname(task.file);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(task.file, task.content, 'utf8');
      console.log(`Wrote content to ${task.file}`);

      // 2. Run tests if specified
      if (task.testCmd) {
        console.log(`Running validation: ${task.testCmd}`);
        const testRes = runCommand(task.testCmd);
        if (!testRes.success) {
          console.error(`Validation failed for task ${task.id}:\n`, testRes.output);
          process.exit(1);
        }
        console.log('Validation passed!');
      }

      // 3. Stage and Commit
      const stageRes = runCommand(`git add "${task.file}"`);
      if (!stageRes.success) {
        console.error(`Failed to stage file ${task.file}:\n`, stageRes.output);
        process.exit(1);
      }

      const commitRes = runCommand(`git commit -m "${task.message}"`);
      if (!commitRes.success) {
        console.error(`Failed to commit:\n`, commitRes.output);
        process.exit(1);
      }
      console.log(`Committed: ${task.message}`);

      // 4. Update and Save State
      state.completedIds.push(task.id);
      saveState(state);
    } else {
      console.log(`[DRY RUN] Would write to ${task.file}`);
      console.log(`[DRY RUN] Would run: ${task.testCmd}`);
      console.log(`[DRY RUN] Would commit: "${task.message}"`);
      state.completedIds.push(task.id);
    }

    // Delay between commits
    if (delayMs > 0) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }

  console.log('\nAll tasks in queue completed.');
}

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const delayArg = args.find(a => a.startsWith('--delay='));
const delayMs = delayArg ? parseInt(delayArg.split('=')[1], 10) : 1000;

processQueue(delayMs, dryRun);
