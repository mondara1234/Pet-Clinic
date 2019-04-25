import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar, YellowBox } from 'react-native';
import { StyleProvider, Root } from 'native-base';
import ThemeVariables from '../native-base-theme/variables/platform';
import RootNavigation from './common/rootNavigation';
import getTheme from '../native-base-theme/components';
import { createStore } from "redux"
import reducer from "./common/rootReducer";

const store = createStore(reducer);

class App extends React.Component{

    render() {
        console.disableYellowBox = true;//ปิดข้อความสีเหลือง

        return (
            <StyleProvider style={getTheme(ThemeVariables)}>
                <Provider store={store}>
                    <Root>
                        <StatusBar
                            barStyle="light-content"
                            backgroundColor="#6a51ae"
                        />
                        <RootNavigation />
                    </Root>
                </Provider>
            </StyleProvider>
        );
    }
}

export default App;
