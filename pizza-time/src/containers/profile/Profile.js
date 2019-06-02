import React, { useReducer } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import Nav from "../../components/home-header/home-header.js";
import FriendSearchBox from "../../components/friend-search-box/friend-search-box";
import ProfileUserInfo from "../../components/profile-user-info/profile-user-info";

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
    { username: "", slicesPerMonth: 0, topping: "", crust: "" }
  );
  return (
    <div>
      <Nav />
      <Wrap>
        <ProfileUserInfo {...state} />
        <FriendSearchBox />
        <a href="#">Invite A Friend!</a>
        {/* User info */}
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
              <h3>Favorites</h3>
              {/* Favorites Component */}
            </TabPanel>
            <TabPanel className="tab">
              <h3>Friends</h3>
              {/* Favorites Component */}
            </TabPanel>
          </Tabs>
        </Inner>
      </Wrap>
    </div>
  );
};

export default Profile;
