import { IProcessedDocument } from '../types';

const getWordSet = (documentWordArr: Array<Array<string>>): Array<string> => {
  const wordSet: Set<string> = new Set();
  for (let document of documentWordArr) {
    for (let word of document) {
      wordSet.add(word);
    }
  }
  return Array.from(wordSet);
};

const countTF = (word: string, document: Array<string>) => {
  if (document.length === 0) {
    return 0;
  }

  const wordCount = document.filter((w) => w === word).length;
  return wordCount / document.length;
};

const countIDF = (word: string, documentWordArr: Array<Array<string>>) => {
  const textNumber = documentWordArr.length;
  let wordCount = 0;
  for (let document of documentWordArr) {
    if (document.includes(word)) {
      wordCount++;
    }
  }
  if (wordCount === 0) {
    return 0;
  }
  return Math.log(textNumber / wordCount);
};

const countIDFObject = (wordSet: Array<string>, documentWordArr: Array<Array<string>>) => {
  const IDFObject = {};
  for (let word of wordSet) {
    IDFObject[word] = countIDF(word, documentWordArr);
  }
  return IDFObject;
};

function filterNullVectors(
  documents: Array<IProcessedDocument>,
  termDocumentMatrix: Array<Array<number>>,
) {
  const filteredIndexes = [];

  const filteredTermDocumentMatrix = termDocumentMatrix.filter((vector, index) => {
    if (vector.every((word) => word === 0)) {
      filteredIndexes.push(index);
      return false;
    }
    return true;
  });

  const filteredDocuments = documents.filter(
    (_document, index) => !filteredIndexes.includes(index),
  );

  return {
    termDocumentMatrix: filteredTermDocumentMatrix,
    documents: filteredDocuments,
  };
}

const getTermDocumentMatrix = (documents: Array<IProcessedDocument>) => {
  const documentWordArr = documents.map((document) => document.textArr);

  const wordSet = getWordSet(documentWordArr);
  const IDFObject = countIDFObject(wordSet, documentWordArr);

  const termDocumentMatrix: Array<Array<number>> = [];
  for (let document of documentWordArr) {
    const documentTFIDF = [];
    for (let word of wordSet) {
      documentTFIDF.push(countTF(word, document) * IDFObject[word]);
    }
    termDocumentMatrix.push(documentTFIDF);
  }

  return filterNullVectors(documents, termDocumentMatrix);
};

export default {
  getTermDocumentMatrix,
};
