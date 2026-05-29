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

test('Matrix dot product', () => {
  const a = new Matrix(2, 3, [[1, 2, 3], [4, 5, 6]]);
  const b = new Matrix(3, 2, [[7, 8], [9, 1], [2, 3]]);
  const res = Matrix.dot(a, b);
  assert.strictEqual(res.rows, 2);
  assert.strictEqual(res.cols, 2);
  assert.deepStrictEqual(res.data, [
    [1 * 7 + 2 * 9 + 3 * 2, 1 * 8 + 2 * 1 + 3 * 3],
    [4 * 7 + 5 * 9 + 6 * 2, 4 * 8 + 5 * 1 + 6 * 3]
  ]);
  assert.throws(() => Matrix.dot(a, a), /Dot product dimension mismatch/);
});

test('Matrix element-wise operations', () => {
  const a = new Matrix(2, 2, [[1, 2], [3, 4]]);
  const b = new Matrix(2, 2, [[5, 6], [7, 8]]);
  const addRes = a.add(b);
  const subRes = a.subtract(b);
  assert.deepStrictEqual(addRes.data, [[6, 8], [10, 12]]);
  assert.deepStrictEqual(subRes.data, [[-4, -4], [-4, -4]]);
  
  const mismatch = new Matrix(2, 3);
  assert.throws(() => a.add(mismatch), /Addition dimension mismatch/);
  assert.throws(() => a.subtract(mismatch), /Subtraction dimension mismatch/);
});
