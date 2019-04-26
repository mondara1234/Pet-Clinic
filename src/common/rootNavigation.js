import React from 'react';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import { HEADER_STYLE } from './constants';
import { HomeRouter } from "../features/Index/router";
import { SettingRouter, SETTING_SCREEN } from "../features/Setting/router";
import { HistoryRouter } from "../features/Treatment_History/router";
import { UserRouter, LOGIN, REGISTRATION } from "../features/login/router";

export const RootStack = StackNavigator({
    ...HomeRouter,
    ...SettingRouter,
    ...HistoryRouter,
    ...UserRouter
},{
    initialRouteName: REGISTRATION,
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
