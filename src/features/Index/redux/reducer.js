import initialState from './initialState';
import { ALL_SLEDGING } from './constants';

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_SLEDGING:
            return {
                ...state,
                dataSladging: action.json
            };
        default:
            return state;
    }
};

export default reducer;
