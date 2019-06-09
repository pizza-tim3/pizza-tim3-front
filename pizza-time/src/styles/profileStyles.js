import styled from "styled-components";
import { colors, fonts, media } from "../styles/variables.js";

//container for friends and favorites
export const ProfileListContainer = styled.div`
  display: grid;
  padding: 25px;
  justify-items: start;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 25px;

  /* @ 700px break to one column */
  @media only screen and (max-width: 700px) {
    grid-template-columns: 1fr;
  }

  h4 {
    font-size: 1rem;
  }
`;

//Wrapper for all of the friend info
export const FriendInfoContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-areas:
    "avatar username"
    "avatar location";
  grid-template-columns: 125px 1fr;

  & > img {
    grid-area: avatar;
  }
  & > h4 {
    grid-area: username;
    justify-self: start;
    align-self: center;
  }
  & > p {
    grid-area: location;
    margin: 0px;
    padding: 0px;
    justify-self: start;
  }
`;
