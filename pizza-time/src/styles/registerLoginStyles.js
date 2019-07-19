import styled from "styled-components";
import { colors, fonts, media } from "../styles/variables.js";

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

export const Form = styled.form`
  width: 400px;
  border-radius: 6px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 34px;
  background-color: ${colors.white};

  h1 {
    font-size: 50px;
    color: ${colors.black};
    font-family: ${fonts.secondary};
    padding: 5px 0 40px 0;
    background: linear-gradient(
      155.4deg,
      ${colors.secondary} 0%,
      ${colors.primary} 99.11%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    ${media.tablet} {
      font-size: 52px;
    }
    ${media.desktop} {
      font-size: 58px;
    }
  }

  input {
    padding: 8px 0 8px 8px;
    border: 1px solid ${colors.white};
    margin-bottom: 20px;
    font-family: "Montserrat", sans-serif;
    box-shadow: 0 0 7px 0px ${colors.shadow};
    color: ${colors.formPlaceholder};
    width: 260px;
    ::placeholder {
      color: ${colors.formPlaceholder};
    }
    ${media.tablet} {
      padding: 10px 0 10px 10px;
    }
    ${media.desktop} {
      padding: 12px 0 12px 12px;
    }
  }

  button {
    margin-top: 16px;
    width: 170px;
    height: 38px;
    background-color: ${colors.white};
    border: 1px solid ${colors.white};
    box-shadow: 0 0 7px 0px ${colors.shadow};
    font-family: ${fonts.primary};
    font-weight: 600;
    font-size: 15px;
    color: ${colors.gray};
    ${media.desktop} {
      margin-top: 22px;
      height: 42px;
    }

    &:hover {
      background-color: ${colors.primary};
      color: ${colors.white};
      border: 1px solid ${colors.primary};
    }
  }

  p {
    font-family: ${fonts.primary};
    font-size: 14px;
    line-height: 20px;
    color: ${colors.gray};
    margin-top: 30px;

    .link {
      color: ${colors.primary};
      text-decoration: none;
    }
  }
  .login-errors {
    p {
      padding-top: 0px;
      color: ${colors.primary};
      margin-top: 5px;
      padding-bottom: 0px;
      margin-bottom: 0px;
    }
  }
`;
