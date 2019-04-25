import React from 'react';
import { StyleSheet, TouchableOpacity, View, BackHandler, Alert, Keyboard, Image } from 'react-native';
import { Container, Card, CardItem, Body } from 'native-base';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavigationActions } from "react-navigation";
import HandleBack from "../../common/components/HandleBack";
import CommonText from '../../common/components/CommonText';
import SideMenu from '../../common/components/SideMenu';
import HeaderTitle from '../../common/components/HeaderTitle';
import { HOME_SCREEN } from "../router";
import { HISTORY_SCREEN } from "../../Treatment_History/router";
import { SETTING_SCREEN } from "../../Setting/router";
import { SETLOAD } from "../../Treatment_History/redux/actions";

class homeScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
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

    render() {
        return (
            <HandleBack onBack={this.onBack}>
                <Container>
                    <View style={styles.container}>
                        <Image
                            source={{uri: 'data:image/jpeg;base64,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'}}
                            style={styles.image}
                        />
                        <View style={{flex: 1}}>
                            <View style={[styles.containerText,{marginTop: 30}]}>
                                <CommonText text={'ชื่อ :'} style={{fontWeight: 'bold', marginLeft: '19.5%'}} />
                                <CommonText text={'เคี้ยวกุด สมัยนั้น'} style={{marginLeft: 10}} />
                            </View>
                            <View style={[styles.containerText,{marginTop: 0}]}>
                                <CommonText text={'เพศ :'} style={{fontWeight: 'bold', marginLeft: '16.5%'}} />
                                <CommonText text={'ชาย'} style={{marginLeft: 10}} />
                            </View>
                            <View style={[styles.containerText,{marginTop: 0}]}>
                                <CommonText text={'วันเกิด :'} style={{fontWeight: 'bold', marginLeft: '7.5%'}} />
                                <CommonText text={'18/06/2541'} style={{marginLeft: 10}} />
                            </View>
                            <View style={[styles.containerText,{marginTop: 0, marginBottom: 0}]}>
                                <CommonText text={'สายพันธ์ :'} style={{fontWeight: 'bold'}} />
                                <CommonText text={'ปลั้ก'} style={{marginLeft: 10}} />
                            </View>
                        </View>
                        <Card style={styles.cardSchedule}>
                            <CardItem>
                                <Body style={styles.cardBody}>
                                    <CommonText text={'แจ้งกำหนดการนัดครั้งถัดไป'} size={22} style={{marginBottom: '5%', fontWeight: 'bold'}} />
                                    <View style={styles.containerText}>
                                        <CommonText text={'วันที่ : '} size={20} style={{fontWeight: 'bold'}} />
                                        <CommonText text={'08/04/2562'} size={20} style={{marginLeft: 10}} />
                                    </View>
                                    <View style={styles.containerText}>
                                        <CommonText text={'เวลา : '} size={20} style={{fontWeight: 'bold', marginLeft: -40}} />
                                        <CommonText text={'10:10 น.'} size={20} style={{marginLeft: 10}} />
                                    </View>
                            </Body>
                        </CardItem>
                        </Card>
                        <View style={styles.containerSliding}>
                            <TouchableOpacity
                                //onPress={ () => this.props.navigation.navigate({routeName: LISTHERB_SCREEN, params: { title: 'โรคท้องผูก' }})}
                            >
                                <CommonText text={'เลื่อนการนัด'} size={18} style={{fontWeight: 'bold'}} />
                            </TouchableOpacity>
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

homeScreen.navigationOptions  = ({navigation}) => ({
    headerTitle: <HeaderTitle text={'หน้าหลัก'} color={'#fff'} />,
    headerLeft: null
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F4F4F4',
        flex: 1,
        alignItems: 'center',
        marginTop: '10%'
    },
    image: {
        width: 120,
        height: 120
    },
    containerText: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
    cardSchedule: {
        borderWidth: 5,
        borderColor: '#d6913a',
        width: '96%' ,
        height: 150
    },
    cardBody: {
        flex: 1,
        alignItems: 'center'
    },
    containerSliding: {
        width: '99%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: '3%'
    },
});

export default connect(
    null,
    (dispatch) => ({
        NavigationActions: bindActionCreators(NavigationActions, dispatch),
        REDUCER_SetLoadinglist: bindActionCreators(SETLOAD, dispatch)
    })
)(homeScreen);
