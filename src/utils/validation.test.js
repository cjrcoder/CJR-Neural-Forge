import { test } from 'node:test';
import assert from 'node:assert';
import {
  validationHelper1,
  validationHelper2
} from './validation.js';

test('validationHelper1', () => { assert.strictEqual(validationHelper1(2), true); assert.strictEqual(validationHelper1(1), false); });
test('validationHelper2', () => { assert.strictEqual(validationHelper2(3), true); assert.strictEqual(validationHelper2(2), false); });
