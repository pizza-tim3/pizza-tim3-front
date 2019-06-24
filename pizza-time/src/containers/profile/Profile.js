import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import Nav from "../../components/home-header/home-header.js";
import ProfileUserInfo from "../../components/profile-user-info/profile-user-info";
import Favorites from "../../components/favorites/Favorites";
import FriendsList from "../../components/friends-list/FriendsList";

import { Wrap, Inner } from "../../styles/userhomeStyles.js";

import authorizedRequest from "../../firebase/authorizedRequest";

import { CurrentUser } from "../../contexts/CurrentUser";

const Profile = props => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getUser = async () => {
    const response = await authorizedRequest(
      `${process.env.REACT_APP_BACK_END_URL}/api/users/${
        props.match.params.firebase_uid
      }`
    );
    setUser(response);
    setIsLoading(false);
  };
  useEffect(() => {
    getUser();
  }, [props.match.params.firebase_uid]);
  return (
    <div>
      <Nav />
      <Wrap>
        {isLoading ? (
          <div>Loading</div>
        ) : (
          <CurrentUser.Provider value={user}>
            <ProfileUserInfo />
            <Inner>
              <Tabs defaultIndex={1}>
                <TabList className="tabBox">
                  <Tab
                    className="filterBtn"
                    selectedClassName="filterBtnActive"
                  >
                    Favorites
                  </Tab>
                  <Tab
                    className="filterBtn"
                    selectedClassName="filterBtnActive"
                  >
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
          </CurrentUser.Provider>
        )}
      </Wrap>
    </div>
  );
};

//Here I've destructured the single reducer
const mstp = ({ userReducer /**,otherReducer */ }) => {
  console.log(userReducer);
  return { userReducer };
};

export default connect(
  mstp,
  {}
)(Profile);
