import styled from 'styled-components';
import { colors, fonts, media } from '../styles/variables.js';

export const UserBox = styled.div`
  width: 90%;
  box-shadow: 0 0 8px ${colors.shadow};
  margin-top: 30px;
  ${media.tablet} {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    width: 700px;
    margin-top: 50px;
  }

  .userAvatar {
    padding: 20px 0 20px 0;
    background-color: ${colors.lightGray};
    ${media.tablet} {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      height: 240px;
      width: 240px;
      padding: 0;
    }

    img {
      width: 100px;
      height: 100px;
    }
  }

  .userProfile {
    padding: 20px 0 20px 0;
    ${media.tablet} {
      padding: 0;
      margin-left: 40px;
    }

    h2 {
      color: ${colors.black};
    }

    p {
      line-height: 8px;
      ${media.tablet} {
        text-align: left;
      }

      &:nth-of-type(1) {
        margin-top: 20px;
      }
    }

    button {
      margin: 12px 0 6px 0;
      border: none;
      padding: 6px 16px 6px 16px;
      color: ${colors.black};
      background-color: ${colors.white};
      box-shadow: 0 0 6px ${colors.shadow};
      
      &:hover {
        background-color: ${colors.primary};
        color: ${colors.white};
      }

      ${media.tablet} {
        margin-left: -100px;
      }
    }
  }
`;