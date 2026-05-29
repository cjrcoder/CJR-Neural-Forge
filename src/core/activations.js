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
