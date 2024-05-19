import { test, expect, describe } from '@jest/globals';
import TFIDF from '../../recommendation/text-processing/tfidf';
import { toBeDeepCloseTo, toMatchCloseTo } from 'jest-matcher-deep-close-to';
expect.extend({ toBeDeepCloseTo, toMatchCloseTo });

const documentsArr = [
  ['цей', 'документ', 'про', 'node'],
  ['цей', 'документ', 'про', 'ruby'],
  ['цей', 'документ', 'про', 'node', 'та', 'ruby'],
  ['цей', 'документ', 'про', 'node', 'тут', 'є', 'node', 'приклад'],
  ['цей', 'документ', 'про'],
];

const wordsSet = ['цей', 'документ', 'про', 'node', 'ruby', 'та', 'тут', 'є', 'приклад'];

const documents = [
  {
    id: 1,
    textArr: ['цей', 'документ', 'про', 'node'],
    type: 'resume' as const,
  },
  {
    id: 2,
    textArr: ['цей', 'документ', 'про', 'ruby'],
    type: 'resume' as const,
  },
];

const termDocumentMatrix = [
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
];

const termDocumentMatrixWithNullVector = [
  [1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0],
];

describe('test tfidf', () => {
  test('getWordSet function returns set of unique words', () => {
    expect(TFIDF.getWordSet(documentsArr)).toStrictEqual(wordsSet);
  });

  test('countTF function returns 0 when document.length === 0', () => {
    expect(TFIDF.countTF('word', [])).toEqual(0);
  });

  test('countTF function returns 0 when there is no such word in the string', () => {
    expect(TFIDF.countTF('word', documentsArr[0])).toEqual(0);
  });

  test('countTF function returns tf when there is the word in the string', () => {
    expect(TFIDF.countTF('документ', documentsArr[0])).toEqual(0.25);
  });

  test('countTF function returns tf when there are several such words in the string', () => {
    expect(TFIDF.countTF('node', documentsArr[3])).toEqual(0.25);
  });

  test('countIDF function returns 0 when there is no such word in documents', () => {
    expect(TFIDF.countIDF('word', documentsArr)).toEqual(0);
  });

  test('countIDF function returns idf when there are several such words in documents', () => {
    expect(TFIDF.countIDF('node', documentsArr)).toBeCloseTo(0.51083);
  });

  test('countIDF function returns 0 when every document contains such words', () => {
    expect(TFIDF.countIDF('документ', documentsArr)).toEqual(0);
  });

  test('filterNullVectors function returns documents and termDocumentMatrix without null vectors', () => {
    const asExpected = {
      termDocumentMatrix: [termDocumentMatrixWithNullVector[0]],
      documents: [documents[0]],
    };

    expect(TFIDF.filterNullVectors(documents, termDocumentMatrixWithNullVector)).toMatchObject(
      asExpected,
    );
  });

  test('filterNullVectors function changes nothing there is no null vector', () => {
    const asExpected = {
      termDocumentMatrix: termDocumentMatrix,
      documents: documents,
    };

    expect(TFIDF.filterNullVectors(documents, termDocumentMatrix)).toEqual(asExpected);
  });

  test('getTermDocumentMatrix function returns documents and termDocumentMatrix without null vectors', () => {
    const asExpected = {
      termDocumentMatrix: [
        [0, 0, 0, 0.17329, 0],
        [0, 0, 0, 0, 0.17329],
      ],
      documents: documents,
    };

    (expect(TFIDF.getTermDocumentMatrix(documents)) as any).toMatchCloseTo(asExpected);
  });
});
