import styled from 'styled-components';

export const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

  export const Inner = styled.div`
    width: 100%;
      @media(min-width: 1100px) {
        width: 1100px;
      }

      .tabBox {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        text-align: center;
      }

        .filterBtn {
          // height: 35px;
          width: 130px;
          padding: 10px 0 10px 0;
          border: 1px solid #EAEAEA;
          background-color: #EAEAEA;
          margin-top: 40px;
          color: #5A5A5A;
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
          font-size: 15px;
          text-align: center;
          cursor: pointer;
            &:nth-of-type(2) {
              margin-left: 5px;
              margin-right: 5px;
            }
        }

        .filterBtnActive {
          background-color: #FF5C00;
          border: 1px solid #FF5C00;
          color: #fefefe;
        }

      .tab {
        margin: 20px 0 0 0;
      }
  `;