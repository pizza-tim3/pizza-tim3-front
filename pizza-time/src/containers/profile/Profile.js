import React from "react";
import { connect } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import Header from "../../components/home-header/home-header.js";
import ProfileUserInfo from "../../components/profile-user-info/profile-user-info";
import Favorites from "../../components/favorites/Favorites";
import FriendsList from "../../components/friends-list/FriendsList";

import { Wrap, Inner } from "../../styles/userhomeStyles.js";

const Profile = props => {
  return (
    <div>
      <Header />
      <Wrap>
        <ProfileUserInfo {...props.userReducer} />
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
              <Favorites />
            </TabPanel>
            <TabPanel className="tab">
              <FriendsList />
            </TabPanel>
          </Tabs>
        </Inner>
      </Wrap>
    </div>
  );
};

//Here I've destructured the single reducer
const mstp = ({ userReducer /**,otherReducer */ }) => {
  // console.log(userReducer);
  return { userReducer };
};

export default connect(
  mstp,
  {}
)(Profile);
