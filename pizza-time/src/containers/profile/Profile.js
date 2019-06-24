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
  const [error, setError] = useState(undefined);

  const getUser = async () => {
    try {
      //wrap axios call
      const response = await authorizedRequest(
        `${process.env.REACT_APP_BACK_END_URL}/api/users/${
          props.match.params.firebase_uid
        }`
      );
      if (response.error) {
        throw response.error;
      }
      setUser(response);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
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
        ) : error ? (
          <div>{error}</div>
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

export default Profile;
