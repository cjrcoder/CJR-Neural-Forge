import { test } from 'node:test';
import assert from 'node:assert';
import {
  mathHelper1,
  mathHelper2,
  mathHelper3,
  mathHelper4
} from './math.js';

test('mathHelper1', () => { assert.strictEqual(mathHelper1(1), 2); });
test('mathHelper2', () => { assert.strictEqual(mathHelper2(1), 3); });
test('mathHelper3', () => { assert.strictEqual(mathHelper3(1), 4); });
test('mathHelper4', () => { assert.strictEqual(mathHelper4(1), 5); });
