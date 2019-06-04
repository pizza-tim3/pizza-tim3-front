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