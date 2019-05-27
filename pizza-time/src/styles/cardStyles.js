import styled from 'styled-components';
import { colors, fonts, media } from '../styles/variables.js';

export const CardBox = styled.div`
  width: 100%;
`;

export const Inner = styled.div`
  width: 86%;
  margin: 0px auto;
  box-shadow: 0 0 6px 0px ${colors.shadow};
  margin-top: 20px;
    ${media.desktop} { width: 100%; }
`;

  export const Content = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 15px 0 15px 0;
      ${media.mobile} { padding: 25px 0 25px 0; }

      img {
        width: 90px;
        height: 80px;
        margin: 0 10px 0 20px;
          ${media.mobile} {
            width: 100px;
            height: 90px;
            margin-left: 25px;
          }
          ${media.tablet} {
            width: 120px;
            height: 110px;
          }
          ${media.desktop} {
            width: 130px;
            height: 120px;
            margin-left: 30px;
          }
      }

      .content {
        text-align: left;
        margin: -3px 0 0 10px;

          p {
            font-family: ${fonts.primary};
            font-size: 15px;
              &:nth-child(2) {
                padding: 5px 0 5px 0;
                  ${media.mobile} { padding: 6px 0 6px 0; }
                  ${media.tablet} { padding: 8px 0 8px 0; }
                  ${media.desktop} { padding: 10px 0 10px 0; }
              }

              ${media.mobile} { font-size: 16px; }
              span { font-weight: 500; }
          }
      }
  `;

  export const Action = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 0 12px 0;
    background-color: ${colors.lightGray};
     ${media.mobile} { padding: 12px 0 12px 0;}

      .comment {
        cursor: pointer;
          img {
            width: 36px;
            height: 36px;
            margin: 4px 0 0 20px;
              ${media.mobile} {
                width: 40px;
                height: 40px;
              }
          }
    
          p {
            color: ${colors.white};
            position: absolute;
            margin: -29px 0 0 34px;
            font-weight: 500;
            font-family: ${fonts.primary};
              ${media.mobile} { margin: -31px 0 0 36px; }
          }
      }

      .buttons {
        margin-right: 20px;

          button {
            border: 1px solid ${colors.primary};
            background-color: ${colors.primary};
            color: ${colors.white};
            font-family: ${fonts.primary};
            font-weight: 600;
            font-size: 15px;
            margin: 4px 10px 0 0;
            padding: 0 14px 0 14px;
            height: 32px;
            border-radius: 3px;
              &:nth-child(2) {
                margin-right: 0;
                border: 1px solid ${colors.white};
                background-color: ${colors.white};
                color: ${colors.gray};
                box-shadow: 0 0 6px 0px ${colors.shadow};
                  &:hover { color: ${colors.black}; }
              }

              ${media.mobile} {
                padding: 0 16px 0 16px;
                height: 34px;
              }
          }
      }
  `;