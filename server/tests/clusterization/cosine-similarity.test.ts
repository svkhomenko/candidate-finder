import { test, expect, describe } from '@jest/globals';
import cosineSimilarity from '../../recommendation/clusterization/cosine-similarity';

const data = [
  [
    [0, 0.52698, 0.90294, 0.28893, 0.14137, 0.62587, 0.89593],
    [0.52698, 0, 0.29174, 0.23254, 0.94646, 0.29426, 0.77368],
    0.386083,
  ],
  [
    [0.90294, 0.29174, 0, 0.62262, 0.77274, 0, 0],
    [0.28893, 0.23254, 0.62262, 0, 0.15675, 0.13105, 0],
    0.56487,
  ],
  [
    [0.14137, 0.94646, 0.77274, 0.15675, 0, 0, 0.26178],
    [0.62587, 0.29426, 0.95896, 0.13815, 0.29876, 0, 0.85578],
    0.286066,
  ],
];

describe('test cosine similarity', () => {
  test.each(data)('cosine similarity is correct value', (a: number[], b: number[], res: number) => {
    expect(cosineSimilarity(a, b)).toBeCloseTo(res);
  });
});
