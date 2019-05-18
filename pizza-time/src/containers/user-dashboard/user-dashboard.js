import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Nav from '../../components/home-header/home-header.js';
import Footer from '../../components/footer/footer.js';

import {
    Wrap,
    Inner,
} from '../../styles/userhomeStyles.js';

const UserDashboard = () => {
    return(
        <>
            <Nav />
            <Wrap>
                <Inner>
                    <Tabs defaultIndex={1} onSelect={index => console.log(index)}>
                        <TabList className="tabBox">
                            <Tab className="filterBtn" selectedClassName="filterBtnActive">Upcoming</Tab>
                            <Tab className="filterBtn" selectedClassName="filterBtnActive">Pending</Tab>
                            <Tab className="filterBtn" selectedClassName="filterBtnActive">Past</Tab>
                        </TabList>
                        <TabPanel className="tab">Tab 1</TabPanel>
                        <TabPanel>Tab 2</TabPanel>
                        <TabPanel>Tab 3</TabPanel>
                    </Tabs>
                </Inner>
            </Wrap>
            {/* <Footer /> */}
        </>
    );
}

export default UserDashboard 