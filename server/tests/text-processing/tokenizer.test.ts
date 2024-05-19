import { test, expect, describe, jest } from '@jest/globals';
import AggressiveTokenizerUa from '../../recommendation/text-processing/tokenizer';

const tokenizer = new AggressiveTokenizerUa();

const data = `Займаюся розробкою макетів для зовнішньої реклами: рекламної продукції (плакати, банери, буклети, календарі, листівки, блокноти, візитки тощо).`;

describe('test tokenizer', () => {
  test('tokenize empty string', () => {
    expect(tokenizer.tokenize('')).toStrictEqual([]);
  });

  test('tokenize string with just stop words', () => {
    expect(tokenizer.tokenize('або, один отож')).toStrictEqual([]);
  });

  test('tokenize regular string', () => {
    expect(tokenizer.tokenize(data)).toStrictEqual([
      'Займаюся',
      'розробкою',
      'макетів',
      'зовнішньої',
      'реклами',
      'рекламної',
      'продукції',
      'плакати',
      'банери',
      'буклети',
      'календарі',
      'листівки',
      'блокноти',
      'візитки',
    ]);
  });
});
