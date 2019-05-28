import styled from "styled-components";
import { colors, fonts, media } from "../styles/variables.js";

export const EventBox = styled.div`
  width: 100%;
`;

export const Inner = styled.div`
  display: flex;
  margin: 0px auto;
  box-shadow: 0 0 6px 0px ${colors.shadow};
  margin-top: 20px;
  flex-direction: column;
  padding: 15px 0 15px 0;
  width: 80%;

  .event-header {
    border-bottom: 2px solid ${colors.black} !important;
    display: flex;
    justify-content: space-between;
    margin: 0px 25px 15px 25px;
    padding: 20px 0px;
    .btn-save {
      margin-top: 16px;
      width: 130px;
      height: 38px;
      background-color: ${colors.primary};
      border: 1px solid ${colors.white};
      box-shadow: 0 0 7px 0px ${colors.shadow};
      font-family: ${fonts.primary};
      font-weight: 600;
      font-size: 15px;
      color: ${colors.white};
  
      ${media.desktop} {
        margin-top: 22px;
        width: 140px;
        height: 42px;
      }
  
      &:hover {
        color: ${colors.gray};
        background-color: ${colors.white};
        border: 1px solid ${colors.primary};
        cursor: pointer;
      }
  }

  .invited {
    display: flex;
    justify-content: space-between;

    h4 {
      text-align: left;
    }

  // ${media.mobile} {
  //   padding: 25px 0 25px 0;
  //   width: 900px;
  // }
`;

export const Toggle = styled.span`
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    input {
      opacity: 0;
      width: 0;
      height: 0;
    }
  }
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 34px;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    :before {
      position: absolute;
      border-radius: 50%;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }
  }

  input:checked + .slider {
    background-color: #ff5c00;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #ff5c00;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
`;

export const EventColumn = styled.div`
  display: flex;
  flex-direction: column;
`;
export const EventRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px auto;
  align-items: center;
  hr {
    width: 80%;
    border-bottom: 2px solid ${colors.primary};
    margin-right: 0;
  }
  .event {
    width: 50%;
    &.location {
      display: flex;
      flex-direction: column;
      img {
        width: 90%;
        margin: 0px auto 20px;
        height: 200px;
      }
    }
    &.map {
      width: 50%;
      align-self: start;
    }
    img {
      width: 90%;
    }
  }

  .event-users {
    align-items: center;
    hr {
      border-top: 3px solid ${colors.primary};
      width: 70%;
      margin-right: 0;
    }
    img {
      width: 40px;
      height: 40px;
      margin-right: 5px;
      :last-child {
        padding: 8px;
      }
    }
  }
  .event-invite {
    img {
      max-width: 50px;
      max-height: 50px;
    }
  }
  ${media.mobile} {
    margin: 0px 25px 34px;
  }
`;
