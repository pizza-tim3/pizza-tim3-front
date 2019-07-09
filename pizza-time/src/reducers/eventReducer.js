import {
    SET_PLACE_ID,
    SET_PLACE_NAME,
    SET_EVENT_NAME,
    SET_EVENT_DESC,
    SET_DATE_TIME,
    SET_FRIENDS,
    SET_LOADING,
    SET_INVITE_ONLY,
    SET_EID
} from "../actions";

const initialState = {
    loading: false,
    error: '',
    inviteOnly: '',
    placeId: '',
    placeName: '',
    eventName: '',
    eventDesc: '',
    eid: '',
    dateTime: {},
    friends: []
}

export const EventReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_PLACE_ID:
            console.log('PLACEID:', action.payload)
            return {
                ...state,
                placeId: action.payload
            };
        case SET_PLACE_NAME:
            console.log('placeName:', action.payload)
            return {
                ...state,
                placeName: action.payload
            };
        case SET_EVENT_NAME:
            console.log('eventName:', action.payload)
            return {
                ...state,
                eventName: action.payload
            };
        case SET_EVENT_DESC:
            console.log('eventDesc:', action.payload)
            return {
                ...state,
                eventDesc: action.payload
            };
        case SET_DATE_TIME:
            console.log('dateTime:', action.payload)
            return {
                ...state,
                dateTime: action.payload
            };
        case SET_FRIENDS:
            console.log('friends:', action.payload)
            return {
                ...state,
                friends: action.payload
            };
        case SET_LOADING:
            console.log('loading:', action.payload)
            return {
                ...state,
                loading: action.payload
            }
        case SET_INVITE_ONLY:
            console.log('Invite only:', action.payload);
            return{
                ...state,
                inviteOnly: action.payload
            }
        case SET_EID: 
            console.log('EID:', action.payload)
            return{
                ...state,
                eid: action.payload
            }
        default:
            return state;
    }
}