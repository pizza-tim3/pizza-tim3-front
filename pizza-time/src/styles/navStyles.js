import styled from 'styled-components';

import img from '../assets/user.png';

// console.log(props.image);
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