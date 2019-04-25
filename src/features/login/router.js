import LoginScreen from "./screen/LoingScreen";
import RegistrationScreen from "./screen/Registration";

export const LOGIN = 'LOGIN';
export const REGISTRATION = 'REGISTRATION';


export const UserRouter = {
    [LOGIN]: {
        screen: LoginScreen,
        navigationOptions: ({navigation}) => ({
           drawerLockMode: 'locked-closed'
        })
    },
    [REGISTRATION]: {
        screen: RegistrationScreen,
        navigationOptions: ({navigation}) => ({
            drawerLockMode: 'locked-closed'
        })
    }
};
