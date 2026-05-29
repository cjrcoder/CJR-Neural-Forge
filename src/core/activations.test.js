import { test } from 'node:test';
import assert from 'node:assert';
import { 
  sigmoid, 
  sigmoidDerivative, 
  tanh, 
  tanhDerivative, 
  relu, 
  reluDerivative, 
  softmax 
} from './activations.js';

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

test('ReLU function and derivative values', () => {
  assert.strictEqual(relu(5), 5);
  assert.strictEqual(relu(-5), 0);
  assert.strictEqual(reluDerivative(3), 1);
  assert.strictEqual(reluDerivative(-2), 0);
});

test('Softmax normalization function', () => {
  const input = [1, 2, 3];
  const output = softmax(input);
  const sum = output.reduce((a, b) => a + b, 0);
  assert.ok(Math.abs(sum - 1.0) < 1e-7);
  assert.ok(output[2] > output[1]);
  assert.ok(output[1] > output[0]);
});
