import React from 'react';
import { Alert, BackHandler, StyleSheet, View } from 'react-native';
import { Container ,Content } from 'native-base';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavigationActions } from "react-navigation";
import HandleBack from "../../common/components/HandleBack";
import HeaderTitle from '../../common/components/HeaderTitle';
import CommonText from '../../common/components/CommonText';
import SideMenu from '../../common/components/SideMenu';
import { HOME_SCREEN } from "../../Index/router";
import { HISTORY_SCREEN } from "../router";
import { SETTING_SCREEN } from "../../Setting/router";
import { SETLOAD } from "../redux/actions";
import moment from "moment/moment";

class DetailHistory extends React.PureComponent {
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
        const { HistoryData } = this.props.navigation.state.params;

        return (
            <HandleBack onBack={this.onBack}>
                <Container>
                    <Content style={{width: '100%'}}>
                        <View style={styles.container}>
                            <View style={{alignItems:'center', marginBottom: 5}}>
                                <CommonText text={HistoryData.title} size={20} style={{fontWeight: 'bold', alignItems:'center'}}  />
                            </View>
                            <View style={{marginLeft: 10}}>
                                <View style={[styles.containerText,{marginTop: 5}]}>
                                    <CommonText text={'วันที่ทำการรักษา : '} size={18} style={{fontWeight: 'bold'}}  />
                                    <CommonText text={`${moment(HistoryData.date).format("DD/MM/YYYY")} ${HistoryData.time}`} size={18} />
                                </View>
                                <View style={[styles.containerText,{marginTop: 5}]}>
                                    <CommonText text={'ผู้รับผิดชอบ : '} size={18} style={{fontWeight: 'bold'}}  />
                                    <CommonText text={HistoryData.nameVeterinary} size={18} />
                                </View>
                                <View style={[styles.containerText,{marginBottom: 10, marginTop: 5}]}>
                                    <CommonText text={'เบอร์โทรศัทพ์ : '} size={18} style={{fontWeight: 'bold'}}  />
                                    <CommonText text={HistoryData.phoneVeterinary} size={18} />
                                </View>
                            </View>
                            <CommonText text={'อาการ :'} size={18} style={{fontWeight: 'bold'}}  />
                            <View style={styles.containerDetail}>
                                <CommonText text={HistoryData.symptom} size={18} />
                            </View>
                            <CommonText text={'รายละเอียดการรักษา :'} size={18} style={{fontWeight: 'bold'}}  />
                            <View style={styles.containerDetail}>
                                <CommonText text={HistoryData.detail} size={18} />
                            </View>
                            <CommonText text={'ราคาทั้งหมด :'} size={18} style={{fontWeight: 'bold'}} />
                            <View style={styles.containerDetail}>
                                <CommonText text={`${HistoryData.price} บาท`} size={18} />
                            </View>
                        </View>
                    </Content>
                    <SideMenu
                        homeScreen={() => {
                            this.props.REDUCER_SetLoadinglist();
                            this.props.navigation.navigate(HOME_SCREEN);
                        }}
                        historyScreen={() => {
                            this.props.REDUCER_SetLoadinglist();
                            this.props.navigation.navigate(HISTORY_SCREEN);
                        }}
                        settingScreen={() => {
                            this.props.REDUCER_SetLoadinglist();
                            this.props.navigation.navigate(SETTING_SCREEN);
                        }}
                    />
                </Container>
            </HandleBack>
        );
    }
}

DetailHistory.navigationOptions  = ({navigation}) => ({
    headerTitle: <HeaderTitle text={'รายละเอียดการรักษา'} color={'#fff'} style={{marginLeft: '-20%'}} />,
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '5%',
        paddingLeft: 5,
        paddingTop: 5
    },
    containerimg: {
        borderWidth: 2,
        borderColor: '#d6913a',
        margin: '5%'
    }
    ,
    containerDetail: {
        borderWidth: 2,
        borderColor: '#d6913a',
        width: '98%',
        margin: '1%',
        padding: '1%',
        marginBottom: 5
    },
    containerText: {
        flexDirection: 'row',
        margin: 5,
        marginBottom: 0
    }
});

export default connect(
    null,
    (dispatch) => ({
        NavigationActions: bindActionCreators(NavigationActions, dispatch),
        REDUCER_SetLoadinglist: bindActionCreators(SETLOAD, dispatch)
    })
)(DetailHistory);
