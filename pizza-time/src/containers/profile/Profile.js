import React, { useReducer, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import firebaseApp from "../../firebase/firebaseApp";

import Nav from "../../components/home-header/home-header.js";
import FriendSearchBox from "../../components/friend-search-box/friend-search-box";
import ProfileUserInfo from "../../components/profile-user-info/profile-user-info";
import Favorites from "../../components/favorites/Favorites";
import FriendsList from "../../components/friends-list/FriendsList";

import { Wrap, Inner } from "../../styles/userhomeStyles.js";

const Profile = () => {
  const [state, dispatch] = useReducer(
    //reducer function
    (previousState, action) => {
      switch (action.type) {
        case "SET_USERNAME":
          return { ...previousState, error: action.payload };
        case "SET_SLICES_PER_MONTH":
          return { ...previousState, error: action.payload };
        case "SET_TOPPING":
          return { ...previousState, error: action.payload };
        case "SET_CRUST":
          return { ...previousState, error: action.payload };
        case "SET_ERROR":
          return { ...previousState, error: action.payload };
        case "CLEAR_ERROR":
          return { ...previousState, error: action.payload };
        default:
          throw new Error("unexpected action type");
      }
    },
    //initial state
    {
      username: "",
      slicesPerMonth: 0,
      topping: "",
      crust: "",
      friends: [],
      favorites: []
    }
  );

  useEffect(() => {
    // const user = firebaseApp.auth().currentUser;
    // console.log(user);
    // get user info
  });
  return (
    <div>
      <Nav />
      <Wrap>
        <ProfileUserInfo {...state} />
        <FriendSearchBox />
        <a href="#">Invite A Friend!</a>
        <Inner>
          <Tabs defaultIndex={1}>
            <TabList className="tabBox">
              <Tab className="filterBtn" selectedClassName="filterBtnActive">
                Favorites
              </Tab>
              <Tab className="filterBtn" selectedClassName="filterBtnActive">
                Friends
              </Tab>
            </TabList>
            <TabPanel className="tab">
              <Favorites {...state} />
            </TabPanel>
            <TabPanel className="tab">
              <FriendsList {...state} />
            </TabPanel>
          </Tabs>
        </Inner>
      </Wrap>
    </div>
  );
};

export default Profile;
