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
    ButtonsWrap
} from '../../../../styles/placesSearchStyles';
import { connect } from 'react-redux';
import { setFriends, setLoading } from '../../../../actions';
import Loading from '../../../loading/loading';
import { ShowMore } from './../../../../styles/placesListStyles';

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
        console.log(this.props)
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
        console.log('clicked')
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
                <PlacesSearchInner>
                <PlacesHeading>
                    <h2>Invite your friends!:</h2>
                </PlacesHeading>
                {this.props.loading ? <Loading /> : 
                <>
                    <FriendsWrap>
                            {this.state.data.map(data => {
                                return(
                                <FriendCard key={data.firebase_uid} className="friendWrapper">
                                    <img src={data.avatar} alt="user avatar" height="60px" width="60px"/>
                                    <p>{data.first_name} {data.last_name}</p>
                                    <button 
                                        className={
                                            this.state.chosenFriends && 
                                            this.state.chosenFriends.includes(data) ?
                                            'active' : ''
                                        }
                                        onClick={() => {this.addToInvited(data)}}>
                                        Invite
                                    </button>
                                </FriendCard>
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

                        <NextStep onClick={() => {this.handleNext()}}>Next Step</NextStep>
            </>
            }
        </PlacesSearchInner>
    </PlacesSearchWrap>
        )
    }
}

const mstp = state => {
    console.log(state)
    return {
        loading: state.EventReducer.loading,
        uid: state.userReducer.firebase_uid,
        friends: state.EventReducer.friends
    }
}

export default connect(mstp, {setFriends, setLoading})(FriendPicker)

//http://localhost:5500/api/users/jNpViqXD4DXmf9H2FbkQnAy10000/friends




// const [dataIndex, setDataIndex] = useState(4);
// const [data, setData] = useState([]);
// const [friends, setFriends] = useState([]);
// const [chosenFriends, setChosenFriends] = useState([]);

// console.log(props.uid)
// const url = `http://localhost:5500/api/friends/${props.uid}`

// useEffect(() => {
//     console.log(props)
//     axios.get(url)
//         .then(res => {
//             setFriends(res.data);
//             setLoading(false);
//         }).catch(err => console.log(err));
// }, [])

// const moreItems = () => {
//     const dataLength = friends.length;
//     if(dataIndex < dataLength) {
//         setDataIndex(dataIndex + 4);
//     }
// }

// const lessItems = () => {
//     if(dataIndex > 4) {
//         setDataIndex(dataIndex - 4);    
//     }
// }

// const addToInvited = (friend) => {
//     setChosenFriends([...chosenFriends, friend]);
// }

// const handleNext = () => {
//     props.setFriends(chosenFriends);
//     props.handleClick();
// }

// return(
//     <PlacesSearchWrap>
//         <PlacesSearchInner>
//             <PlacesHeading>
//                 <h2>Invite your friends!:</h2>
//             </PlacesHeading>
//             {props.loading ? <Loading /> : 
//             <>
//                 <FriendsWrap>
//                         {data && data.map(data => {
//                             return(
//                             <FriendCard key={data.firebase_uid} className="friendWrapper">
//                                 <img src={UserImage} alt="user avatar" height="60px" width="60px"/>
//                                 <p>{data.first_name} {data.last_name}</p>
//                                 <button 
//                                     className={chosenFriends.includes(data) ? 'active' : 'inactive'}
//                                     onClick={() => {addToInvited(data)}}>
//                                     Invite
//                                 </button>
//                             </FriendCard>
//                         )})}
//                     </FriendsWrap>
//                     <ButtonsWrap>
//                         <ShowMore onClick={lessItems}>
//                             <img src={prev} alt="previous arrow" />
//                         </ShowMore>
//                         <ShowMore onClick={moreItems}>
//                             <img src={next} alt="next arrow" />
//                         </ShowMore>
//                     </ButtonsWrap>
//                     <NextStep onClick={() => {handleNext()}}>Next Step</NextStep>
//             </>
//             }
//         </PlacesSearchInner>
//     </PlacesSearchWrap>
// );