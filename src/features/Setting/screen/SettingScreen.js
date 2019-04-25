import React from 'react';
import { StyleSheet, TouchableOpacity, View, BackHandler, Alert, Keyboard, Image } from 'react-native';
import { Container } from 'native-base';
import Autocomplete from 'react-native-autocomplete-input';
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavigationActions } from "react-navigation";
import HandleBack from "../../common/components/HandleBack";
import SideMenu from '../../common/components/SideMenu';
import HeaderTitle from '../../common/components/HeaderTitle';
import { HOME_SCREEN } from "../../Index/router";
import { HISTORY_SCREEN } from "../../Treatment_History/router";
import { SETTING_SCREEN } from "../router";
import { SETLOAD } from "../../Treatment_History/redux/actions";

class settingScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            editing: true
        };
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

    //ไว้รับค่าแล้วค้นหา
    findFilm(value) {
        this.setState({query: value});
    }

    BtnClear(){ // ปุ่ม x (ลบ)
        this.setState({query: ''});
    }

    render() {
        return (
            <HandleBack onBack={this.onBack}>
                <Container>
                    <View style={styles.container}>
                        <View style={styles.containerViewSearch}>
                            <Icon name={'user-md'} size={30}/>
                            <Autocomplete
                                style={styles.containerSearch}/*กำหนดรูปแบบช่องค้นหา*/
                                containerStyle={styles.autocompleteContainer}/*กำหนดรูปแบบแถบแสดงค้นหา*/
                                defaultValue={this.state.query} /*กำหนดค่าเริ่มต้นให้กับ แวรู้*/
                                onChangeText={(value) => this.findFilm(value)} /*ส่งค่าที่กรอกเข้าไป*/
                                placeholder={'กรุณากรอกชื่อโรค เช่น โรคกระเพราะ'} /*ลายน้ำเพื่อพิมจะหายไป*/
                            />
                            {this.state.query ?
                                <View style={{ flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'}}>
                                    <TouchableOpacity onPress={() => this.BtnClear()} >
                                        <Icon name={'close'} size={25} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{marginLeft: 10}}
                                        onPress={ () => {
                                            Keyboard.dismiss();
                                            this.props.navigation.navigate({routeName: LISTHERB_SCREEN, params: { title: this.state.query }});
                                        }}
                                    >
                                        <Icon name={'search'} size={25} />
                                    </TouchableOpacity>
                                </View>
                                : null
                            }
                        </View>
                    </View>
                    <SideMenu
                        homeScreen={() => {
                            this.props.REDUCER_SetLoadinglist();
                            this.props.navigation.navigate(HOME_SCREEN);
                        }}
                        symptomScreen={() => {
                            this.props.REDUCER_SetLoadinglist();
                            this.props.navigation.navigate(HISTORY_SCREEN);
                        }}
                        herbScreen={() => {
                            this.props.REDUCER_SetLoadinglist();
                            this.props.navigation.navigate(SETTING_SCREEN);
                        }}
                    />
                </Container>
            </HandleBack>
        );
    }
}

settingScreen.navigationOptions  = ({navigation}) => ({
    headerTitle: <HeaderTitle text={'หน้าหลัก'} color={'#fff'} />,
    headerLeft: null
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F4F4F4',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    autocompleteContainer:{
        width: '50%',
        marginHorizontal: 10
    },
    containerSearch: {
        height: 40,
        backgroundColor:'#F4F4F4',
        color:'#d6913a',
        borderWidth: 2,
        borderColor: '#d6913a',
    },
    containerViewSearch: {
        height: 50,
        width: '90%',
        backgroundColor: "#F4F4F4",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 5
    }

});

export default connect(
    null,
    (dispatch) => ({
        NavigationActions: bindActionCreators(NavigationActions, dispatch),
        REDUCER_SetLoadinglist: bindActionCreators(SETLOAD, dispatch)
    })
)(settingScreen);
