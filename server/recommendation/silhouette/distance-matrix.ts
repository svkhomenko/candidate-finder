import cosineSimilarity from '../clusterization/cosine-similarity';
import type { Vectors } from '../clusterization/k-mean';

export default function distanceMatrix(data: Vectors) {
  const result = getMatrix(data.length);

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j <= i; j++) {
      result[i][j] = cosineSimilarity(data[i], data[j]);
      result[j][i] = result[i][j];
    }
  }

  return result;
}

function getMatrix(size: number): Vectors {
  const matrix = [];
  for (let i = 0; i < size; i++) {
    matrix.push(new Array(size).fill(0));
  }
  return matrix;
}
