import { test } from 'node:test';
import assert from 'node:assert';
import { Matrix } from './matrix.js';

test('Matrix instantiation', () => {
  const m = new Matrix(2, 3);
  assert.strictEqual(m.rows, 2);
  assert.strictEqual(m.cols, 3);
  assert.deepStrictEqual(m.data, [[0, 0, 0], [0, 0, 0]]);
});

test('Matrix validation with data', () => {
  const data = [[1, 2], [3, 4]];
  const m = new Matrix(2, 2, data);
  assert.deepStrictEqual(m.data, data);
  assert.throws(() => new Matrix(2, 3, data), /Dimension mismatch/);
});

test('Matrix transposition', () => {
  const data = [[1, 2, 3], [4, 5, 6]];
  const m = new Matrix(2, 3, data);
  const t = m.transpose();
  assert.strictEqual(t.rows, 3);
  assert.strictEqual(t.cols, 2);
  assert.deepStrictEqual(t.data, [[1, 4], [2, 5], [3, 6]]);
});
