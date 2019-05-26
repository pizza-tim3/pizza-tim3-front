import styled from "styled-components";

export const EventBox = styled.div`
  width: 100%;
`;

export const Inner = styled.div`
  display: flex;
  margin: 0px auto;
  box-shadow: 0 0 6px 0px #dfdfdf;
  margin-top: 20px;
  flex-direction: column;
  padding: 15px 0 15px 0;
  width: 90%;
  @media (min-width: 600px) {
    padding: 25px 0 25px 0;
    width: 900px;
  }
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
export const EventRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px auto;
  .calendar {
    display: flex;
    flex-direction: row;
    h2 {
      padding-right: 15px;
      margin-top: 0px;
    }
  }
  .invite {
    display: flex;
    align-items: end;
    justify-content: flex-end;
   
    }

    h2 {
      display: flex;
      margin-top: 0px;
      margin-right: 15px;
    }
    button {
      margin-left: 15px;
    }
    img {
      height: 40px;
      width: 40px;
    }
  }
  :first-child {
    border-bottom: 2px solid black;
  }
  @media (min-width: 600px) {
    margin: 0px 25px 34px;
  }
  .btn-save {
    margin-top: 16px;
    width: 130px;
    height: 38px;
    background-color: #ff5c00;
    border: 1px solid #fff;
    box-shadow: 0 0 7px 0px #d2d2d2;
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    font-size: 15px;
    color: #fff;

    @media (min-width: 1100px) {
      margin-top: 22px;
      width: 140px;
      height: 42px;
    }

    &:hover {
      color: #737373;
      background-color: #fff;
      border: 1px solid #ff5c00;
      cursor: pointer;
    }
  }
`;
