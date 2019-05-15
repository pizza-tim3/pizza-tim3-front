import styled from 'styled-components';

// font-family: 'Molle', cursive;
// font-family: 'Montserrat', sans-serif;

export const Wrap = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: linear-gradient(155.4deg, #FFD338 0%, #FF5C00 99.11%);
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

    // MEDIA FOR TESTING PURPOSES
    // @media(min-width: 900px) { border: 1px solid red; }
    // @media(min-width: 1100px) { border: 1px solid blue; }
`;

  export const Inner = styled.div`
    display: flex;
    flex-flow: column nowrap;
  `;

    export const Heading = styled.div`
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;

      h1 {
        font-size: 52px;
        color: #fff;
        font-family: 'Molle', cursive;
          @media(min-width: 900px) { font-size: 58px; }
          @media(min-width: 1100px) { font-size: 68px; }
      }

      p {
        margin-top: 10px;
        font-size: 15px;
        color: #fff;
        font-family: 'Montserrat', sans-serif;
        line-height: 18px;
          @media(min-width: 900px) {
            font-size: 16px;
            line-height: 22px;
          }
          @media(min-width: 1100px) { 
            font-size: 18px;
            line-height: 26px;
          }
      }
    `;

    export const Buttons = styled.div`
      display: flex;
      justify-content: center;
      margin-top: 54px;
        @media(min-width: 900px) { margin-top: 62px; }
        @media(min-width: 1100px) { margin-top: 70px; }

        .loginBtn, .registerBtn {
          border: 3px solid #fff;
          padding: 10px 20px;
          color: #fff;
          text-decoration: none;
          margin: 0 6px;
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
          font-size: 15px;
            @media(min-width: 900px) {
              &:hover {
                background-color: #fff;
                color: #000;
              }
            }
        }
    `;