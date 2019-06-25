import styled from "styled-components";
import { colors, fonts, media } from "../styles/variables.js";
import pizza from "../assets/pizza.png";
import img from "../assets/user.png";

export const Wrap = styled.div`
  width: 100%;
  background: linear-gradient(
    155.4deg,
    ${colors.secondary} 0%,
    ${colors.primary} 99.11%
  );
`;

export const Inner = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  padding: 18px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  a:hover {
    text-decoration: none;
  }

  // h1 {
  //   font-size: 26px;
  //   margin-left: 0px;
  //   text-align: left;
  //   width: 200px;
  //   font-family: ${fonts.primary};
  //   color: ${colors.white};
  //   font-weight: 600;

  //   ${media.tablet} {
  //     font-size: 30px;
  //     margin-left: 26px;
  //     text-align: center;
  //     width: 100%;
  //   }
  }

  .userBox {
    display: flex;
    flex-flow: row no-wrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .user {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 20px;
      z-index: 2;
      position: relative;
      ${media.tablet} {
        height: 56px;
        width: 56px;
      }
    }

    .newEventBtn {
      margin-right: 14px;
      padding: 8px;
      width: 150px;
      background-color: ${colors.white};
      border: 1px solid ${colors.white};
      border-radius: 14px;
      color: grey;
      font-family: ${fonts.primary};
      font-size: 14px;
      font-weight: 600;
      &:hover {
        color: ${colors.black};
      }
    }

    .logoutBtn {
      font-family: ${fonts.primary};
      color: ${colors.white};
      font-weight: 600;
    }
  }
`;
