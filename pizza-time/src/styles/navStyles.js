import styled, { keyframes } from 'styled-components';

import img from '../assets/user.png';

// console.log(props.image);

const slideInTop = keyframes`
from {
  opacity: 0;
  height: 0;
}
to {
  opacity: 1;
  height: 150;
}
`;

const slideOutBottom = keyframes`
from {
  opacity: 1;
  height: 150;
}
to {
  opacity: 0;
  height: 0;
}
`;

export const Wrap = styled.div`
  width: 100%;
  background: linear-gradient(155.4deg, #FFD338 0%, #FF5C00 99.11%);
`;

  export const Inner = styled.div`
    width: 100%;
    padding: 15px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

      h1 {
        font-size: 26px;
        font-family: 'Montserrat', sans-serif;
        color: #fff;
        font-weight: 600;
        margin-left: 20px;
          @media(min-width: 900px) { font-size: 30px; }
      }

      .userBox {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .newEventBtn {
          margin-right: 14px;
          padding: 8px;
          width: 180px;
          background-color: #fff;
          border: 1px solid #fff;
          border-radius: 14px;
          color: grey;
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          font-weight: 600;
          visibility: hidden;
            &:hover {
              color: #000;
            }

            @media(min-width: 900px) { visibility: visible; }
        }

        .user {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          margin-right: 20px;
          z-index: 2;
          position: relative;
            @media(min-width: 900px) {
              height: 56px;
              width: 56px;
            }
        }

        .navToggle-enter { animation: ${slideInTop} 0.2s forwards; }
        .navToggle-leave { animation: ${slideOutBottom} 0.2s forwards; }

        .userNav {
          width: 46px;
          height: 120px;
          position: absolute;
          background-color: #fff;
          margin-top: -20px;
          right: 20px;
          box-shadow: 0 0 7px 0px #D2D2D2;
          border-radius: 24px;
          z-index: 1;
            @media(min-width: 900px) {
              width: 56px;
              height: 150px;
            }
        }
      }
  `;