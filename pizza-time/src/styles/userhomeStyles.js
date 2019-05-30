import styled from 'styled-components';
import { colors, fonts, media } from '../styles/variables.js';

export const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

  export const Inner = styled.div`
    width: 100%;
      ${media.desktop} {
        width: 1100px;
      }

      .tabBox {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        text-align: center;
      }

        .filterBtn {
          width: 130px;
          padding: 10px 0 10px 0;
          border: 1px solid ${colors.lightGray};
          background-color: ${colors.lightGray};
          margin-top: 40px;
          color: ${colors.gray};
          font-family: ${fonts.primary};
          font-weight: 600;
          font-size: 15px;
          text-align: center;
          cursor: pointer;
            &:nth-of-type(2) {
              margin-left: 5px;
              margin-right: 5px;
            }
        }

        .filterBtnActive {
          background-color: ${colors.primary};
          border: 1px solid ${colors.primary};
          color: ${colors.white};
        }

      .tab {
        margin: 20px 0 0 0;
      }
  `;