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
    font-size: 46px;
    color: ${colors.white};
  }

  img {
    width: 100%;
    height: auto;
  }
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 54px;
  ${media.tablet} {
    margin-top: 62px;
  }
  ${media.desktop} {
    margin-top: 70px;
  }

  .loginBtn,
  .registerBtn {
    background-color: transparent;
    border: 3px solid ${colors.white};
    padding: 8px 20px;
    color: ${colors.white};
    text-decoration: none;
    margin: 0 6px;
    font-family: ${fonts.primary};
    font-weight: 600;
    font-size: 15px;
      &:hover {
        background-color: ${colors.white};
        color: ${colors.black};
      }
    ${media.tablet} {
      &:hover {
        background-color: ${colors.white};
        color: ${colors.black};
      }
    }
  }
`;
