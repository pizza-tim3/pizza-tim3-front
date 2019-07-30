import styled from "styled-components";
import { colors, fonts, media } from "../styles/variables.js";

//container for friends and favorites

export const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

export const ProfileListContainer = styled.div`
  margin-top: 20px;
  // display: grid;
  // padding: 25px;
  // justify-items: start;
  // grid-template-columns: 1fr 1fr;
  // grid-row-gap: 25px;

  // /* @ 700px break to one column */
  // @media only screen and (max-width: 700px) {
  //   grid-template-columns: 1fr;
  // }

  h4 {
    font-size: 1rem;
  }
`;

//Wrapper for all of the friend info
export const FriendInfoContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-areas:
    "avatar username acceptBtn"
    "avatar location rejectBtn";
  grid-template-columns: 150px 1fr 1fr;

  @media only screen and (max-width: 980px) {
    grid-template-areas:
      "avatar username"
      "avatar location"
      "acceptBtn rejectBtn";
    grid-template-columns: 150px 1fr;
    /* if status is pending and showing buttons add another row for
    buttons */
    grid-template-rows: 1fr 1fr ${props =>
        props.status === "pending" ? "100px" : ""};
    button:nth-of-type(2) {
      justify-self: right;
    }
  }

  & > img {
    grid-area: avatar;
    border-radius: 50%;
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
    align-self: center;
  }

  button {
    align-self: center;
  }
`;

/*Tool bar that contains the `find a new friend` and `invite a friend`
  on the FriendsList Component and `add new favorite` and `filter` 
  component on the FavoritesList Component
*/
export const ListToolBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 25px;
  margin-top: 60px;
`;

export const Button = styled.button`
  width: 130px;
  height: 38px;
  background-color: ${colors.white};
  border: 1px solid ${colors.white};
  box-shadow: 0 0 7px 0px ${colors.shadow};
  font-family: ${fonts.primary};
  font-weight: 600;
  font-size: 15px;
  color: ${colors.gray};
  ${media.desktop} {
    width: 140px;
    height: 42px;
  }

  &:hover {
    background-color: ${colors.primary};
    color: ${colors.white};
    border: 1px solid ${colors.primary};
  }
`;
