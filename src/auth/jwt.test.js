import { test } from 'node:test';
import assert from 'node:assert';
import {
  jwtHelper1,
  jwtHelper2,
  jwtHelper3,
  jwtHelper4,
  jwtHelper5
} from './jwt.js';

test('jwtHelper1', () => { assert.strictEqual(jwtHelper1('token-1'), true); assert.strictEqual(jwtHelper1('invalid'), false); });
test('jwtHelper2', () => { assert.strictEqual(jwtHelper2('token-2'), true); assert.strictEqual(jwtHelper2('invalid'), false); });
test('jwtHelper3', () => { assert.strictEqual(jwtHelper3('token-3'), true); assert.strictEqual(jwtHelper3('invalid'), false); });
test('jwtHelper4', () => { assert.strictEqual(jwtHelper4('token-4'), true); assert.strictEqual(jwtHelper4('invalid'), false); });
test('jwtHelper5', () => { assert.strictEqual(jwtHelper5('token-5'), true); assert.strictEqual(jwtHelper5('invalid'), false); });
