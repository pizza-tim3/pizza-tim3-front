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
  .loading {
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .more {
    display: flex;
    position: fixed;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-self: center;
    background-color: ${colors.primary};
    align-items: end;
    margin-top: -135px;
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
  .close {
    align-self: flex-end;
    margin: 20px 33px 0px 0px;
    opacity: 1;
  }

  ${media.tablet} {
    width: 80%;
    .event-header {
      flex-direction: row;
    }

    .close {
      margin: 33px 50px 0px 0px;
    }
    .more {
      margin-top: -121px;
      justify-content: end;
      align-items: center;
    }
  }
  .close-more {
    border: 1px solid ${colors.primary};
    opacity: 1;
    img {
      width: 26px;
      height: 26px;
      transform: rotate(45deg);
      padding: 3px;
    }
    :hover {
      cursor: pointer;
      background: ${colors.white};
    }
  }

  .tobe-invited {
    width: 80%;
    height: 163px;
    background-color: #fff;
    margin-top: 40px;
    background: none;
    button {
      padding: 10px 30px;
    }
  }
  .friends {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    height: auto;
    align-self: center;
    width: 100%;
    margin-top: 150px;
    padding: 15px 0px;
    border-top: 4px solid ${colors.black};
    border-bottom: 4.5px solid ${colors.black};
    background-color: ${colors.white};
    -webkit-overflow-scrolling: touch;
    ${media.desktop} {
      width: 80%;
      border: 2px solid ${colors.primary};
      margin-top: 125px;
      border-radius: 5px;
      .friend {
        width: 66px;
        margin: 8px;
      }
    }
    h2 {
      margin: 8px 0px;
    }
    &::-webkit-scrollbar {
      display: none;
    }
    .friend {
      flex: 0 0 auto;
      margin: 12px;
      width: 100px;
      height: auto;
    }
    img {
      margin-top: 12px;
      border: 3.5px solid ${colors.white};
      border-radius: 50%;
      &:hover {
        border: 3.5px solid ${colors.primary};
      }
    }
  }
  .event-header {
    width: 96%;
    border-bottom: 2px solid ${colors.black} !important;
    display: flex;
    justify-content: space-between;
    margin: 0px auto;
    padding: 20px 0px;
    align-items: center;
    height: 85px;
    .action {
      padding-left: 0px;
    }
    .header-edit {
      display: flex;
      height: 48px;
      ${media.desktop} {
        height: 40px;
      }
      input {
        border: none;
        border-bottom: 1.5px solid ${colors.primary};
        margin-right: 15px;
        &:focus {
          outline: none;
        }
      }
    }
    .event-name {
      justify-content: space-between;
      display: flex;
      width: 78%;
      h1 {
        span {
          padding-left: 10px;
        }
      }
    }
    h1 {
      font-size: 1.3rem;
      text-align: left;
      margin-bottom: 0px;
      align-self: center;
    }

    ${media.desktop} {
      .event-name {
        width: 50%;
      }
      h1 {
        font-size: 2rem;
        display: flex;
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
      width: 75px;
      align-self: center;
      ${media.desktop} {
        width: 130px;
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
    margin: 30px 25px 34px;
    flex-direction: column;
    ${media.desktop} {
      margin: 40px 20px 34px;
      flex-direction: row;
    }
  }
  .event.location {
    ${media.mobile} {
      flex-direction: row;
    }
  }
  .event-location-name {
    display: flex;
    flex-direction: column;
  }
  location-info {
    margin-bottom: 0px;
  }
  .location-address,
  .location-hours {
    display: flex;
    flex-direction: column;
    padding: 15px 0px;
    justify-content: end;
    width: 100%;
    ${media.desktop} {
      height: 100%;
    }
  }
  .location-address {
    address {
      display: flex;
      flex-direction: column;
      justify-content: center;
      ${media.desktop} {
        height: 100%;
      }
    }
    p {
      font-size: 1.3rem;
      align-self: left;
      margin-bottom: 0px;
      paddding-bottom: 0px;
      font-weight: 500;
    }
  }
  .location-hours h2 {
    padding: 0px 0px 25px;
  }

  .action {
    background: none;
    border: none;
    padding-right: 0px;
    img {
      width: 40px;
      height: 40px;
    }
    &:focus {
      outline: none;
    }
    &.cancel {
      padding-left: 0px;
      img {
        padding: 7px;
        margin-left: 5px;
        margin-right: 5px;
      }
    }
    &.update img {
      border-radius: 0%;
    }
  }
`;

export const Toggle = styled.span`
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
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 22px;
    h2, h3 {
      text-align: left;
    }
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
    .edit-time {
      display: flex;
      justify-content: space-between;
      padding-left: 0px;
    }
    select {
      border: none;
      background: ${colors.white};
      margin-right: 5px;
    }
    ${media.desktop} {
      justify-content: space-between;
      width: 50%;
      h2 {
        font-size: 2rem;
      }
    }
  }
  .calendar-row { 
    justify-content: space-between;
    display: flex;
    padding-bottom: 25px;
  }
  .invite-switch {
    h3 {
      margin-bottom: 0px;
      margin-right: 8px;
    }
    display: flex;
    justify-content: space-between;
    // align-items: center;
  }
  .event {
    width: 100%;
    display: flex;
    ${media.desktop} {
      width: 50%;
    }
    img, #map {
      height: 300px;
    }
    &.location {

      display: flex;
      flex-direction: column;
      img {
        margin-left
      }
    }
    #map {
      display: none;
    }
  
    &.map {
      align-items: start;
      display: flex;
      flex-direction: column;
      ${media.desktop} {
        // flex-direction: row;
        width: 45%;
      }
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
    align-items: start;
    ${media.desktop} {
      flex-direction: row;
    }
    div {
      margin-right: 10px;
      padding: 5px;
      display: flex;
      align-items: start;
      align-self: center;
      h5 {
        align-self: center;
        margin-bottom: 0px;
        padding-left: 15px;
      }
    }
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
    } .invited img {
      border-radius: 50%;
      width: 55px;
    }
  }
  .event-invite, .all-comments{
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
      align-items: center;
      flex-direction: row;
      margin-bottom: 15px;
      p {
        align-self: center;
        margin-bottom: 0px;
        padding-left: 12px;
        padding-right: 12px;
      }
    }
    img {
      border-radius: 50%;
    }
  }
  .add-comments {
    input {
      border: 1.3px solid orange;
      padding: 10px 5px;
      margin-right: 10px;
    }
  }
  .edit-comment {
    display: none;
  }
`;
