import styled from "styled-components";
import { colors, fonts, media } from "../styles/variables.js";
import pizza from "../assets/pizza.png";

export const Wrap = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: linear-gradient(
    155.4deg,
    ${colors.secondary} 0%,
    ${colors.primary} 99.11%
  );
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

export const Inner = styled.div`
  display: flex;
  flex-flow: column nowrap;

  h1 {
    font-family: ${fonts.secondary};
    font-size: 56px;
    color: ${colors.white};
      ${media.tablet} { font-size: 58px; }
      ${media.desktop} { font-size: 64px; }
  }

  img {
    width: 300px;
    height: 440px;
    margin-top: 40px;
  }
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;

  .loginBtn,
  .registerBtn {
    background-color: ${colors.white};
    border: 3px solid ${colors.white};
    padding: 8px 20px;
    width: 110px;
    color: ${colors.black};
    text-decoration: none;
    margin: 0 6px;
    font-family: ${fonts.primary};
    font-weight: 600;
    font-size: 15px;
      &:hover {
        color: ${colors.white};
      }
    ${media.tablet} {
      &:hover {
        background-color: ${colors.black};
        border: 3px solid ${colors.black};
        color: ${colors.white};
      }
    }
  }
`;
