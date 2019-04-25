import initialState from './initialState';
import { ALL_LIST, SET_LOAD } from './constants';

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_LIST:
            return {
                ...state,
                dataList: action.json,
                loading: false
            };
        case SET_LOAD:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
};

export default reducer;
