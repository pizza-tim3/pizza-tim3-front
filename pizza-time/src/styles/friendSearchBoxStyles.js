import styled from "styled-components";
import { colors, fonts, media } from "../styles/variables.js";

export const Wrap = styled.div`
  input {
    border: 1px solid ${colors.gray};
    border-radius: 8px 0 0 8px;
    padding: 5px;
  }

  button {
    padding: 5px 10px;
    border: 1px solid ${colors.gray};
    background-color: ${colors.gray};
    color: ${colors.white};
    border-radius: 0 8px 8px 0;
    
    &:hover {
      border: 1px solid ${colors.primary};
      background-color: ${colors.primary};
      color: ${colors.white};
    }
  }
`;