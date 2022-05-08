import { IWordList } from './WordList';

export interface IWordListObj {
  wordList: IWordList;
  saveWordList?(): void;
}
