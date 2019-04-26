import React from 'react';
import {StyleSheet, View, TextInput, Image, FlatList, TouchableOpacity, BackHandler, Alert, Keyboard} from 'react-native';
import { Container, Textarea, Form } from 'native-base';
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DatePicker from 'react-native-datepicker'
import HandleBack from "../../common/components/HandleBack";
import moment from "moment/moment";
import CommonText from '../../common/components/CommonText';
import HeaderTitle from '../../common/components/HeaderTitle';
import SideMenu from '../../common/components/SideMenu';
import { HOME_SCREEN } from "../router";
import { HISTORY_SCREEN } from "../../Treatment_History/router";
import { SETTING_SCREEN } from "../../Setting/router";
import { SETLOAD } from "../../Treatment_History/redux/actions";
import * as APISledging from "../../Index/api/api";

class SledgingScreen extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            editing: true,
            dateShow: moment().format("DD/MM/YYYY HH:mm"),
            timeBD: '',
            dateBD: '',
            detail: ''
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

    addSledging(){
        if(this.state.dateBD === '' && this.state.timeBD === '' ){
            Alert.alert(
                'แจ้งเตือน',
                'กรุณาเลือกวันที่นัดใหม่',
                [
                    { text: 'ยกเลิก', onPress: () => {}, style: "cancel" },
                ],
                { cancelable: false },
            );
        }else if(this.state.detail === ''){
            Alert.alert(
                'แจ้งเตือน',
                'กรุณากรอกสาเหตุการเลื่อนนัด',
                [
                    { text: 'ยกเลิก', onPress: () => {}, style: "cancel" },
                ],
                { cancelable: false },
            );
        }else{
            Alert.alert(
                'แจ้งเตือน',
                `คุณต้องการเลื่อนนัดเป็นวันที่: ${this.state.dateShow} ใช่ไหม`,
                [
                    { text: 'ใช่', onPress: () => {
                        this.props.FETCH_InsertSledging();
                    } },
                    { text: 'ยกเลิก', onPress: () => {}, style: "cancel" },
                ],
                { cancelable: false },
            );
        }
    }

    BtnClear(){ // ปุ่ม x (ลบ)
        let dateFull = moment().format("DD/MM/YYYY HH:mm");
        this.setState({
            detail : '',
            dateShow: dateFull
        })
    }

    render() {
        let date = new Date();
        return (
            <HandleBack onBack={this.onBack}>
                <Container>
                    <View style={styles.container}>
                        <CommonText text={'การเลื่อนนัดใหม่'} size={24} style={{fontWeight: 'bold'}}/>
                        <View style={styles.containerCalendar}>
                            <CommonText text={'ระบุวันที่ใหม่ : '} style={styles.textDate}/>
                            <CommonText text={this.state.dateShow} style={[styles.textDate,{color: '#d6913a'}]}/>
                            <DatePicker
                                style={{width: 40}}
                                date={this.state.date}
                                hideText
                                mode="datetime"
                                format="YYYY-MM-DD HH:mm"
                                minDate={moment(`${date}`).format("YYYY-MM-DD HH:mm")}
                                customStyles={{
                                    dateIcon: {
                                        width: 30,
                                        height: 30
                                    }
                                }}
                                onDateChange={(fulldate) => {
                                    let dateshow = moment(`${fulldate}`).format("DD/MM/YYYY HH:mm");
                                    let date = moment(`${fulldate}`).format("YYYY-MM-DD");
                                    let time = moment(`${fulldate}`).format("HH:mm");
                                    this.setState({
                                        dateBD: date,
                                        timeBD: time,
                                        dateShow: dateshow
                                    });
                                }}
                            />
                        </View>
                        <View style={styles.textAreaContainer} >
                            <CommonText text={'ระบุสาเหตุการเลื่อนนัด:'} size={18} style={{fontWeight: 'bold', alignItems: 'flex-start'}}/>
                            <Form>
                                <Textarea
                                    style={{backgroundColor: '#fff'}}
                                    rowSpan={10}
                                    bordered
                                    placeholder={'กรุณากรอกสาเหตุการเลื่อนนัด'}
                                    defaultValue={this.state.detail}
                                    onChangeText={Detail =>this.setState({ detail: Detail })}
                                />
                            </Form>
                            <CommonText text={'*** หมายเหตุ สามารถติดต่อสอบถามวันที่ว่างของสัตวแพทย์ที่เป็นผู้รับผิดชอบก่อนทำการเลือกวันที่นัดใหม่ได้ โดยติดต่อได้ที่ '} color={'#dd1a24'} />
                            <View style={styles.containerText}>
                                <CommonText text={'ผู้รับผิดชอบ : '} color={'#dd1a24'} style={{fontWeight: 'bold'}} />
                                <CommonText text={'นาย กมบพัชร์ พิสุทธิกมล'} />
                            </View>
                            <View style={styles.containerText}>
                                <CommonText text={'เบอร์โทรศัพท์ : '} color={'#dd1a24'} style={{fontWeight: 'bold'}} />
                                <CommonText text={'0845157825'} />
                            </View>
                        </View>
                        <View style={styles.containerTouch}>
                            <TouchableOpacity style={styles.button} onPress={() => this.addSledging()}>
                                <CommonText text={'แจ้งการเลื่อนนัด'} style={styles.buttonText} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() =>{this.BtnClear()}}>
                                <CommonText text={'เคลียร์'} style={styles.buttonText} />
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

SledgingScreen.navigationOptions  = ({navigation}) => ({
    headerTitle: <HeaderTitle text={'การขอเลื่อนนัด'} color={'#fff'} />,
    headerLeft: null
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F4F4F4',
        flex: 1,
        alignItems: 'center',
        marginTop: '3%'
    },
    containerCalendar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10
    },
    textDate: {
        fontWeight: '500',
        textAlign: 'center',
        color: '#000',
        marginRight: 5
    },
    textAreaContainer: {
        width: '98%',
        padding: 5,

    },
    textArea: {
        height: 150,
        justifyContent: "flex-start",
        textAlignVertical: 'top'
    },
    containerCenter: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        height: 40,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#f5b57f',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5b57f'
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#fff',
        marginHorizontal: 20,
    },
    containerTouch: {
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
        marginTop: 0
    },
    containerText: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5,
        marginBottom: 0
    }

});

function mapStateToProps(state) {
    return{
        Users: state.dataUser,
        sledging : state.dataHome
    };
}

export default connect(
    mapStateToProps,
    (dispatch) => ({
        NavigationActions: bindActionCreators(NavigationActions, dispatch),
        REDUCER_SetLoadinglist: bindActionCreators(SETLOAD, dispatch),
        FETCH_InsertSledging: bindActionCreators(APISledging.InsertSledging, dispatch)
    })
)(SledgingScreen);
