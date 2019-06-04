import styled from "styled-components";
import { colors, fonts, media } from "../styles/variables.js";

export const DatePickerWrap = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: linear-gradient(155.4deg, ${colors.secondary} 0%, ${colors.primary} 99.11%);
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

export const PlacesHeading = styled.div`
  width: 100%;
  border: 1px solid ${colors.white};
  background-color: ${colors.white};
  position: absolute;
  top: 0;
  padding: 40px 0 40px 0;
    ${media.mobile} { padding: 50px 0 50px 0; }
    ${media.tablet} { padding: 60px 0 60px 0; }

  h2 {
    font-family: ${fonts.primary};
    font-weight: 600;
    font-size: 23px;
    color: ${colors.gray};
      ${media.mobile} { font-size: 24px; }
      ${media.tablet} { font-size: 26px; }
  }
`;

export const Form = styled.form`
  input {
    width: 240px;
    border: 1px solid ${colors.white};
    border-radius: 6px;
    margin-bottom: 10px;
    font-family: ${fonts.primary};
    font-size: 16px;
    color: ${colors.gray};
    padding: 10px;
      ${media.mobile} {
        width: 280px;
        font-size: 17px;
      }
      ${media.tablet} {
        width: 320px;
        font-size: 18px;
      }
      ${media.desktop} {
        width: 350px;
        font-size: 19px;
      }
  }
`;

export const Button = styled.button`
  border: none;
  border-bottom: 3px solid transparent;
  background-color: transparent;
  font-family: ${fonts.primary};
  font-size: 20px;
  font-weight: 600;
  color: ${colors.white};
  padding: 5px 0 5px 0;
    &:hover { border-bottom: 3px solid ${colors.white}}
    ${media.mobile} { font-size: 22px; }
    ${media.tablet} { font-size: 24px; }
    ${media.desktop} { font-size: 26px; }
`;