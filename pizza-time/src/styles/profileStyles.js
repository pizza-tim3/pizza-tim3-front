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
  margin-bottom: 20px;

  h4 {
    font-size: 1rem;
  }

  h3 {
    margin-bottom: 20px;
  }
`;


export const FriendInfoContainer = styled.div`
  width: 100%;
  border: 1px solid #eee;
  padding: 15px;
  margin-bottom: 20px;


  img {
    width: 120px;
    border-radius: 50%;
    padding: 10px;
  }
`

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
