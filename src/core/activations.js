export function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

export function sigmoidDerivative(x) {
  const s = sigmoid(x);
  return s * (1 - s);
}

export function tanh(x) {
  return Math.tanh(x);
}

export function tanhDerivative(x) {
  const t = Math.tanh(x);
  return 1 - t * t;
}

export function relu(x) {
  return Math.max(0, x);
}

export function reluDerivative(x) {
  return x > 0 ? 1 : 0;
}

export function softmax(arr) {
  const max = Math.max(...arr);
  const exps = arr.map(x => Math.exp(x - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map(x => x / sum);
}
