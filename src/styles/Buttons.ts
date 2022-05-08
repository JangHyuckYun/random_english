import styled, { css } from 'styled-components';

export const DefaultButton = styled.button`
  ${({ theme }) => css`
    padding: 7px 25px;
    border-radius: 5px;
    border: none;
    margin: 5px 0;
    background-color: #8185ee;

    color: #fff;
    font-weight: bold;
    font-size: ${theme.fonts.size.min};
    cursor: pointer;
  `}
`;
