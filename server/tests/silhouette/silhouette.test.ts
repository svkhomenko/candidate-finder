import { test, expect, describe, jest } from '@jest/globals';
import silhouette from '../../recommendation/silhouette/silhouette';

jest.mock('../../recommendation/clusterization/k-mean', () => {
  return {
    __esModule: true,
    default: jest.fn((_termDocumentMatrix, k) => ({
      clusterIndexes: k,
    })),
  };
});

jest.mock('../../recommendation/silhouette/silhouette-score', () => {
  return {
    __esModule: true,
    default: jest.fn((_termDocumentMatrix, clusterIndexes) => clusterIndexes),
  };
});

const data = [
  [1, 1, 0, 0],
  [1, 0, 1, 1],
  [0, 0, 1, 0],
  [0, 0, 1, 1],
  [0, 0, 1, 1],
  [0, 0, 1, 1],
  [0, 0, 1, 1],
  [0, 0, 1, 1],
  [0, 0, 1, 1],
];

describe('test silhouette', () => {
  test('find max silhouette score', () => {
    const result = silhouette(data);
    expect(result).toMatchObject({
      clusterIndexes: 3,
    });
  });
});
