import natural from 'natural';
import AggressiveTokenizerUa from './tokenizer';
import TFIDF from './tfidf';
import { IDocument, IProcessedDocument } from '../types';

const tokenizer = new AggressiveTokenizerUa();

function tokeniseAndStemmed(test: string) {
  const tokenizedTextArr = tokenizer.tokenize(test);
  return tokenizedTextArr.map((word) => natural.PorterStemmerUk.stem(word));
}

function getTermDocumentMatrix(processedDocuments: Array<IProcessedDocument>) {
  return TFIDF.getTermDocumentMatrix(processedDocuments);
}

function textProcessing(documents: Array<IDocument>) {
  let processedDocuments: Array<IProcessedDocument> = documents.map((document, index) => ({
    id: document.id,
    textArr: tokeniseAndStemmed(document.description),
    type: document.type,
    index,
  }));

  return getTermDocumentMatrix(processedDocuments);
}

export default textProcessing;
export { tokeniseAndStemmed, getTermDocumentMatrix };
