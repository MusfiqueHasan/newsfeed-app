import { CREATE_NWESFEED, DELETE_NWESFEED, GET_NWESFEED, UPDATE_NWESFEED, UPDATE_REACTION, BOOKMARK_POST, GET_SINGLE_NEWSFEED, UPDATE_NWESFEED_STATE, UPDATE_MODAL_STATE } from "../types";

const initState = {
    posts: [],
    post: {},
    bookmarkPost: {},
    openModel: false,
};

function newsFeedReducer(state = initState, action) {
    switch (action.type) {
        case GET_NWESFEED:
            return { ...state, posts: action.payload, loading: false };
        case BOOKMARK_POST:
            return { ...state, bookmarkPost: action.payload, loading: false };
        case GET_SINGLE_NEWSFEED:
        case UPDATE_NWESFEED_STATE:
        case UPDATE_MODAL_STATE:
            return { ...state, openModel: action.payload, loading: false };
        case CREATE_NWESFEED:
        case DELETE_NWESFEED:
        case UPDATE_NWESFEED:
        case UPDATE_REACTION:
            return { ...state, loading: false };
        default:
            return state;
    }
}
export default newsFeedReducer;