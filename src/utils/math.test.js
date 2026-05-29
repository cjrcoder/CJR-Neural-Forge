import { test } from 'node:test';
import assert from 'node:assert';
import {
  mathHelper1,
  mathHelper2
} from './math.js';

test('mathHelper1', () => { assert.strictEqual(mathHelper1(1), 2); });
test('mathHelper2', () => { assert.strictEqual(mathHelper2(1), 3); });
