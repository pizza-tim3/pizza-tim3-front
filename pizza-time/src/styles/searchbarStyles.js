import styled from 'styled-components';
import { colors, fonts, media } from '../styles/variables.js';

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  margin: 0 auto;
  border: none;
  background-color: ${colors.white};
  border-radius: 10px;
  box-shadow: 8px 8px 8px ${colors.lightShadow};

  input {
    border: none;
    padding: 5px 10px;
    margin: 5px;
    width: 90%;

    ::focus {
      background: transparent;
    }
  }

  .search {
    justify-self: flex-end;
    margin-right: 20px;
    margin-top: 6px;
  }

  img {
    width: 30px;
    height: 30px;
  }

`;

