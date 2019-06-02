import styled from 'styled-components';
import { colors, fonts, media } from '../styles/variables.js';

export const PlacesContainer = styled.div`
  width: 80%;
  margin: 0px auto;
  margin-top: 30px;
    ${media.mobile} { margin-top: 36px; }
    ${media.tablet} { margin-top: 40px; }

  .card {
    border: 1px solid ${colors.white};
    box-shadow: 0 0 8px ${colors.shadow};
    border-radius: 6px;
    margin-bottom: 18px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0 8px 0;
      &:hover { button { visibility: visible; }}
      ${media.mobile} { padding: 10px 0 10px 0; }
      ${media.tablet} { padding: 12px 0 12px 0; }
      ${media.desktop} { padding: 14px 0 14px 0; }

    .content {
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-start;
      margin-left: 10px;
      width: 80%;
        ${media.mobile} { margin-left: 12px; }
        ${media.tablet} { margin-left: 14px; }
        ${media.desktop} { margin-left: 16px; }

      p {
        font-family: ${fonts.primary};
        color: ${colors.gray};
        margin: 0;
        text-align: left;
          &:first-child{ font-weight: 600; }
          ${media.tablet} { font-size: 17px; }
      }
    }

    button {
      margin-right: 10px;
      width: 42px;
      height: 42px;
      border: 1px solid ${colors.secondary};
      border-radius: 50%;
      background-color: ${colors.secondary};
      color: ${colors.white};
      text-align: center;
      font-family: ${fonts.primary};
      font-size: 22px;
      visibility: hidden;
        &:hover {
          border: 1px solid ${colors.secondaryDark};
          background-color: ${colors.secondaryDark};
        }

        ${media.mobile} { margin-right: 12px; }
        ${media.tablet} {
          margin-right: 14px;
          width: 48px;
          height: 48px;
        }
        ${media.desktop} {
          margin-right: 16px;
          width: 52px;
          height: 52px;
        }
    }
  }
`;

export const Span = styled.span`
  color: ${props => props.rating > 3.8 ? 'green' : 'orange'};
  font-weight: 600;
  font-size: 15px;
`;

export const ShowMore = styled.button`
  width: 48px;
  height: 48px;
  border: 1px solid ${colors.secondary};
  border-radius: 50%;
  background-color: ${colors.secondary};
`;