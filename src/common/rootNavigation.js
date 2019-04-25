import React from 'react';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import { HEADER_STYLE } from './constants';
import {HOME_SCREEN, HomeRouter} from "../features/HomeMain/router";
import {HerbRouter} from "../features/Herb/router";
import {SymptomRouter} from "../features/Symptom/router";

export const RootStack = StackNavigator({
    ...HomeRouter,
    ...HerbRouter,
    ...SymptomRouter
},{
    initialRouteName: HOME_SCREEN,
    navigationOptions: ({navigation}) => ({
        ...HEADER_STYLE
    }),
    cardStyle: {
        backgroundColor: '#f6f6f6',
    }
});

const RootDrawer = DrawerNavigator(
    {
        'root': {
            screen: RootStack
        },
    }
);

export const RootNavigator = StackNavigator({
    Drawer: { screen: RootDrawer },
}, {
    headerMode: 'none',
});

export default RootNavigator;
