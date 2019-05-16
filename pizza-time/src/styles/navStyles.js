import styled, { keyframes } from 'styled-components';

import img from '../assets/user.png';

// console.log(props.image);

const slideInTop = keyframes`
from {
  // transform: translateY(-100%);
  // transform: scaleY(0.1);
  opacity: 0;
  height: 0;
}
to {
  transform: translateY(0);
  transform: scaleY(1);
  opacity: 1;
  height: 150;
}
`;

const slideOutBottom = keyframes`
from {
  // transform: translateY(0);
  // transform: scaleY(1);
  opacity: 1;
  height: 150;
}
to {
  // transform: translateY(30%);
  // transform: scaleY(0.8);
  opacity: 0;
  height: 0;
}
`;

export const Wrap = styled.div`
  width: 100%;
  border: 1px solid red;
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
      }

      .userBox {
        .user {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          margin-right: 20px;
          z-index: 2;
          position: relative;
        }

        .navToggle-enter {
          animation: ${slideInTop} 0.2s forwards;
        }

        .navToggle-leave {
          animation: ${slideOutBottom} 0.2s forwards;
        }

        .userNav {
          width: 56px;
          height: 150px;
          position: absolute;
          background-color: #fff;
          // border: 1px solid red;
          margin-top: -42px;
          box-shadow: 0 0 7px 0px #D2D2D2;
          border-radius: 24px;
          z-index: 1;
          // transform: scaleY(0.8);
        }
      }

      // .navBox {
      //   margin-right: 20px;

        // .newEventBtn {
        //   padding: 8px;
        //   width: 100px;
        //   background-color: #fff;
        //   border: 1px solid #fff;
        //   border-radius: 10px;
        //   color: grey;
        //   font-family: 'Montserrat', sans-serif;
        //   font-size: 14px;
        //   font-weight: 600;
        // }
      }
  `;