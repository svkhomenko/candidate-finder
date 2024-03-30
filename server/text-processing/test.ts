import natural from 'natural';
import AggressiveTokenizerUa from './tokenizer';
import TFIDF from './tfidf';

import text from './test-data';

const tokenizer = new AggressiveTokenizerUa();

const testArr = [
  ['цей', 'документ', 'про', 'node'],
  ['цей', 'документ', 'про', 'ruby'],
  ['цей', 'документ', 'про', 'node', 'та', 'ruby'],
  ['цей', 'документ', 'про', 'node', 'тут', 'є', 'node', 'приклад'],
];

const testNatural = () => {
  const tokenizedTextArr = tokenizer.tokenize(text);
  console.log(tokenizedTextArr);
  // const stemmedTextArr = tokenizedTextArr.map((word) => natural.PorterStemmerUk.stem(word));
  // return stemmedTextArr;

  // console.log(TFIDF.getTermDocumentMatrix(testArr));
};

export default testNatural;
