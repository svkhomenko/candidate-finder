import natural from 'natural';
import AggressiveTokenizerUa from './tokenizer';
import TFIDF from './tfidf';

import kmeans from '../clusterization/k-mean';

import text, { textArr } from './test-data';

const tokenizer = new AggressiveTokenizerUa();

const testArr = [
  ['цей', 'документ', 'про', 'node'],
  ['цей', 'документ', 'про', 'ruby'],
  ['цей', 'документ', 'про', 'node', 'та', 'ruby'],
  ['цей', 'документ', 'про', 'node', 'тут', 'є', 'node', 'приклад'],
  ['цей', 'документ', 'про'],
];

const testNatural = () => {
  // const tokenizedTextArr = tokenizer.tokenize(textArr[1]);
  // console.log(tokenizedTextArr);
  // const stemmedTextArr = tokenizedTextArr.map((word) => natural.PorterStemmerUk.stem(word));
  // console.log(stemmedTextArr);
  // return stemmedTextArr;

  // console.log(TFIDF.getTermDocumentMatrix(testArr));
  const { filteredTermDocumentMatrix: termDocumentMatrix } = TFIDF.getTermDocumentMatrix(testArr);
  console.log('termDocumentMatrix', termDocumentMatrix);
  console.log(kmeans(termDocumentMatrix, 2));
};

export default testNatural;
