export const SET_PLACE_ID = "SET_PLACE_ID";
export const SET_PLACE_NAME = "SET_PLACE_NAME";
export const SET_EVENT_NAME = "SET_EVENT_NAME";
export const SET_EVENT_DESC = "SET_EVENT_DESC";
export const SET_DATE_TIME = "SET_DATE_TIME";
export const SET_FRIENDS = "SET_FRIENDS";
export const SET_LOADING = "SET_LOADING";
export const SET_INVITE_ONLY = "SET_INVITE_ONLY";
export const SET_EID = "SET_EID";

export function setPlaceId(id) {
    return {
        type: SET_PLACE_ID,
        payload: id
    };
}

export function setPlaceName(name) {
    return {
        type: SET_PLACE_NAME,
        payload: name
    };
}

export function setEventName(eName) {
    return{
        type: SET_EVENT_NAME,
        payload: eName
    };
}

export function setEventDesc(desc) {
    return {
        type: SET_EVENT_DESC,
        payload: desc
    };
}

export function setDateTime(dt) {
    return {
        type: SET_DATE_TIME,
        payload: dt
    };
}

export function setFriends(friend) {
    return {
        type: SET_FRIENDS,
        payload: friend
    };
}

export function setLoading(status) {
    return{
        type: SET_LOADING,
        payload: status
    };
}

export function setInviteOnly(invite) {
    return {
        type: SET_INVITE_ONLY,
        payload: invite
    }
}

export function setEID(eid) {
    return {
        type: SET_EID,
        payload: eid
    }
}