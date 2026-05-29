import { test } from 'node:test';
import assert from 'node:assert';
import {
  validationHelper1
} from './validation.js';

test('validationHelper1', () => { assert.strictEqual(validationHelper1(2), true); assert.strictEqual(validationHelper1(1), false); });
