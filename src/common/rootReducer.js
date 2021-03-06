import { combineReducers } from 'redux';
import HomeReducer from "../features/Index/redux/reducer";
import HistoryReducer from "../features/Treatment_History/redux/reducer";
import SettingReducer from "../features/Setting/redux/reducer";
import UserReducer from "../features/login/redux/reducer";

export default  combineReducers({
    dataHome: HomeReducer,
    dataHistory: HistoryReducer,
    dataSetting: SettingReducer,
    dataUser: UserReducer
});
