import HomeScreen from "./screen/HomeScreen";
import SledgingScreen from "./screen/SledgingScreen";

export const HOME_SCREEN = 'HOME_SCREEN';
export const SLEDGING_SCREEN = 'SLEDGING_SCREEN';

export const HomeRouter = {
    [HOME_SCREEN]: {
        screen: HomeScreen
    },
    [SLEDGING_SCREEN]: {
        screen: SledgingScreen
    }
};
