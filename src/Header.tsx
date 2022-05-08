import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const HeaderNav = styled.nav`
  ${({ theme: { textColor } }) => css`
    width: 100%;
    height: 70px;
    position: fixed;
    left: 50%;
    top: 0;
    transform: translateX(-50%);

    z-index: 99;

    ul {
      height: 100%;
      position: relative;
      display: flex;
      justify-content: center;
      align-content: center;

      li {
        display: flex;
        align-items: center;

        a {
          margin: 0 5px;
          color: #676767;
          font-weight: bold;
        }
      }
    }
  `}
`;

export const Header = () => {
  return (
    <HeaderNav>
      <ul>
        <li>
          <Link to={'/wordList'}>Random_WordList</Link>
          <Link to={'/'}>Home</Link>
        </li>
      </ul>
    </HeaderNav>
  );
};
