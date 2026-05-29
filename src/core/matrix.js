export class Matrix {
  constructor(rows, cols, data = null) {
    this.rows = rows;
    this.cols = cols;
    if (data) {
      if (data.length !== rows || data.some(r => r.length !== cols)) {
        throw new Error('Dimension mismatch with provided data.');
      }
      this.data = data.map(r => [...r]);
    } else {
      this.data = Array(rows).fill(null).map(() => Array(cols).fill(0));
    }
  }
}
