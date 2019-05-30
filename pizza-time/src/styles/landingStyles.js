import styled from 'styled-components';
import { colors, fonts, media } from '../styles/variables.js';

export const Wrap = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: linear-gradient(155.4deg, ${colors.secondary} 0%, ${colors.primary} 99.11%);
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

  export const Inner = styled.div`
    display: flex;
    flex-flow: column nowrap;
  `;

    export const Heading = styled.div`
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;

      h1 {
        font-size: 56px;
        color: ${colors.white};
        font-family: ${fonts.secondary};
          ${media.tablet} { font-size: 60px; }
          ${media.desktop} { font-size: 68px; }
      }

      p {
        margin-top: 10px;
        font-size: 15px;
        color: ${colors.white};
        font-family: ${fonts.primary};
        line-height: 18px;
          ${media.tablet} {
            font-size: 16px;
            line-height: 22px;
          }
          ${media.desktop} { 
            font-size: 18px;
            line-height: 26px;
          }
      }
    `;

    export const Buttons = styled.div`
      display: flex;
      justify-content: center;
      margin-top: 54px;
        ${media.tablet} { margin-top: 62px; }
        ${media.desktop} { margin-top: 70px; }

        .loginBtn, .registerBtn {
          border: 3px solid ${colors.white};
          padding: 10px 20px;
          color: ${colors.white};
          text-decoration: none;
          margin: 0 6px;
          font-family: ${fonts.primary};
          font-weight: 600;
          font-size: 15px;
            ${media.tablet} {
              &:hover {
                background-color: ${colors.white};
                color: ${colors.black};
              }
            }
        }
    `;