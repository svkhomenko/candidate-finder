import distanceMatrix from './distance-matrix';
import type { Vector, Vectors } from '../clusterization/k-mean';

export default function getSilhouetteScore(data: Vectors, labels: Vector): number {
  let dist = distanceMatrix(data);
  let result = silhouetteSamples(dist, labels, silhouetteReduce);
  return result.reduce(
    (accumulator, currentValue, index) => accumulator + (currentValue - accumulator) / (index + 1),
    0,
  );
}

type ReduceFunction = (
  data: Vectors,
  labels: Vector,
  labelsFreq: Vector,
) => {
  intraDist: Vector;
  interDist: Vector;
};

export function silhouetteSamples(
  data: Vectors,
  labels: Vector,
  reduceFunction: ReduceFunction,
): Vector {
  let labelsFreq = countFreq(labels);
  let samples = reduceFunction(data, labels, labelsFreq);
  let denom = labels.map((val) => labelsFreq[val] - 1);
  let intra = samples.intraDist.map((val, ind) => (denom[ind] ? val / denom[ind] : 0));
  let inter = samples.interDist;
  return inter
    .map((val, ind) => val - intra[ind])
    .map((val, ind) => val / Math.max(intra[ind], inter[ind]));
}

export function countFreq(arr: Vector): Vector {
  let valid = arr.every((val) => {
    if (typeof val !== 'number') return false;
    return val >= 0.0 && Math.floor(val) === val && val !== Infinity;
  });
  if (!valid) throw new Error('Array must contain only natural numbers');

  let result = new Array(Math.max(...arr) + 1).fill(0);
  arr.forEach((value) => {
    result[value]++;
  });
  return result;
}

export const silhouetteReduce: ReduceFunction = (dataChunk, labels, labelFrequencies) => {
  let clusterDistances = dataChunk.map((row) =>
    labelFrequencies.map((_, mInd) =>
      labels.reduce(
        (accumulator, currentValue, rInd) =>
          currentValue === mInd ? accumulator + row[rInd] : accumulator,
        0,
      ),
    ),
  );
  let intraDist = clusterDistances.map((value, index) => value[labels[index]]);
  let interDist = clusterDistances
    .map((mVal, mInd) => {
      mVal[labels[mInd]] += Infinity;
      labelFrequencies.forEach((fVal, fInd) => (mVal[fInd] /= fVal));
      return mVal;
    })
    .map((val) => Math.min(...val));
  return {
    intraDist: intraDist,
    interDist: interDist,
  };
};
