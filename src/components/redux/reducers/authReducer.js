import { GOOGLE_SIGNIN_FAIL, GOOGLE_SIGNIN_START, GOOGLE_SIGNIN_SUCCESS, GOOGLE_SIGNOUT_FAIL, GOOGLE_SIGNOUT_START, GOOGLE_SIGNOUT_SUCCESS } from "../types";

const initState = {
    error: null,
    currentUser: null,
    loading: false,
};

function authReducer(state = initState, action) {
    switch (action.type) {
        case GOOGLE_SIGNIN_START:
        case GOOGLE_SIGNOUT_START:
            return { ...state, loading: true };
        case GOOGLE_SIGNIN_SUCCESS:
            return { ...state, currentUser: action.payload, loading: false };
        case GOOGLE_SIGNOUT_SUCCESS:
            return { ...state, currentUser: null, loading: false };
        case GOOGLE_SIGNIN_FAIL:
        case GOOGLE_SIGNOUT_FAIL:
            return { ...state, currentUser: action.payload, loading: false };
        // case GET_SINGLE_NEWSFEED:
        // case UPDATE_NWESFEED_STATE:
        //     return { ...state, post: action.payload, loading: false };
        // case CREATE_NWESFEED:
        // case DELETE_NWESFEED:
        // case UPDATE_NWESFEED:
        // case UPDATE_REACTION:
        //     return { ...state, loading: false };
        default:
            return state;
    }
}
export default authReducer;