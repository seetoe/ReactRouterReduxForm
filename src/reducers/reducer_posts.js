import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

export default function(state = {}, action) {
    switch (action.type) {
        case FETCH_POSTS:
            // use lodash mapKeys to map array to object with id as key
            return _.mapKeys(action.payload.data, 'id');
        case FETCH_POST:
            // const post = action.payload.data;
            // const newState = { ...state };
            // newState[post.id] = post;
            // return newState;
            return { ...state, [action.payload.data.id]: action.payload.data };
        case DELETE_POST:
            // if the state object has a key of deleted post ID, drop it
            return _.omit(state, action.payload)
        default:
            return state;
    }
}