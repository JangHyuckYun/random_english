import { IwordList, IWordList } from '../interface/WordList';
import styled, { css } from 'styled-components';
import React, { MouseEventHandler, useCallback, useRef, useState } from 'react';
import { IWord } from '../interface/IWord';
import { useLocalStorage, writeStorage } from '@rehooks/local-storage';
import { useBeforeunload } from 'react-beforeunload';
import { DefaultContainer } from '../styles/Containers';
import { DefaultButton } from '../styles/Buttons';

const WordListContainer = styled(DefaultContainer)`
  ${({ theme }) => css`
    input {
      outline: none;
      border: none;
      padding: 5px 25px 5px 5px;
      background-color: #d8e9fc;
      border-radius: 5px;
      color: ${theme.textColor};
      font-weight: bold;
      font-size: ${theme.fonts.size.min};
    }

    .add_word {
      margin-top: 50px;
      padding: 20px 20px 10px 20px;
      width: 70%;
      background-color: aliceblue;
      border-radius: 10px;

      div {
        width: 61%;
        display: flex;
        justify-content: space-between;

        span {
          display: block;
        }

        &:first-child {
          margin-bottom: 10px;
        }
      }

      button {
        margin-top: 3%;
      }
    }

    .words {
      width: 70%;
      max-height: 70%;
      position: relative;
      display: flex;
      flex-direction: column;
      overflow-y: scroll;

      .word {
        box-sizing: border-box;
        color: ${theme.textColor};
        margin: 12px 0 0 0;
        background-color: aliceblue;
        border-radius: 10px;
        padding: 10px;

        div {
          padding: 6px 0;
          b {
            font-weight: bold;
          }
        }
        button {
          margin-top: 3%;
        }
      }
    }
  `}
`;

const test_defaultValue = {
  wordList: [],
};

