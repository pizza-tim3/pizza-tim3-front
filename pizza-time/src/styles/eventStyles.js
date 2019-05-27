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

export const EventRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px auto;
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
