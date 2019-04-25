import { combineReducers } from 'redux';
import HomeReducer from "../features/HomeMain/redux/reducer";
import SymptomReducer from "../features/Symptom/redux/reducer";
import HerbReducer from "../features/Herb/redux/reducer";

export default  combineReducers({
    dataHome: HomeReducer,
    dataSymptom: SymptomReducer,
    dataHerb: HerbReducer,
});
