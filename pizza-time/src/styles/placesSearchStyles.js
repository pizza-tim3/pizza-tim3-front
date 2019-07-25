import styled from 'styled-components';
import { colors, fonts, media } from '../styles/variables.js';

export const PlacesSearchWrap = styled.div`
  width: 100%;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  background: linear-gradient(155.4deg, ${colors.secondary} 0%, ${colors.primary} 99.11%);
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

export const ButtonGroup = styled.span`
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: center;

  // ${media.xs} { right: 20%; }
  // ${media.tablet} { right: 8%; }
`

  export const PlacesHeading = styled.div`
    width: 100%;
    text-decoration: underline;
    padding: 30px 0 30px 0;
      ${media.mobile} { padding: 40px 0 40px 0; }
      ${media.tablet} { padding: 50px 0 50px 0; }

    h2 {
      font-family: ${fonts.primary};
      font-weight: 600;
      font-size: 23px;
      color: ${colors.gray};
        ${media.mobile} { font-size: 24px; }

    }
  `;

  export const PlacesSearchInner = styled.div`
    display: flex;
    flex-flow: column nowrap;
    border: 1px solid ${colors.white};
    background-color: ${colors.white};
    border-radius: 10px;
    margin: 40px 0 30px 0;
    width: 80%;

      ${media.mobile} {
        width: 500px;
        margin: 50px 0 30px 0;
      }
      ${media.tablet} { margin: 60px 0 30px 0; }
      ${media.desktop} { margin: 70px 0 30px 0; }
  `;

  export const NextStep = styled.button`
    border: none;
    width: auto;
    border-radius: 25px;
    background: linear-gradient(155.4deg, ${colors.secondary} 0%, ${colors.primary} 99.11%);
    font-family: ${fonts.primary};
    font-size: 20px;
    font-weight: 600;
    color: ${colors.white};
    padding: 5px 20px;
    margin: 15px auto;
      &:hover { text-decoration: underline}
      ${media.mobile} { font-size: 22px; }
      ${media.tablet} { font-size: 24px; }
      ${media.desktop} { font-size: 26px; }
  `;

export const Form = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-content: center;


  input {
    margin: 10px auto;
    width: 80%;
    padding: 11px 15px;
    border: 2px solid #EEE;
    border-radius: 20px;
    box-shadow: 4px 5px 6px #CDCDCD;
  }
  }
`

export const FriendsWrap = styled.div`
  width: 100%;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export const FriendCard = styled.div`
  width: 40%;
  margin: 5px auto;
  border: 1px solid

  border: 2px solid #EEE;
  border-radius: 10px;
  box-shadow: 4px 5px 6px #CDCDCD;

  button {
    margin-bottom: 10px;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    border: none;
    background: linear-gradient(155.4deg, ${colors.secondary} 0%, ${colors.primary} 99.11%);
  }

  img {
    margin-top: 10px;
    border-radius: 50%;
  }

  ${({ active }) => active && `
    border: 3px solid ${colors.secondary};
  `}
`

export const ButtonsWrap = styled.div`
  display: flex;
  margin: 0 auto;
`

export const SpanWrap = styled.span`
  font-weight: bold;
  font-size: 18px;
`

export const ConfirmWrap = styled.div`
  width: 100%;
  text-align: center;
  margin: 0 auto;

  .invited {
    margin: 0;
    padding: 0;
  }
`

export const InviteOnlyWrap = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;

  span {
    align-self: center;
    color: gray;
  }
`

export const InviteOnlyButton = styled.button`
  background: linear-gradient(155.4deg, ${colors.secondary} 0%, ${colors.primary} 99.11%);
  border: none;
  color: white;
  border-radius: 15px;
  padding: 0 12px;
  margin-left: 5px;

  ${({ active }) => active && `
    border: 3px solid ${colors.secondary};
  `}
`

export const PlacesCard = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  text-align: left;
  border: 3px solid #EEE;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 4px 5px 6px #CDCDCD;

  ${({ active }) => active && `
    border: 3px solid ${colors.secondary};
  `}
`