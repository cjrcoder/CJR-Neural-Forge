import { test } from 'node:test';
import assert from 'node:assert';
import {
  mathHelper1
} from './math.js';

test('mathHelper1', () => { assert.strictEqual(mathHelper1(1), 2); });
