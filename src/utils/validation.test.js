import { test } from 'node:test';
import assert from 'node:assert';
import {
  validationHelper1,
  validationHelper2,
  validationHelper3,
  validationHelper4,
  validationHelper5,
  validationHelper6,
  validationHelper7
} from './validation.js';

test('validationHelper1', () => { assert.strictEqual(validationHelper1(2), true); assert.strictEqual(validationHelper1(1), false); });
test('validationHelper2', () => { assert.strictEqual(validationHelper2(3), true); assert.strictEqual(validationHelper2(2), false); });
test('validationHelper3', () => { assert.strictEqual(validationHelper3(4), true); assert.strictEqual(validationHelper3(3), false); });
test('validationHelper4', () => { assert.strictEqual(validationHelper4(5), true); assert.strictEqual(validationHelper4(4), false); });
test('validationHelper5', () => { assert.strictEqual(validationHelper5(6), true); assert.strictEqual(validationHelper5(5), false); });
test('validationHelper6', () => { assert.strictEqual(validationHelper6(7), true); assert.strictEqual(validationHelper6(6), false); });
test('validationHelper7', () => { assert.strictEqual(validationHelper7(8), true); assert.strictEqual(validationHelper7(7), false); });
