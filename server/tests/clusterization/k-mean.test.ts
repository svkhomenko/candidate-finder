import { test, expect, describe } from '@jest/globals';
import kmeans, {
  getClusterIndexes,
  getNewCents,
  k_means_pp,
} from '../../recommendation/clusterization/k-mean';
import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';
expect.extend({ toBeDeepCloseTo });

const data = [
  [0, 12, 4, 6, 2, 10, 10],
  [12, 0, 14, 14, 12, 2, 1],
  [4, 14, 0, 1, 2, 12, 12],
  [6, 14, 1, 0, 4, 13, 12],
  [2, 12, 2, 4, 0, 11, 11],
  [10, 2, 12, 13, 11, 0, 1],
  [10, 1, 12, 12, 11, 1, 0],
];

const cents = [
  [2, 12, 2, 4, 0, 11, 11],
  [10, 2, 12, 13, 11, 0, 1],
];

const clusterIndexes = [0, 1, 0, 0, 0, 1, 1];

const kmeansData = [
  [1, 0, 0, 1],
  [1.1, 0, 0, 0.9],
  [0, 1, 1, 0],
  [1, 0.9, 1, 0],
  [1.2, 0, 0, 1.1],
];

describe('test k-means', () => {
  test('getClusterIndexes function correct output', () => {
    expect(getClusterIndexes(data, cents)).toStrictEqual(clusterIndexes);
  });

  test('getNewCents function correct output', () => {
    (expect(getNewCents(data, cents, clusterIndexes)) as any).toBeDeepCloseTo([
      [3, 13, 1.75, 2.75, 2, 11.5, 11.25],
      [10.66667, 1, 12.66667, 13, 11.33333, 1, 0.66667],
    ]);
  });

  test('k_means_pp function returns all points when number of points is equal to k', () => {
    expect(k_means_pp(data, 7)).toStrictEqual(data);
  });

  test('k_means_pp function returns k points from data', () => {
    const result = k_means_pp(data, 2);

    expect(result.length).toEqual(2);
    result.forEach((center) => {
      expect(data.includes(center)).toBeTruthy();
    });
  });

  test('kmeans function returns default object when number of points < 2', () => {
    expect(kmeans([], 3)).toMatchObject({
      iterations: 0,
      k: 3,
      clusterIndexes: [],
      centroids: [],
    });
  });

  test('kmeans function returns correct k, centroids.length and clusterIndexes', () => {
    const result = kmeans(kmeansData, 2);

    expect(result.k).toEqual(2);
    expect(result.centroids.length).toEqual(2);
    expect(result.clusterIndexes[0]).toEqual(result.clusterIndexes[4]);
  });
});
