import styled from 'styled-components';
import { colors, fonts, media } from '../styles/variables.js';

export const SearchContainer = styled.div`
  input {
    width: 90%;
    margin-top: 15px;
    border-radius: 6px;
    border: 1px solid ${colors.white};
    box-shadow: 0 0 8px ${colors.shadow};
    height: 36px;
    padding: 0 0 0 10px;
    font-family: ${fonts.primary};
    font-size: 16px;
    ::placeholder { color: ${colors.formPlaceholder}; }

      ${media.mobile} {
        height: 42px;
        font-size: 18px;
      }
      ${media.tablet} {
        height: 46px;
        font-size: 20px;
      }
      ${media.desktop} {
        height: 50px;
      }
  }

  button {
    margin: 15px 0 15px 0;
    width: 116px;
    font-family: ${fonts.primary};
    border: 1px solid ${colors.primary};
    background-color: ${colors.primary};
    color: ${colors.white};
    padding: 6px 0 6px 0;
  }
`;