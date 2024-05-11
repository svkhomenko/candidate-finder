import cosineSimilarity from './cosine-similarity';

export type UniMultiDimensionalArray = Array<any>;
export type Vector = Array<number>;
export type Vectors = Array<Vector>;
export type Centroid = Array<number>;
export type Centroids = Array<Centroid>;

export type IKmeanResult = {
  iterations: number;
  k: number;
  clusterIndexes: number[];
  centroids: Centroids;
};

const MAX_ITERATIONS = 1000;

// K-means++ initial centroid selection
function k_means_pp(data: Vectors, k: number): Centroids {
  if (data.length === k) {
    return data;
  }

  let cents: Centroids = [];
  // Initial random centroid
  let firstCentIndex = Math.floor(Math.random() * data.length);
  let c: Centroid = data[firstCentIndex];
  cents.push(c);
  data = data.filter((v) => v !== c);
  // Get next centroids
  while (cents.length < k) {
    // Find min distances between current centroids and data points
    let distances: Array<number> = [];
    let probs: Array<{
      i: string;
      v: Vector;
      pr: number;
      cs: number;
    }> = [];
    let d_sum = 0;
    for (const i in data) {
      let min = Infinity;
      for (const j in cents) {
        let dist = cosineSimilarity(data[i], cents[j]);
        if (dist <= min) min = dist;
      }
      distances[i] = min;
    }
    // Sum min distances
    for (const i in data) {
      d_sum += distances[i];
    }
    // Probabilities/cumulative prob
    for (const i in data) {
      probs[i] = { i: i, v: data[i], pr: distances[i] / d_sum, cs: 0 };
    }
    probs.sort((a, b) => a.pr - b.pr);
    // Cumulative probs
    probs[0].cs = probs[0].pr;
    for (let i = 1; i < data.length; i++) {
      probs[i].cs = probs[i - 1].cs + probs[i].pr;
    }
    // Gets items where cum sum >= random num
    let rnd = Math.random();
    let idx = 0;
    while (idx < data.length - 1 && probs[idx++].cs < rnd);
    cents.push(probs[idx - 1].v);
    data = data.filter((v) => v !== probs[idx - 1].v);
  }

  return cents;
}

function getClusterIndexes(data: UniMultiDimensionalArray, cents: Centroids) {
  let clusterIndexes: Array<number> = [];

  for (let i = 0; i < data.length; i++) {
    let minDist = Infinity;
    let centIndex = -1;

    for (let j = 0; j < cents.length; j++) {
      let dist = cosineSimilarity(data[i], cents[j]);
      if (dist < minDist) {
        minDist = dist;
        centIndex = j;
      }
    }

    clusterIndexes[i] = centIndex;
  }

  return clusterIndexes;
}

function getNewCents(
  data: UniMultiDimensionalArray,
  cents: Centroids,
  clusterIndexes: Array<number>,
) {
  let newCents: Centroids = [];

  for (let j = 0; j < cents.length; j++) {
    let vectorsCount = 0;
    let cent = new Array(data[0].length).fill(0);

    for (let i = 0; i < data.length; i++) {
      if (clusterIndexes[i] !== j) continue;

      vectorsCount++;
      for (let cord = 0; cord < data[0].length; cord++) {
        cent[cord] += data[i][cord];
      }
    }

    for (let cord = 0; cord < cent.length; cord++) {
      cent[cord] /= vectorsCount;
    }
    newCents[j] = cent;
  }

  return newCents;
}

function kmeans(data: UniMultiDimensionalArray, k: number, init_cent?: Array<any>) {
  if (data.length < 2) {
    return {
      iterations: 0,
      k: k,
      clusterIndexes: [],
      centroids: [],
    };
  }

  let cents: Centroids = [];
  let clusterIndexes: Array<number> = [];
  let centMoved: boolean = false;
  let iterations = MAX_ITERATIONS;

  if (!init_cent) {
    cents = k_means_pp(data, k);
  } else {
    cents = Array.from(init_cent);
  }

  do {
    centMoved = false;
    iterations--;

    clusterIndexes = getClusterIndexes(data, cents);

    let newCents = getNewCents(data, cents, clusterIndexes);

    for (let j = 0; j < cents.length; j++) {
      if (cents[j].toString() !== newCents[j].toString()) {
        centMoved = true;
        break;
      }
    }

    cents = newCents;
  } while (centMoved && iterations > 0);

  return {
    iterations: MAX_ITERATIONS - iterations,
    k: k,
    clusterIndexes: clusterIndexes,
    centroids: cents,
  };
}

export default kmeans;
