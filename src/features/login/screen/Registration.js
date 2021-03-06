import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, ImageBackground, BackHandler, Alert } from 'react-native';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {NavigationActions, withNavigation} from "react-navigation";
import Form from './FormScreen/FormRegistration';
import HandleBack from "../../common/components/HandleBack";
import CommonText from '../../common/components/CommonText';
import { LOGIN } from "../router";

class Registration extends Component {
    constructor(){
        super();
        this.state = {
            editing: true
        }
    }

    onBack = () => {
        if (this.state.editing) {
            Alert.alert(
                'แจ้งเตือน',
                'ต้องการออกจากระบบใช่ไหม ?',
                [
                    { text: 'ใช่', onPress: () => BackHandler.exitApp() },
                    { text: 'ยกเลิก', onPress: () => {}, style: "cancel" },
                ],
                { cancelable: false },
            );
            return true;
        }
        return false;
    };

    render() {

        const { navigate } = this.props.navigation;
        const resetAction = this.props.navigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: 'LOGIN'
                })
            ]
        });

        return (
            <HandleBack onBack={this.onBack}>
                <ImageBackground style={styles.backgroundImage}
                >
                    <Form nameRegistration={'Register'} keyScreen={navigate}/>
                    <View style={styles.signupTextCont}>
                        <CommonText text={'คุณมีบัญชีแล้วหรือยัง ?'} style={styles.signupText} />
                        <TouchableOpacity onPress={ () => this.props.navigation.dispatch(resetAction)}>
                            <CommonText text={'Login'} style={styles.signupButton} />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </HandleBack>
        );
    }
}

Registration.navigationOptions  = ({navigation}) => ({
    headerTransparent: true,
    headerTintColor: '#000',
    headerStyle: {
        backgroundColor: 'transparent'
    }
});

const styles = StyleSheet.create({
    backgroundImage: {
        paddingTop: 60,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10
    },
    containerLogo: {
        flex: 1,
        marginBottom: 30
    },
    button: {
        width: 300,
        backgroundColor: '#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },
    signupTextCont : {
        flexGrow: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 5,
        flexDirection: 'row',
        marginBottom: 10
    },
    signupText: {
        color: 'rgba(0,0,0,0.6)',
        fontSize: 16
    },
    signupButton: {
        color: '#d6913a',
        fontSize: 18,
        fontWeight: '500',
        marginLeft: 5
    },

});

export default connect(
    null,
    (dispatch) => ({
        navigationActions: bindActionCreators(NavigationActions, dispatch)
    })
)(withNavigation(Registration));
