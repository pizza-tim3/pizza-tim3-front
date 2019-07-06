import styled from 'styled-components';
import { colors, fonts, media } from '../styles/variables.js';

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  margin: 0 auto;
  border: 2px solid #EEE;
  border-radius: 20px;
  box-shadow: 4px 5px 6px #CDCDCD;

  input {
    border: none;
    padding: 5px;
    margin: 5px;
    width: 86%;

    ::focus {
      background: transparent;
    }
  }

  button {
    border: none;
    background: linear-gradient(155.4deg, ${colors.secondary} 0%, ${colors.primary} 99.11%);
    justify-self: flex-end;
    border-top-right-radius: 18px;
    border-bottom-right-radius: 18px;
  }

  img {
    width: 40px;
    height: 40px;
  }
 
`;

// input {
//   width: 90%;
//   margin-top: 15px;
//   border-radius: 6px;
//   border: 1px solid ${colors.white};
//   box-shadow: 0 0 8px ${colors.shadow};
//   height: 36px;
//   padding: 0 0 0 10px;
//   font-family: ${fonts.primary};
//   font-size: 16px;
//   ::placeholder { color: ${colors.formPlaceholder}; }

//     ${media.mobile} {
//       height: 42px;
//       font-size: 18px;
//     }
//     ${media.tablet} {
//       height: 46px;
//       font-size: 20px;
//     }
//     ${media.desktop} {
//       height: 50px;
//     }
// }
