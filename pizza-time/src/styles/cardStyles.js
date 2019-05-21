import styled from 'styled-components';

export const CardBox = styled.div`
  width: 100%;
`;

export const Inner = styled.div`
  width: 86%;
  margin: 0px auto;
  box-shadow: 0 0 6px 0px #DFDFDF;
  margin-top: 20px;
    @media(min-width: 1100px) {
      width: 100%;
    }
`;

  export const Content = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 15px 0 15px 0;
      @media(min-width: 600px) { padding: 25px 0 25px 0; }

      img {
        width: 90px;
        height: 80px;
        margin: 0 10px 0 20px;
          @media(min-width: 600px) {
            width: 100px;
            height: 90px;
            margin-left: 25px;
          }
          @media(min-width: 900px) {
            width: 120px;
            height: 110px;
          }
          @media(min-width: 1100px) {
            width: 130px;
            height: 120px;
            margin-left: 30px;
          }
      }

      .content {
        text-align: left;
        margin: -3px 0 0 10px;

        p {
          font-family: 'Montserrat', sans-serif;
          font-size: 15px;
            &:nth-child(2) {
              padding: 5px 0 5px 0;
                @media(min-width: 600px) { padding: 6px 0 6px 0; }
                @media(min-width: 900px) { padding: 8px 0 8px 0; }
                @media(min-width: 1100px) { padding: 10px 0 10px 0; }
            }

            @media(min-width: 600px) { font-size: 16px; }

            span {
              font-weight: 500;
            }
        }
      }
  `;

  export const Action = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 0 12px 0;
    background-color: #F5F5F5;
      @media(min-width: 600px) { padding: 12px 0 12px 0;}

      .comment {
        cursor: pointer;
          img {
            width: 36px;
            height: 36px;
            margin: 4px 0 0 20px;
              @media(min-width: 600px) {
                width: 40px;
                height: 40px;
              }
          }
    
          p {
            color: #fff;
            position: absolute;
            margin: -29px 0 0 34px;
            font-weight: 500;
            font-family: 'Montserrat', sans-serif;
              @media(min-width: 600px) { margin: -31px 0 0 36px; }
          }
      }

      .buttons {
        margin-right: 20px;

          button {
            border: 1px solid #FF5C00;
            background-color: #FF5C00;
            color: #fff;
            font-family: 'Montserrat', sans-serif;
            font-weight: 600;
            font-size: 15px;
            margin: 4px 10px 0 0;
            padding: 0 14px 0 14px;
            height: 32px;
            border-radius: 3px;
              &:nth-child(2) {
                margin-right: 0;
                border: 1px solid #fff;
                background-color: #fff;
                color: grey;
                box-shadow: 0 0 6px 0px #DFDFDF;
                  &:hover { color: #000; }
              }

              @media(min-width: 600px) {
                padding: 0 16px 0 16px;
                height: 34px;
              }
          }
      }
  `;