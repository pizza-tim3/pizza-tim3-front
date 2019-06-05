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

  h1 {
    font-family: ${fonts.primary};
    font-size: 40px;
    font-weight: 600;
    color: ${colors.white};
      ${media.mobile} { font-size: 46px; }
      ${media.tablet} { font-size: 52px; }
      ${media.desktop} { font-size: 56px; }
  }
`;