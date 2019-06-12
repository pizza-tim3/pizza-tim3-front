import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import axios from 'axios';

import Nav from '../../components/home-header/home-header.js';
import Card from '../../components/card/card.js';
import {
    Wrap,
    Inner,
} from '../../styles/userhomeStyles.js';

class UserDashboard extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        pendingEvents: [],
        upcomingEvents: [],
        pastEvents: [],
        selectedTab: "PendingEvents"
         //"UpcomingEvents", "PastEvents"
         
        }
       
      };
    
    




upcomingHandler = event => {
    event.preventDefault();
    //const id =this.props.match.params.id

    //console.log("ID = ", id);
    const id = localStorage.getItem("userFireBaseId");
    axios
      .get(`http://localhost:5500/api/events/upcoming/${id}`)
      .then(res => {
        console.log("Response for UpcomingEvents", res);
        this.setState({
          upcomingEvents: res.data.result,
          selectedTab: "UpcomingEvents"
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  };
  pendingHandler = event => {
    const id = localStorage.getItem("userFireBaseId");
    axios
      .get(`http://localhost:5500/api/events/pending/${id}`)
      .then(res => {
        console.log("RESPONSE OF PENDING EVENTS", res);
        this.setState({
          pendingEvents: res.data.result,
          selectedTab: "PendingEvents"
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  };
  pastHandler = event => {
    const id = localStorage.getItem("userFireBaseId");
    event.preventDefault();
    axios
      .get(`http://localhost:5500/api/events/past/${id}`)
      .then(res => {
        console.log("RESPONSE OF PAST EVENTS", res);
        this.setState({
          pastEvents: res.data.result,
          selectedTab: "PastEvents"
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

render () {
    return(
        <>
            <Nav />
            <Wrap>
                <Inner>
                    <Tabs defaultIndex={1}>
                        <TabList className="tabBox">
                            <Tab className="filterBtn" onClick = {this.upcomingHandler} selectedClassName="filterBtnActive">Upcoming</Tab>
                            <Tab className="filterBtn"  onClick = {this.pendingHandler} selectedClassName="filterBtnActive">Pending</Tab>
                            <Tab className="filterBtn"  onClick = {this.pastHandler} selectedClassName="filterBtnActive">Past</Tab>
                        </TabList>
                        <TabPanel className="tab">
                            {this.state.upcomingEvents.map(event => {
                                return <Card key={event.id} event={event}  />;
                            })}
                        </TabPanel>
                        <TabPanel>
                            {this.state.pendingEvents.map(event => {
                                return <Card key={event.id} event={event} showActions ={true}  />;
                            })}
                        </TabPanel>
                        <TabPanel>
                            {this.state.pastEvents.map(event => {
                                return <Card key={event.id} event={event} />;
                            })}                        
                        </TabPanel>
                    </Tabs>
                </Inner>
            </Wrap>
        </>
    );
  }   
}

export default UserDashboard 