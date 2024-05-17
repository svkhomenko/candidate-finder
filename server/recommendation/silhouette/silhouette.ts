import kmeans from '../clusterization/k-mean';
import getSilhouetteScore from './silhouetteScore';
import type { Vectors, IKmeanResult } from '../clusterization/k-mean';

const maxK = 20;

export default function silhouette(termDocumentMatrix: Vectors) {
  let maxSilhouetteScore = -Infinity;
  // let maxSilhouetteScoreK: number;
  let maxKmeansResult: IKmeanResult;

  for (let k = 2; k <= Math.min(termDocumentMatrix.length - 1, maxK); k++) {
    let kmeansResult = kmeans(termDocumentMatrix, k);
    let silhouetteScore = getSilhouetteScore(termDocumentMatrix, kmeansResult.clusterIndexes);

    if (silhouetteScore >= maxSilhouetteScore) {
      maxSilhouetteScore = silhouetteScore;
      // maxSilhouetteScoreK = k;
      maxKmeansResult = kmeansResult;
    }
  }

  return maxKmeansResult;
  // return {
  //   maxSilhouetteScore,
  //   maxSilhouetteScoreK,
  //   kmeansResult: maxKmeansResult,
  // };
}
