export const SET_PLACE_ID = "SET_PLACE_ID";
export const SET_PLACE_NAME = "SET_PLACE_NAME";
export const SET_EVENT_NAME = "SET_EVENT_NAME";
export const SET_EVENT_DESC = "SET_EVENT_DESC";
export const SET_DATE_TIME = "SET_DATE_TIME";
export const SET_FRIENDS = "SET_FRIENDS";
export const SET_LOADING = "SET_LOADING";

export function setPlaceId(id) {
    // console.log('PlaceID', id)
    return {
        type: SET_PLACE_ID,
        payload: id
    };
}

export function setPlaceName(name) {
    // console.log('PlaceName', name)
    return {
        type: SET_PLACE_NAME,
        payload: name
    };
}

export function setEventName(eName) {
    // console.log('EventName', eName)
    return{
        type: SET_EVENT_NAME,
        payload: eName
    };
}

export function setEventDesc(desc) {
    // console.log('EventDesc', desc)
    return {
        type: SET_EVENT_DESC,
        payload: desc
    };
}

export function setDateTime(dt) {
    console.log('setDateTime', dt)
    return {
        type: SET_DATE_TIME,
        payload: dt
    };
}

export function setFriends(friend) {
    console.log('friends', friend)
    return {
        type: SET_FRIENDS,
        payload: friend
    };
}

export function setLoading(status) {
    console.log('Loading:', status)
    return{
        type: SET_LOADING,
        payload: status
    };
}