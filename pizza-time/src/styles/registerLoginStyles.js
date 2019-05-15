import styled from 'styled-components';

export const Wrap = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: linear-gradient(155.4deg, #FFD338 0%, #FF5C00 99.11%);
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

  export const Form = styled.form`
    border-radius: 6px;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    padding: 34px;
    background-color: #fff;

    h1 {
      font-size: 48px;
      color: #000;
      font-family: 'Molle', cursive;
      padding: 5px 0 40px 0;
      background: linear-gradient(155.4deg, #FFD338 0%, #FF5C00 99.11%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
        @media(min-width: 900px) { font-size: 52px; }
        @media(min-width: 1100px) { font-size: 58px; }
    }

    input {
      padding: 8px 0 8px 8px;
      border: 1px solid #fff;
      margin-bottom: 20px;
      font-family: 'Montserrat', sans-serif;
      box-shadow: 0 0 7px 0px #D2D2D2;
      color: #929292;
      ::placeholder { color: #929292; }
        @media(min-width: 900px) {
          width: 230px;
          padding: 10px 0 10px 10px;
        }
        @media(min-width: 1100px) {
          width: 260px;
          padding: 12px 0 12px 12px;
        }
    }

    button {
      margin-top: 16px;
      width: 130px;
      height: 38px;
      background-color: #fff;
      border: 1px solid #fff;
      box-shadow: 0 0 7px 0px #D2D2D2;
      font-family: 'Montserrat', sans-serif;
      font-weight: 600;
      font-size: 15px;
      color: #737373;
        @media(min-width: 1100px) {
          margin-top: 22px;
          width: 140px;
          height: 42px;
        }

        &:hover {
          background-color: #FF5C00;
          color: #fff;
          border: 1px solid #FF5C00;
        }
    }
    
    p {
      font-family: 'Montserrat', sans-serif;
      font-size: 14px;
      line-height: 20px;
      color: #737373;
      margin-top: 30px;

      .link {
        color: #FF5C00;
        text-decoration: none;
      }
    }
  `;