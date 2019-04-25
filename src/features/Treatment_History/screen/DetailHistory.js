import React from 'react';
import { Alert, BackHandler, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
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
                            <CommonText text={HistoryData.name} size={20} />
                            <View style={styles.containerimg}>
                                <Image
                                    style={{width: 120, height: 120}}
                                    source={{uri: HistoryData.pic}}
                                />
                            </View>
                                <View style={styles.containerDetail}>
                                    <CommonText text={'รายละเอียด'} size={20} />
                                    <CommonText text={HistoryData.detail} size={18} />
                                </View>
                                <View style={styles.containerDetail}>
                                    <CommonText text={'สรรพคุณ'} size={20} />
                                    <CommonText text={HistoryData.properties} size={18} />
                                </View>
                                <View style={styles.containerDetail}>
                                    <CommonText text={'นิยมใช้ในการรักษาโรค'} size={20} />
                                    <CommonText text={HistoryData.disease} size={18} />
                                </View>
                        </View>
                    </Content>
                    <SideMenu
                        homeScreen={() => {
                            this.props.REDUCER_SetLoadinglist();
                            this.props.navigation.navigate(HOME_SCREEN);
                        }}
                        symptomScreen={() => {
                            this.props.REDUCER_SetLoadinglist();
                            this.props.navigation.navigate(HISTORY_SCREEN);
                        }}
                        HistoryScreen={() => {
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
        alignItems: 'center',
        marginTop: '5%',
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
        width: '99.9%',
        margin: '1%',
        padding: '1%'
    }
});

export default connect(
    null,
    (dispatch) => ({
        NavigationActions: bindActionCreators(NavigationActions, dispatch),
        REDUCER_SetLoadinglist: bindActionCreators(SETLOAD, dispatch)
    })
)(DetailHistory);
