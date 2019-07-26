import styled from 'styled-components';
import { colors, fonts, media, mediaMF } from '../styles/variables.js';

export const PlacesSearchWrap = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-color: ${colors.lightGray};
  display: flex;
  flex-direction: column;
`;

export const ButtonGroup = styled.span`
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`

  export const PlacesHeading = styled.div`
    border-top: 5px solid ${colors.primary};
    width: 100%;
    padding: 20px 0;
    background-color: ${colors.white};
    color: ${colors.gray}
    width: 100%;
    font-family: ${fonts.primary};
    font-weight: 600;
    font-size: 23px;
    box-shadow: 4px 4px 4px ${colors.lightShadow};
  `;

  export const PlacesSearchInner = styled.div`
    margin-top: 40px;
    background-color: ${colors.lightGray};
    display: flex;
    flex-flow: column nowrap;
    width: 100%;

    .error {
      margin: 20px auto 10px;
      color: ${colors.primary};
      font-size: 18px;
    }

    ${media.tablet} {
      width: 50%;
      margin: 40px auto;
    }
    ${media.modern} {width: 30%;}
  `;

  export const NextStep = styled.button`
    border: none;
    width: auto;
    border-radius: 10px;
    background: linear-gradient(155.4deg, ${colors.secondary} 0%, ${colors.primary} 99.11%);
    font-family: ${fonts.primary};
    font-size: 18px;
    font-weight: 600;
    color: ${colors.white};
    padding: 2px 20px;
    margin: 15px auto;
      &:hover { text-decoration: underline}
      ${media.mobile} { font-size: 20px; }
      ${media.tablet} { font-size: 22px; }
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
    padding: 5px 10px;
    border: 2px solid #EEE;
    border-radius: 10px;
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
  background-color: ${colors.white};
  border: none;
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
  justify-content: space-around;
  margin: 0 auto;
`

export const SpanWrap = styled.span`
  font-weight: bold;
  font-size: 18px;
`

export const ConfirmWrap = styled.div`
  width: 70%;
  text-align: center;
  margin: 0 auto;
  color: ${colors.gray};
  text-align: left;

  h2 {
    text-align: center;
    text-decoration: underline;
    text-decoration-color: ${colors.primary};
    margin-bottom: 10px;
    padding-bottom: 5px;
  }

  .invited {
    margin: 0;
    padding: 0;
  }
`

export const InviteOnlyWrap = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: center;

  span {
    align-self: center;
    color: gray;
  }

  ${media.mobile} {width: 40%;}
  ${media.tablet} {width: 60%;}
  ${media.largeDt} {width: 40%;}
`

export const InviteOnlyButton = styled.button`
  background: linear-gradient(155.4deg, ${colors.secondary} 0%, ${colors.primary} 99.11%);
  border: none;
  color: white;
  border-radius: 10px;
  padding: 1px 15px;
  margin-left: 5px;

  ${({ active }) => active && `
    border: 3px solid ${colors.secondary};
  `}
`

export const PlacesCard = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  background-color: ${colors.white};
  flex-direction: column;
  text-align: left;
  border: none;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 4px 5px 6px ${colors.lightShadow};

  ${({ active }) => active && `
    border: 2px solid ${colors.secondary};
  `}
`