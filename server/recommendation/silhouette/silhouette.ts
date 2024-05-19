import kmeans from '../clusterization/k-mean';
import getSilhouetteScore from './silhouette-score';
import type { Vectors, IKmeanResult } from '../clusterization/k-mean';

const maxK = 20;

export default function silhouette(termDocumentMatrix: Vectors) {
  let maxSilhouetteScore = -Infinity;
  let maxKmeansResult: IKmeanResult;

  for (let k = 2; k <= Math.min(Math.sqrt(termDocumentMatrix.length), maxK); k++) {
    for (let i = 0; i < 5; i++) {
      let kmeansResult = kmeans(termDocumentMatrix, k);
      let silhouetteScore = getSilhouetteScore(termDocumentMatrix, kmeansResult.clusterIndexes);

      if (silhouetteScore >= maxSilhouetteScore) {
        maxSilhouetteScore = silhouetteScore;
        maxKmeansResult = kmeansResult;
      }
    }
  }

  return maxKmeansResult;
}
