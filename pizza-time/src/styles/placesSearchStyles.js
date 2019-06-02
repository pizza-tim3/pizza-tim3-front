import styled from 'styled-components';
import { colors, fonts, media } from '../styles/variables.js';

export const PlacesSearchWrap = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(155.4deg, ${colors.secondary} 0%, ${colors.primary} 99.11%);
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

  export const PlacesSearchInner = styled.div`
    display: flex;
    flex-flow: column nowrap;
    border: 1px solid ${colors.white};
    background-color: ${colors.white};
    border-radius: 10px;
    margin: 40px 0 40px 0;
    width: 80%;

      ${media.mobile} {
        width: 500px;
        margin: 50px 0 50px 0;
      }

    .next {
      // margin: 0px auto;
      margin: 10px auto 24px auto;
      padding: 8px 15px 8px 15px;
      border: 1px solid ${colors.primary};
      background-color: ${colors.primary};
      color: ${colors.white};
      font-family: ${fonts.primary};
      font-size: 16px;
      font-weight: 600;
      width: 150px;
        &:hover {
          border: 1px solid ${colors.primaryDark};
          background-color: ${colors.primaryDark};
        }
    }
  `;