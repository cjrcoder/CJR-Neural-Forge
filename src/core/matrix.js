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

  transpose() {
    const result = new Matrix(this.cols, this.rows);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        result.data[j][i] = this.data[i][j];
      }
    }
    return result;
  }
}
