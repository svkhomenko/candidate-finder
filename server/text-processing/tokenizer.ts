import stopWords from './stop-words';

class AggressiveTokenizerUa {
  clearText(text: string) {
    const regex = new RegExp(`(?<=\\s|^)(${stopWords.join('|')})(?=\\s|$)`, 'gi');

    return text
      .replace(/[^a-zа-яґєії’']/gi, ' ')
      .replace(regex, '')
      .replace(/[\s\n]+/g, ' ')
      .trim();
  }

  tokenize(text: string) {
    return this.clearText(text).split(' ');
  }
}

export default AggressiveTokenizerUa;
