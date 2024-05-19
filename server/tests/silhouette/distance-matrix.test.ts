import { test, expect, describe, jest } from '@jest/globals';
import distanceMatrix from '../../recommendation/silhouette/distance-matrix';

jest.mock('../../recommendation/clusterization/cosine-similarity', () => {
  return {
    __esModule: true,
    default: jest.fn((a, b) => Number(a.toString() === b.toString())),
  };
});

const data = [
  [0, 1, 0, 0],
  [1, 0, 1, 1],
  [0, 1, 0, 0],
  [0, 1, 0, 0],
];

describe('test distance matrix', () => {
  test('identity distance', () => {
    const result = distanceMatrix(data);
    expect(result).toStrictEqual([
      [1, 0, 1, 1],
      [0, 1, 0, 0],
      [1, 0, 1, 1],
      [1, 0, 1, 1],
    ]);
  });
});
