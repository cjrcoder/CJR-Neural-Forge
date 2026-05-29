import { test } from 'node:test';
import assert from 'node:assert';
import { sigmoid, sigmoidDerivative, tanh, tanhDerivative } from './activations.js';

test('Sigmoid function and derivative values', () => {
  assert.ok(Math.abs(sigmoid(0) - 0.5) < 1e-7);
  assert.ok(sigmoid(10) > 0.99);
  assert.ok(sigmoid(-10) < 0.01);
  assert.ok(Math.abs(sigmoidDerivative(0) - 0.25) < 1e-7);
});

test('Tanh function and derivative values', () => {
  assert.ok(Math.abs(tanh(0) - 0) < 1e-7);
  assert.ok(Math.abs(tanhDerivative(0) - 1) < 1e-7);
});
