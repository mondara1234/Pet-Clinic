import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View, BackHandler, Alert, Keyboard, Image } from 'react-native';
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
import { HISTORY_SCREEN, DETAIL_HISTORY } from "../router";
import { SETTING_SCREEN } from "../../Setting/router";
import { SETLOAD, AllHistory } from "../redux/actions";
import { SERVER_URL } from "../../../common/constants";

class HistoryScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            films: [],
            setDataHistory: [],
            lengthHistory: 0,
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

    componentDidMount() {
        this.getListHistory();
    }

    async getListHistory() {
        const response = await fetch(`${SERVER_URL}/MYSQL/History/AllHistory.php`)
            .then(response => response.json())
            .then((responseJson) => responseJson)
            .catch((error) => {
                console.error(error);
            });
        this.props.REDUCER_GetHistory(response);
        const dataHistory = this.props.datahistory.dataList;
        this.setState({
            films: dataHistory,
            setDataHistory: dataHistory,
            lengthHistory: dataHistory.length
        })
    }

    //ไว้รับค่าแล้วค้นหา
    findFilm(value) {
        this.setState({query: value});
        let data = this.state.setDataHistory;
        if (value === '') {
            this.setState({
                films: data,
                lengthHistory: data.length
            })
        }else{
            this.SearchHistory(value)
        }
    }

    async SearchHistory(value) {
        let valueName = `${value}`;
        const response = await fetch(`${SERVER_URL}/MYSQL/History/SeachHistoryDate.php`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                historyDate : valueName
            })
        }).then(response => response.json())
            .then((responseJson) => responseJson)
            .catch((error) => {
                console.error(error);
            });
        this.props.REDUCER_GetHistory(response);
        const dataHistory = this.props.datahistory.dataList;
        let data = [];
        if( dataHistory === 'ไม่พบ' ){
            this.setState({
                films: data,
                lengthHistory: data.length
            })
        }else{
            this.setState({
                films: dataHistory,
                lengthHistory: dataHistory.length
            })
        }

    }

    BtnClear(){ // ปุ่ม x (ลบ)
        let data = this.state.setDataHistory;
        this.setState({
            films: data,
            query: '',
            lengthHistory: data.length
        })
    }

    _renderItem = ({ item, index }) => {
        return (
            <View style={styles.containerRenderItem}>
                <ListItem  thumbnail
                           style={styles.listItem}
                           onPress={() => this.props.navigation.navigate({routeName: DETAIL_HISTORY, params: {HistoryData: item}}) }
                >
                    <Body>
                    <View style={styles.bodyRendsrItem}>
                        <Text numberOfLines={1} style={styles.fontbase}>{item.title}</Text>
                        <View style={styles.containerText}>
                            <CommonText text={`วันที่ : ${item.date}`} size={20} style={styles.fontTime} />
                            <CommonText text={`เวลา : ${item.time}`} size={20} style={[styles.fontTime,{marginLeft: 10}]} />
                        </View>
                    </View>
                    </Body>
                </ListItem>
            </View>
        )
    };

    render() {
        const loading = this.props.datahistory.loading;
        return (
            <HandleBack onBack={this.onBack}>
                <Container>
                    <View style={styles.container}>
                        <View style={styles.containerViewSearch}>
                            <Icon name={'search'} size={25}/>
                            <Autocomplete
                                style={styles.containerSearch}/*กำหนดรูปแบบช่องค้นหา*/
                                containerStyle={styles.autocompleteContainer}/*กำหนดรูปแบบแถบแสดงค้นหา*/
                                defaultValue={this.state.query} /*กำหนดค่าเริ่มต้นให้กับ แวรู้*/
                                onChangeText={(value) => this.findFilm(value)} /*ส่งค่าที่กรอกเข้าไป*/
                                placeholder={'กรุณากรอกวันที่ เช่น 04/08/2562'} /*ลายน้ำเพื่อพิมจะหายไป*/
                            />
                            {this.state.query ?
                                <TouchableOpacity onPress={() => this.BtnClear()} >
                                    <Icon name={'close'} size={25} />
                                </TouchableOpacity>
                                : null
                            }
                        </View>
                        {loading === true ?
                            <View style={[styles.containerloading, styles.horizontal]}>
                                <ActivityIndicator size="large" color="#0000ff" />
                            </View>
                            :this.state.lengthHistory === 0 ?
                                <View style={{flex: 1}}>
                                    <CommonText text={'ไม่พบข้อมูล'} style={{fontSize: 30, marginTop: '40%'}} />

                                </View>
                                :
                                <View style={styles.containerFlasList}>
                                    <View style={styles.viewNumberFound}>
                                        <CommonText text={'จำนวนที่พบ'} style={styles.fonttitleHistory} />
                                        <CommonText text={this.state.lengthHistory} style={styles.fontHistory} />
                                        <CommonText text={'รายการ'} style={styles.fonttitleHistory} />
                                    </View>
                                    <View style={styles.containerFlasList}>
                                        <FlatList
                                            data={this.state.films}
                                            extraData={this.state}
                                            renderItem={this._renderItem}
                                            keyExtractor={(item, index) => index}
                                        />
                                    </View>
                                </View>
                        }
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

HistoryScreen.navigationOptions  = ({navigation}) => ({
    headerTitle: <HeaderTitle text={'ประวัติการรักษา'} color={'#fff'} />,
    headerLeft: null
});

const styles = StyleSheet.create({
    containerloading: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
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
    containerRenderItem: {
        width: '100%',
        height: 70,
        backgroundColor: "#F4F4F4",
        borderWidth: 1 ,
        borderColor: '#d6913a'
    },
    listItem: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -7
    },
    bodyRendsrItem: {
        width: '100%',
        backgroundColor: 'transparent'
    },
    containerText: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
    fontbase: {
        fontSize: 18,
        color: '#020202',
        marginBottom: 5,
        fontWeight: 'bold'
    },
    fontTime: {
        fontSize: 14,
        color: '#d6913a'
    },
    bgColorApp: {
        backgroundColor: '#d6913a'
    },
    viewRowCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerViewSearch: {
        height: 50,
        width: '90%',
        backgroundColor: "#F4F4F4",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 5
    },
    viewNumberFound: {
        width: '100%',
        height: 40,
        backgroundColor: "#d6913a",
        flexDirection: 'row',
        alignItems: 'center'
    },
    fonttitleHistory: {
        fontSize: 14,
        color: '#fff',
        marginLeft: 10
    },
    fontHistory: {
        fontSize: 16,
        color: '#fff',
        marginLeft: 5,
        fontWeight: 'bold'
    },
    containerFlasList: {
        flex: 1,
        width: '100%'
    }

});

function mapStateToProps(state) {
    return{
        datahistory: state.dataHistory
    };
}

export default connect(
    mapStateToProps,
    (dispatch) => ({
        NavigationActions: bindActionCreators(NavigationActions, dispatch),
        REDUCER_GetHistory: bindActionCreators(AllHistory, dispatch),
        REDUCER_SetLoadinglist: bindActionCreators(SETLOAD, dispatch)
    })
)(HistoryScreen);
