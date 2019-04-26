import initialState from './initialState';
import { ADD_ONEUSER, ROUTE_START, USER_LOGOUT } from './constants';

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ONEUSER:
            return {
                ...state,
                user: action.payload,
                loading: false
            };
        case USER_LOGOUT:
            return {
                ...state,
                user: []
            };
        default:
            return state;
    }
};

export default reducer;
