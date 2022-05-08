import styled, { css } from 'styled-components';

export const DefaultContainer = styled.div`
  ${({ theme }) => css`
    width: ${theme.containerSize.tablet};
    height: 100%;
    position: relative;
    background-color: rgb(184, 223, 252, 0.7);

    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    left: 50%;
    transform: translateX(-50%);

    @media screen and (max-width: ${theme.containerSize.mobile}) {
      width: ${theme.containerSize.mobile};
    }
  `}
`;
