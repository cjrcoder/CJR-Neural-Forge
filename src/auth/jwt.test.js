import { test } from 'node:test';
import assert from 'node:assert';
import {
  jwtHelper1
} from './jwt.js';

test('jwtHelper1', () => { assert.strictEqual(jwtHelper1('token-1'), true); assert.strictEqual(jwtHelper1('invalid'), false); });
