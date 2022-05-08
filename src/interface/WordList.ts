import { IWord } from './IWord';

export interface IwordList {
  wordList: Array<IWord>;
}

export interface IWordList {
  wordList: IwordList;
  saveWordList?(newWordList: Array<IWord>): void;
}
