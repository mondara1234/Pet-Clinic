import React, { Component } from 'react';
import { StyleSheet, Alert, Text, View, TouchableOpacity, TextInput, ImageBackground, BackHandler, Keyboard, Image  } from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import HandleBack from "../../common/components/HandleBack";
import CommonText from '../../common/components/CommonText';
import { getOneUser } from '../redux/actions';
import * as API from '../api/api';
import { REGISTRATION } from "../router";
import {HOME_SCREEN} from "../../Index/router";

class LoingScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            User: '',
            UserPassword: '',
            editing: true,
            data_User: []
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

    UserLoginFunction = async() =>{
        Keyboard.dismiss();
        this.props.navigation.navigate(HOME_SCREEN);
        // if(this.state.User === '' || this.state.UserPassword === '' ){
        //     Alert.alert(
        //         'แจ้งเตือน',
        //         'กรุณากรอกให้ครบ',
        //         [
        //             { text: 'ยกเลิก', onPress: () => {}, style: "cancel" },
        //         ],
        //         { cancelable: false },
        //     );
        // }else{
        //     const username = this.state.User;
        //     const UserNames = `${username}`;
        //     const Password = this.state.UserPassword;
        //     const keyScreen = this.props.navigation;
        //     const response = await this.props.FETCH_Login(UserNames, Password);
        //     if(response === 'Data Matched')
        //     {
        //         const result = await this.props.FETCH_ShowUser(UserNames);
        //         this.props.REDUCER_ONEDATA(result);
        //         keyScreen.navigate('HOME_SCREEN')
        //     }
        //     else{
        //         Alert.alert('Error',response);
        //     }
        //
        // }
    };

    render() {

        const resetAction = this.props.navigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: 'REGISTRATION'
                })
            ]
        });

        return (
            <HandleBack onBack={this.onBack}>
                <Container style={styles.container} >
                    <ImageBackground style={styles.backgroundImage}
                                     //source={{uri: 'https://sv1.picz.in.th/images/2019/02/27/TIiH0R.png'}}
                    >
                        <Image
                            style={{width: 200, height: 200, marginBottom: '5%'}}
                            source={require('../../../../pulic/assets/img/logo.png')}
                        />
                        <View style={styles.containerView}>
                            <View style={styles.containerText}>
                                <IconMaterialCommunityIcons name="email" size={30} style={styles.icon}/>
                                <TextInput style={styles.inputBox}
                                           underlineColorAndroid='rgba(0,0,0,0)'
                                           placeholder={'E-mail'}
                                           placeholderTextColor = "#d6913a"
                                           selectionColor="#fff"
                                           onChangeText={UserName =>this.setState({User: UserName})}
                                />
                            </View>
                            <View style={styles.containerText}>
                                <IconFontAwesome name="lock" size={30} style={styles.icon}/>
                                <TextInput style={styles.inputBox}
                                           underlineColorAndroid='rgba(0,0,0,0)'
                                           placeholder={'Password'}
                                           secureTextEntry={true}
                                           placeholderTextColor = "#d6913a"
                                           onChangeText={UserPassword =>this.setState({UserPassword: UserPassword})}
                                />
                            </View>
                            <TouchableOpacity style={styles.button} onPress={this.UserLoginFunction}>
                                <View style={styles.containerRow}>
                                    <IconMaterialCommunityIcons name="login" size={30} style={styles.styleIconFontAwesome}/>
                                    <CommonText text={'Login'} style={styles.buttonText} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                    <View style={styles.signupTextCont}>
                        <CommonText text={'คุณมีบัญชีแล้วหรือยัง ?'} style={styles.signupText} />
                        <TouchableOpacity onPress={() =>  this.props.navigation.dispatch(resetAction)}>
                            <CommonText text={'Register'} style={styles.signupButton} />
                        </TouchableOpacity>
                    </View>
                </Container>
            </HandleBack>
        )
    }
}

LoingScreen.navigationOptions  = ({navigation}) => ({
    header: null
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleLogin: {
        color: '#d6913a',
        fontSize: 24,
        marginLeft: 10
    },
    containerView: {
        marginLeft: 10,
        justifyContent: 'center'
    },
    signupTextCont: {
        position: 'absolute',
        bottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    signupText: {
        color: 'rgba(0,0,0,0.6)',
        fontSize: 18
    },
    signupButton: {
        color: '#d6913a',
        fontSize: 18,
        fontWeight: '500',
        marginLeft: 5
    },
    inputBox: {
        width: 200,
        height: 40,
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderColor: '#000',
        fontSize: 18,
        color: '#d6913a',
        paddingLeft: 10,
        marginVertical: 5,
        justifyContent: 'center',
        paddingBottom: 5
    },
    button: {
        borderRadius: 25,
        borderWidth: 1,
        marginTop: 20,
        paddingVertical: 10,
        backgroundColor: '#d6913a'
    },
    buttonText: {
        fontSize: 20,
        color: '#ffffff',
        textAlign: 'center'
    },
    containerText: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
    icon: {
        color: '#000',
        marginTop: 15,
        marginRight: '2%'
    },
    styleIconFontAwesome: {
        marginRight: 40,
        marginLeft: -20,
        color: '#fff'
    },
});

function mapStateToProps(state) {
    return{
        Users: state.dataUser
    };
}

export default connect(
    mapStateToProps,
    (dispatch) => ({
        navigationActions: bindActionCreators(NavigationActions, dispatch),
        REDUCER_ONEDATA: bindActionCreators(getOneUser, dispatch),
        FETCH_Login: bindActionCreators(API.fetchLogin, dispatch),
        FETCH_ShowUser: bindActionCreators(API.fetchSearchUser, dispatch),
    })
)(LoingScreen);
