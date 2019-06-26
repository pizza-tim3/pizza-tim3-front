import styled from "styled-components";
import { colors, fonts, media } from "../styles/variables.js";

export const Inner = styled.div`
  display: flex;
  margin: 0px auto;
  box-shadow: 0 0 6px 0px ${colors.shadow};
  margin-top: 20px;
  flex-direction: column;
  padding: 20px;
  width: 90%;
  .loading {
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #bar {
    margin-left: 0px;
    padding-left: 7px;
    margin-bottom: 22px;
  }
  .new-location-search  {
    
    button {
      background-color: white;
      border: none;
      margin-left: 8px;
      img {
        height: 40px;
        width: 40px;
      }
    }
  }
  .sc-chPdSV.hOuMoe {
      display: flex;
      flex-direction: row;
  }
}`;
