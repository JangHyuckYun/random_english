import { IwordList } from '../interface/WordList';
import ViewRandomWord from '../ViewRandomWord';
import styled from 'styled-components';
import { useLocalStorage } from '@rehooks/local-storage';

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Home = () => {
  const test_defaultValue = {
    wordList: [],
  };

  // const [wordListObj] = useLocalStorage<IwordList>('wordList', test_defaultValue);
  let wordListObj = JSON.parse(sessionStorage?.getItem('wordList') || '{}');
  wordListObj = typeof wordListObj === 'string' ? JSON.parse(wordListObj) : wordListObj;

  if (!wordListObj?.wordList) {
    wordListObj = test_defaultValue;
  }

  console.log('wordListObj', wordListObj);

  console.log('wordListObj?.wordList', wordListObj?.wordList, wordListObj);
  return (
    <HomeContainer>
      <ViewRandomWord wordList={wordListObj?.wordList} />
    </HomeContainer>
  );
};

export default Home;
