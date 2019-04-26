import React from 'react';
import { StyleSheet, TouchableOpacity, View, BackHandler, Alert, Keyboard, Image } from 'react-native';
import { Container,Content, Card, CardItem, Body } from 'native-base';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavigationActions } from "react-navigation";
import moment from "moment";
import HandleBack from "../../common/components/HandleBack";
import CommonText from '../../common/components/CommonText';
import SideMenu from '../../common/components/SideMenu';
import HeaderTitle from '../../common/components/HeaderTitle';
import { HOME_SCREEN, SLEDGING_SCREEN } from "../router";
import { HISTORY_SCREEN } from "../../Treatment_History/router";
import { SETTING_SCREEN } from "../../Setting/router";
import { SETLOAD } from "../../Treatment_History/redux/actions";
import { ALLSLEDGING } from "../redux/actions";
import { SERVER_URL } from "../../../common/constants";

class homeScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            editing: true,
            nameAnimal: '',
            sexAnimal: '',
            birthAnimal: '',
            breedAnimal: '',
            ImageSource: '',
            title: '',
            date: '',
            time: '',
            Responsible: '',
            phoneVeterinary: ''
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

    componentDidMount() {
        this.getdataUser();
        this.getdataVeterinary();
    }

    async getdataUser() {
        const {user} = this.props.Users;
        const nameAnimal = user.map((data) => {return data.nameAnimal});
        const sexAnimal = user.map((data) => {return data.sexAnimal});
        const birthAnimal = user.map((data) => {return data.birthAnimal});
        const breedAnimal = user.map((data) => {return data.breedAnimal});
        const picAnimal = user.map((data) => {return data.picAnimal});
        const picAnimals = `${picAnimal}`;
        this.setState({
            nameAnimal: nameAnimal,
            sexAnimal: sexAnimal,
            ImageSource: picAnimals,
            birthAnimal: moment(`${birthAnimal}`).format("DD/MM/YYYY"),
            breedAnimal: breedAnimal
        });
    }

    async getdataVeterinary() {
        const {user} = this.props.Users;
        const users = user.map((data) => {return data.user});
        let userName = `${users}`;
        const response = await fetch(`${SERVER_URL}/MYSQL/sledging/Select_Sledging.php`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username : userName
            })
        }).then(response => response.json())
            .then((responseJson) => responseJson)
            .catch((error) => {
                console.error(error);
            });

        this.props.REDUCER_Searchledging(response);

        const { dataSladging } = this.props.sledging;
        const title = dataSladging.map((data) => {return data.title});
        const date = dataSladging.map((data) => {return data.date});
        const times = dataSladging.map((data) => {return data.time});
        const Responsible = dataSladging.map((data) => {return data.Responsible});
        const phoneVeterinary = dataSladging.map((data) => {return data.phoneVeterinary});
        this.setState({
            title: title,
            date: moment(`${date}`).format("DD/MM/YYYY"),
            time: times,
            Responsible: Responsible,
            phoneVeterinary: phoneVeterinary
        })
    }
    render() {
        return (
            <HandleBack onBack={this.onBack}>
                <Container>
                    <Content style={{width: '100%'}}>
                        <View style={styles.container}>
                            <Image
                                style={{width: 120, height: 120}}
                                source={{uri: this.state.ImageSource}}
                            />
                            <View style={{ marginBottom: 15 }}>
                                <View style={[styles.containerText,{marginTop: 30}]}>
                                    <CommonText text={'ชื่อ :'} style={{fontWeight: 'bold', marginLeft: '19.5%'}} />
                                    <CommonText text={this.state.nameAnimal} style={{marginLeft: 10}} />
                                </View>
                                <View style={[styles.containerText,{marginTop: 5}]}>
                                    <CommonText text={'เพศ :'} style={{fontWeight: 'bold', marginLeft: '16.5%'}} />
                                    <CommonText text={this.state.sexAnimal} style={{marginLeft: 10}} />
                                </View>
                                <View style={[styles.containerText,{marginTop: 5}]}>
                                    <CommonText text={'วันเกิด :'} style={{fontWeight: 'bold', marginLeft: '7.5%'}} />
                                    <CommonText text={this.state.birthAnimal} style={{marginLeft: 10}} />
                                </View>
                                <View style={[styles.containerText,{marginTop: 5}]}>
                                    <CommonText text={'สายพันธ์ :'} style={{fontWeight: 'bold'}} />
                                    <CommonText text={this.state.breedAnimal} style={{marginLeft: 10}} />
                                </View>
                            </View>
                            <Card style={styles.cardSchedule}>
                                <CardItem>
                                    <Body style={styles.cardBody}>
                                    <CommonText text={'แจ้งกำหนดการนัดครั้งถัดไป'} size={22} style={{marginBottom: '5%', fontWeight: 'bold'}} />
                                    <View style={[styles.containerText,{width: 250}]}>
                                        <CommonText text={'หัวข้อการนัด : '} size={18} style={{fontWeight: 'bold'}} />
                                        <CommonText text={this.state.title} size={18} style={{marginLeft: 10, width: 200}} />
                                    </View>
                                    <View style={styles.containerText}>
                                        <CommonText text={'ผู้รับผิดชอบ : '} size={18} style={{fontWeight: 'bold'}} />
                                        <CommonText text={this.state.Responsible} size={18} style={{marginLeft: 10}} />
                                    </View>
                                    <View style={[styles.containerText,{marginTop: 20}]}>
                                        <CommonText text={'วันที่ : '} size={20} style={{fontWeight: 'bold', marginLeft: -21}} />
                                        <CommonText text={this.state.date} size={20} style={{marginLeft: 10}} />
                                    </View>
                                    <View style={styles.containerText}>
                                        <CommonText text={'เวลา : '} size={20} style={{fontWeight: 'bold', marginLeft: -60}} />
                                        <CommonText text={this.state.time} size={20} style={{marginLeft: 10}} />
                                    </View>
                                    </Body>
                                </CardItem>
                            </Card>
                            <View style={styles.containerSliding}>
                                <TouchableOpacity
                                    onPress={ () => this.props.navigation.navigate({routeName: SLEDGING_SCREEN})}
                                >
                                    <CommonText text={'ขอเลื่อนการนัด...'} size={18} style={{fontWeight: 'bold'}} />
                                </TouchableOpacity>
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
    containerText: {
        flexDirection: 'row',
        margin: 5,
        marginBottom: 0
    },
    cardSchedule: {
        borderWidth: 5,
        borderColor: '#d6913a',
        width: '96%'
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
        REDUCER_Searchledging: bindActionCreators(ALLSLEDGING, dispatch)
    })
)(homeScreen);
