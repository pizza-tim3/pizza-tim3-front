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
  width: 90%;
  .more {
    display: flex;
    position: fixed;
    width: 100%;
    height: 100%;
    align-self: center;
    background-color: ${colors.white};
    align-items: end;
    margin-top: -120px;
    z-index: 9999;
    ul {
      display: flex;
      width: 80%;
      margin: 0px auto;
      align-self: center;
      height: 100%;
      align-items: center;
      justify-content: center;
    }
  }
  ${media.desktop} {
    width: 80%;
    .event-header {
      flex-direction: row;
    }
  }
  .event-header {
    border-bottom: 2px solid ${colors.black} !important;
    display: flex;
    justify-content: space-between;
    margin: 0px 25px 15px 25px;
    padding: 20px 0px;
    align-items: center;
    h1 {
      font-size: 1.1rem;
      margin-bottom: 0px;
    }
    ${media.desktop} {
      h1 {
        font-size: 2rem;
      }
    }
    .btn-save {
      background-color: ${colors.primary};
      border: 1px solid ${colors.white};
      box-shadow: 0 0 7px 0px ${colors.shadow};
      font-family: ${fonts.primary};
      font-weight: 600;
      font-size: 15px;
      color: ${colors.white};
      width: 140px;
      height: 42px;
      ${media.mobile} {
        width: 130px;
        height: 38px;
      }

      &:hover {
        color: ${colors.gray};
        background-color: ${colors.white};
        border: 1px solid ${colors.primary};
        cursor: pointer;
      }
    }
  }

  .invited {
    display: flex;
    justify-content: space-between;

    h4 {
      text-align: left;
    }
  }
  .event-date {
    margin: 0px 25px 34px;
    flex-direction: column;
    ${media.desktop} {
      margin: 0px 25px 34px;
      flex-direction: row;
    }
  }
  .event-location {
    ${media.mobile} {
      flex-direction: row;
    }
  }
`;

export const Toggle = styled.span`
  align-self: center;

  label {
    margin-bottom: 0px;
  }
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
  flex-direction: column;
  margin: 0px 25px 34px;
  ${media.desktop} {
    flex-direction: row;
  }
  ul {
    list-style: none;
  }
  hr {
    width: 80%;
    border-bottom: 2px solid ${colors.primary};
    margin-right: 0;
  }
  .calendar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 22px;
    h2 {
      font-size: 1.2rem;
    }
    img {
      width: 40px;
      height: 40px;
      margin: 0px 0px 0px 8px;
    }
    span {
      font-size: 1.3rem;
      padding-left: 10px;
      vertical-align: middle;
    }
    ${media.desktop} {
      justify-content: space-between;
      width: 45%;
      h2 {
        font-size: 2rem;
      }
    }
  }
  .invite-switch {
    h3 {
      margin-bottom: 0px;
      margin-right: 8px;
    }
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .event {
    width: 100%;
    display: flex;
    ${media.desktop} {
      width: 45%;
    }
    img, #map {
      height: 300px;
    }
    &.location {

      div {
        padding: 15px 0px;
      }
      display: flex;
      flex-direction: column;
      img {
        margin-left
      }
    }
    &.map {
      align-items: start;
      img {
        width: 100%;
      }
      .map-search {
        margin: 0px;
        width: 100%;
      }
      #map {
        margin: 0px;
        width: 100%;
      }
    }
  }

  .event-users {
    display: flex;
    width: 100%;
    hr {
      border-top: 3px solid ${colors.primary};
      width: 70%;
      margin-right: 0;
    }
    span {
      display: none;
      align-self: center;
    }
    span ul {
      display: flex;
      align-self: center;
      margin-bottom: 0px;
      li {
        margin-right: 7px;
      }
    }
    img {
      width: 40px;
      height: 40px;
      margin-right: 5px;
    }
    .add-user {
      padding: 7px;
    }
  }
  .event-invite, .all-comments, .add-comments {
    img {
      max-width: 50px;
      max-height: 50px;
    }
  }
  .event-comments {
    display: flex;
    flex-direction: column;
    align-items: start;
    .comment {
      display: flex;
      flex-direction: row;
      margin-bottom: 15px;
      p {
        align-self: center;
        margin-bottom: 0px;
        padding-left: 12px;
      }
    }
  }
  .add-comments {
    input {
      border: 1.3px solid orange;
      padding: 10px 5px;
      margin-right: 10px;
    }
    img {
      padding: 7px;
    }
  }
`;
