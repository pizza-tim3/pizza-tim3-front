import React,  {Component} from 'react';
import axios from 'axios';
import UserImage from '../../../../assets/user.png';
import next from '../../../../assets/next-orange.png';
import prev from '../../../../assets/prev-orange.png';
import {
    PlacesSearchWrap,
    PlacesHeading,
    PlacesSearchInner,
    NextStep,
    FriendsWrap,
    FriendCard,
    ButtonsWrap,
    ButtonGroup
} from '../../../../styles/placesSearchStyles';
import { connect } from 'react-redux';
import { setFriends, setLoading } from '../../../../actions';
import Loading from '../../../loading/loading';
import { ShowMore } from './../../../../styles/placesListStyles';
import { Link } from 'react-router-dom';
import Friend from '../InvFriends/friend';

class FriendPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataIndex: 4,
            data: [],
            friends: [],
            chosenFriends: [],
            toggle: false,
            url: 'https://pizza-tim3-be.herokuapp.com/api/friends/'
        }
    }

    componentDidMount() {
        axios.get(`${this.state.url}${this.props.uid}`)
        .then(res => {
            this.setState({
                ...this.state,
                friends: res.data,
                data: res.data.slice(this.state.dataIndex - 4, this.state.dataIndex)
            });
            this.props.setLoading(false);
        }).catch(err => console.log(err));
    }

    moreItems = () => {
        const dataLength = this.state.friends.length;
        if(this.state.dataIndex < dataLength) {
            let newDI = this.state.dataIndex + 4
            let newFriends = this.state.friends.slice(this.state.dataIndex, newDI);
            this.setState({
                ...this.state,
                dataIndex: newDI,
                data: newFriends
            });
        }
    }

    lessItems = () => {
        if(this.state.dataIndex <= 4) {
            let newDI = this.state.dataIndex - 4;
            this.setState({
                ...this.state,
                dataIndex: newDI,
                data: this.state.friends.slice(newDI, newDI +4)
            });
        } else {
            let test = this.state.friends.slice(0, 4);
            this.setState({
                ...this.state,
                dataIndex: 4,
                data: test
            })
        }
    }

    addToInvited = (friend) => {
        if(!this.state.chosenFriends.includes(friend)) {
            this.setState({
                ...this.state,
                toggle: true,
                chosenFriends: [...this.state.chosenFriends, friend]
            })
        } else {
            let newFriends = this.state.chosenFriends.filter(item => item !== friend)
            this.setState({
                ...this.state,
                chosenFriends: newFriends
            })
        }
    }

    handleNext = () => {
        this.props.setFriends(this.state.chosenFriends);
        this.props.handleClick();
    }


    render() {
        return(
            <PlacesSearchWrap>
                <PlacesHeading>
                    <h2>Invite your friends!:</h2>
                </PlacesHeading>
                <PlacesSearchInner>
                    {this.props.loading ? <Loading /> :
                        <>
                            <FriendsWrap>
                                    {this.state.data.map(data => {
                                        return(
                                        <Friend key={data.firebase_uid} friend={data} addToInvited={this.addToInvited}/>
                                    )})}
                                </FriendsWrap>

                                <ButtonsWrap>
                                    <ShowMore onClick={this.lessItems}>
                                        <img src={prev} alt="previous arrow" />
                                    </ShowMore>
                                    <ShowMore onClick={this.moreItems}>
                                        <img src={next} alt="next arrow" />
                                    </ShowMore>
                                </ButtonsWrap>
                                <ButtonGroup>
                                    <NextStep>
                                        <Link to="/home">Cancel</Link>
                                    </NextStep>
                                    <NextStep onClick={() => {this.handleNext()}}>Next Step</NextStep>
                                </ButtonGroup>
                        </>
                    }
        </PlacesSearchInner>
    </PlacesSearchWrap>
        )
    }
}

const mstp = state => {
    return {
        loading: state.EventReducer.loading,
        uid: state.userReducer.firebase_uid,
        friends: state.EventReducer.friends
    }
}

export default connect(mstp, {setFriends, setLoading})(FriendPicker)
