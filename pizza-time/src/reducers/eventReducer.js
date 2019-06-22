import {
    SET_PLACE_ID,
    SET_PLACE_NAME,
    SET_EVENT_NAME,
    SET_EVENT_DESC,
    SET_DATE_TIME,
    SET_FRIENDS
} from "../actions";

const initialState = {
    loading: false,
    error: '',
    placeId: '',
    placeName: '',
    eventName: '',
    eventDesc: '',
    dateTime: {},
    friends: []
}

export const EventReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_PLACE_ID:
            return {
                ...state,
                placeId: action.payload
            };
        case SET_PLACE_NAME:
            return {
                ...state,
                placeName: action.payload
            };
        case SET_EVENT_NAME:
            return {
                ...state,
                eventName: action.payload
            };
        case SET_EVENT_DESC:
            return {
                ...state,
                eventDesc: action.payload
            };
        case SET_DATE_TIME:
            return {
                ...state,
                dateTime: action.payload
            };
        case SET_FRIENDS:
            return {
                ...state,
                friends: action.payload
            };
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state;
    }
}