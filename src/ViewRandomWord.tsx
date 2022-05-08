import { IwordList } from './interface/WordList';
import { useState } from 'react';
import { IWord } from './interface/IWord';
import styled, { css } from 'styled-components';
import { Line } from 'rc-progress';
import { DefaultButton } from './styles/Buttons';
import { DefaultContainer } from './styles/Containers';

const ViewRandomWordContainer = styled(DefaultContainer)`
  ${({ theme }) => css`
    & * {
      font-size: ${theme.fonts.size.min};
      font-weight: bold;
    }

    .state {
      width: 100%;
      position: absolute;
      top: 0;

      path {
        background: red;
      }
    }

    .wordBoxs {
      width: 70%;
      height: 25%;
      background-color: aliceblue;
      border-radius: 10px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      text-align: center;

      .wordBox {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;

        &.result {
          width: 100%;
          height: 30%;
          justify-content: center;
          border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        }

        &.mean_result {
          min-height: 55%;
          height: auto;
          padding: 25px 0 15px 0;
          justify-content: space-between;
        }
      }
    }

    & > div {
      margin: 10px 0;
    }

    .buttonBox {
      .row {
        display: flex;
        justify-content: center;
      }
    }
  `}
`;

const ViewRandomWord = ({ wordList }: IwordList) => {
  const randomSort = (): IWord[] => {
    return (
      JSON.parse(JSON.stringify(wordList || '[]'))
        ?.slice()
        .sort(() => Math.random() - 0.5) || []
    );
  };

  const [randomWordList, setRandomWordList] = useState<IWord[]>(randomSort());
  const [resultWord, setResultWord] = useState<IWord>(
    randomWordList ? randomWordList[0] : { en: '', kr: '', isModify: false, idx: -1 },
  );
  const [stateLen, setStateLen] = useState(1);
  const [hiddenKrWord, setHiddenKrWord] = useState<boolean>(true);

  const viewPrevWord = () => {
    setStateLen(stateLen - 1);
    setResultWord(randomWordList[stateLen - 2]);

    if (!hiddenKrWord) {
      toggleWord_kr();
    }
  };

  const viewNextWord = () => {
    setStateLen(stateLen + 1);
    setResultWord(randomWordList[stateLen]);

    if (!hiddenKrWord) {
      toggleWord_kr();
    }
  };

  const toggleWord_kr = () => {
    setHiddenKrWord(!hiddenKrWord);
  };

  const relocation = () => {
    setRandomWordList(randomSort());

    setStateLen(1);
    setResultWord(randomWordList[0]);
  };

  return (
    <ViewRandomWordContainer>
      <div className="state">
        <Line
          className={'state'}
          percent={Math.floor((stateLen / (randomWordList?.length || 1)) * 100)}
          strokeWidth={2}
          strokeColor="#5490fb"
        />
      </div>
      <div />
      <div className={'wordBoxs'}>
        <div className="result wordBox">
          <h2>{resultWord.en}</h2>
        </div>
        <div className="mean_result wordBox">
          <h2 className={hiddenKrWord ? 'hidden' : ''}>{resultWord.kr}</h2>
          <DefaultButton onClick={toggleWord_kr}>{hiddenKrWord ? '뜻 보기' : '뜻 숨기기'}</DefaultButton>
        </div>
      </div>
      <div className="buttonBox">
        <div className="row">
          {stateLen - 1 <= 0 ? '' : <DefaultButton onClick={viewPrevWord}>{'<<'}</DefaultButton>}
          {stateLen - 1 >= (randomWordList?.length || 0) - 1 ? (
            ''
          ) : (
            <DefaultButton onClick={viewNextWord}>{'>>'}</DefaultButton>
          )}
        </div>
        <div className="row">
          <DefaultButton onClick={relocation}>다시하기 (재배치)</DefaultButton>
        </div>
      </div>
    </ViewRandomWordContainer>
  );
};

export default ViewRandomWord;