const WordList = () => {
  let [wordListObj] = useLocalStorage<IwordList>('wordList', test_defaultValue);
  wordListObj = typeof wordListObj === 'string' ? JSON.parse(wordListObj) : wordListObj;

  const [wordList, setWordList] = useState<Array<IWord>>(wordListObj.wordList);

  const saveWordList = useCallback(
    (newWordList?: Array<IWord>): void => {
      writeStorage('wordList', JSON.stringify({ ...wordListObj, wordList: newWordList } || wordListObj));
    },
    [wordListObj],
  );

  const inputEN = useRef<HTMLInputElement>(null);
  const inputKR = useRef<HTMLInputElement>(null);

  const addWord = useCallback(() => {
    const inputENVar: string | undefined = inputEN.current?.value;
    const inputKRVar: string | undefined = inputKR.current?.value;

    if (
      (inputEN.current && inputEN.current.value.trim().length <= 0) ||
      (inputKR.current && inputKR.current.value.trim().length <= 0)
    ) {
      return alert('값이 비어있습니다.');
    }

    const test: IWord = {
      en: inputENVar,
      kr: inputKRVar,
      isModify: false,
      idx: (wordList[wordList.length - 1].idx || 0) + 1,
    };

    setWordList([...wordList, test]);
    saveWordList([...wordList, test]);

    if (inputEN.current && inputKR.current) {
      inputEN.current.value = '';
      inputKR.current.value = '';
    }
  }, [wordList]);

  const toggleIsModify = (idx: number) => {
    let wordListCopy: IWord[] = wordList.slice();

    let wordIdx = wordListCopy.findIndex((word) => word.idx === idx);

    wordListCopy = wordListCopy.map((word, sIdx) => {
      return !word.isModify || wordIdx === sIdx ? word : { ...word, isModify: false };
    });

    wordListCopy[wordIdx].isModify = !wordListCopy[wordIdx].isModify;

    setWordList(wordListCopy);
  };

  interface Idata {
    enValue: string;
    krValue: string;
    idx: number;
  }

  const getData = (target: any) => {
    let parent = target.parentElement?.parentElement || target.parentElement;
    console.log('parent', parent);
    let enValue = parent.querySelector("[name='enWord']")?.value || '';
    let krValue = parent.querySelector("[name='krWord']")?.value || '';
    let idx = Number(target.dataset?.idx || -1);

    return { enValue, krValue, idx };
  };

  const alreadyEnValue = (str: string, checkIdx: number): boolean => {
    console.log(
      'wordList.findIndex((word) => word.en === str && word.idx !== checkIdx)',
      checkIdx,
      wordList.findIndex((word) => word.en === str && Number(word.idx) !== Number(checkIdx)),
    );

    return wordList.findIndex((word) => word.en === str && Number(word.idx) !== Number(checkIdx)) !== -1;
  };

  const wordModify = (target: Event) => {
    let { enValue, krValue, idx }: Idata = getData(target);

    if (alreadyEnValue(enValue, idx)) return alert('이미 중복된 단어가 등록되어 있습니다.');

    if (idx) {
      let wordListCopy = wordList.slice();
      let wordIdx = wordListCopy.findIndex((word) => word.idx === idx);

      // wordListCopy[wordIdx] = {
      //   ...wordListCopy[wordIdx],
      //   isModify: false,
      //   en: enValue,
      //   kr: krValue,
      // };

      wordListCopy[wordIdx].isModify = false;
      wordListCopy[wordIdx].en = enValue;
      wordListCopy[wordIdx].kr = krValue;

      setWordList(wordListCopy);
      saveWordList(wordListCopy);
    } else {
      alert('에러가 발생했습니다.');
    }
  };

  const wordModifyEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
    let { target }: any = event;
    wordModify(target);
  };

  const wordDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    let { target }: any = event;
    let { idx }: Idata = getData(target);
    let wordListCopy = wordList.slice();
    let wordIdx = wordListCopy.findIndex((word) => word.idx === idx);

    if (wordIdx !== -1) {
      wordListCopy.splice(wordIdx, 1);

      setWordList(wordListCopy);
      saveWordList(wordListCopy);
    } else {
      console.log('error');
    }
  };

  useBeforeunload((): void => {
    saveWordList(
      wordList.map((word) => {
        return word.isModify ? { ...word, isModify: false } : word;
      }),
    );
  });

  const checkEnterAndUpdate = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter') {
      addWord();
    }
  };

  const checkWordEnterAndUpdate = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter') {
      let { target }: any = event;
      console.log('target', target);
      wordModifyEvent(target);
    }
  };

  return (
    <WordListContainer>
      <div className="add_word" onKeyDown={checkEnterAndUpdate}>
        <div>
          <span>English: </span>
          <input ref={inputEN} type="text" />
        </div>
        <div>
          <span>Korea: </span>
          <input ref={inputKR} type="text" />
        </div>
        <DefaultButton onClick={addWord}>ADD</DefaultButton>
      </div>
      <div className="words">
        {wordList
          ?.slice()
          .reverse()
          .map((word) => (
            <div
              key={word.idx}
              className={'word'}
              onDoubleClick={() => toggleIsModify(word.idx)}
              onKeyDown={checkWordEnterAndUpdate}
            >
              <div>
                <span>EN_Word: </span>
                {word.isModify ? <input type="text" name={'enWord'} defaultValue={word.en} /> : <b>{word.en}</b>}
              </div>
              <div>
                <span>KR_Word: </span>
                {word.isModify ? <input type="text" name={'krWord'} defaultValue={word.kr} /> : <b>{word.kr}</b>}
              </div>

              <div className="buttonBox">
                {word.isModify ? (
                  <DefaultButton type={'button'} data-idx={word.idx} onClick={wordModifyEvent}>
                    Modify
                  </DefaultButton>
                ) : (
                  <DefaultButton type={'button'} data-idx={word.idx} onClick={wordDelete}>
                    삭제
                  </DefaultButton>
                )}
              </div>
            </div>
          ))}
      </div>
    </WordListContainer>
  );
};

export default WordList;
