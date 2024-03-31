function cosineSimilarity(A: number[], B: number[]) {
  let sumAiBi = 0;
  let sumAiAi = 0;
  let sumBiBi = 0;

  for (let i = 0; i < A.length; i++) {
    sumAiBi += A[i] * B[i];
    sumAiAi += A[i] * A[i];
    sumBiBi += B[i] * B[i];
  }

  return 1 - sumAiBi / Math.sqrt(sumAiAi * sumBiBi);
}

export default cosineSimilarity;
