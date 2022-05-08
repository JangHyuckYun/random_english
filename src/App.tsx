import Router from './Router';
import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    ${reset}
    html,body, #root {
      width: 100%;
      height: 100vh;
      position: relative;
      overflow: hidden;
    }
    * {
      text-decoration: none;
      box-sizing: border-box;
    }
    
    .none {
      display: none;
    }
    
    .hidden {
      visibility: hidden;
    }
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
};

export default App;
