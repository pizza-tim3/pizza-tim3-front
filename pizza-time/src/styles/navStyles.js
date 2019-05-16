import styled from 'styled-components';

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
        width: 56px;
        height: 56px;
        border-radius: 50%;
        border: 1px solid #fff;
        background-color: #fff;
        margin-right: 20px;
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