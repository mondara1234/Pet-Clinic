import React from 'react';
import { StyleSheet, TouchableOpacity, View, BackHandler, Alert, Keyboard, Image, TextInput, Text } from 'react-native';
import { Container, Header, Content } from 'native-base';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavigationActions } from "react-navigation";
import Dialog, { DialogTitle, DialogButton } from 'react-native-popup-dialog';
import ImagePicker from "react-native-image-picker";
import HandleBack from "../../common/components/HandleBack";
import CommonText from '../../common/components/CommonText';
import SideMenu from '../../common/components/SideMenu';
import HeaderTitle from '../../common/components/HeaderTitle';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import { HOME_SCREEN } from "../../Index/router";
import { HISTORY_SCREEN } from "../../Treatment_History/router";
import { SETTING_SCREEN } from "../router";
import { LOGIN } from "../../login/router";
import { SETLOAD } from "../../Treatment_History/redux/actions";
import { getUSER_LOGOUT } from "../../login/redux/actions";
import moment from "moment/moment";

class settingScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            editing: true,
            ImageSource: null,
            data: null,
            DialogChange: false,
            DialogSuccess: false,
            TextInput_old_Password: '',
            TextInput_Password: '',
            TextInput_PasswordAgain: '',
            DialogChangeEmail: false,
            DialogSuccessEmail: false,
            TextInput_old_Email: '',
            TextInput_Email: '',
            TextInput_EmailAgain: '',
            nameAnimal: '',
            sexAnimal: '',
            birthAnimal: '',
            breedAnimal: '',
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
    }

    async getdataUser() {
        const {user} = this.props.Users;
        const nameAnimal = user.map((data) => {return data.nameAnimal});
        const picAnimal = user.map((data) => {return data.picAnimal});
        const sexAnimal = user.map((data) => {return data.sexAnimal});
        const birthAnimal = user.map((data) => {return data.birthAnimal});
        const breedAnimal = user.map((data) => {return data.breedAnimal});
        this.setState({
            nameAnimal: `${nameAnimal}`,
            ImageSource: `${picAnimal}`,
            sexAnimal: `${sexAnimal}`,
            birthAnimal: moment(`${birthAnimal}`).format("DD/MM/YYYY"),
            breedAnimal: `${breedAnimal}`
        })
    }

    selectPhotoTapped() {
        Keyboard.dismiss();
        const options = {
            title: 'เลือกรูปภาพ',
            cancelButtonTitle: 'ยกเลิก',
            takePhotoButtonTitle: 'ถ่ายรูป',
            chooseFromLibraryButtonTitle: 'เลือกรูปจากคลัง',
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            },
            mediaType: 'photo'
        };

        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: 'data:image/jpeg;base64,' + response.data };
                let dataImg = 'data:image/jpeg;base64,' + response.data;
                this.setState({
                    ImageSource: dataImg,
                    data: response.data
                });
            }
        });
    }

    render() {
        return (
            <HandleBack onBack={this.onBack}>
                <Container>
                    <Header style={styles.bgColorApp}>
                        <HeaderTitle text={'จัดการข้อมูลส่วนตัว'} style={{marginLeft: '10%'}} />
                        <View style={styles.viewRowCenter}>
                            <HeaderLeftMenu
                                icon={'save'}
                                style={{marginRight: 5}}
                                onPress={() => {
                                    Keyboard.dismiss();
                                    //this.save();
                                }}
                            />
                        </View>
                    </Header>
                    <Content style={{width: '100%', padding: '2%'}}>
                        <View style={styles.container}>
                            <View style={styles.containerimg}>
                                <Image
                                    style={styles.image}
                                    source={{uri: this.state.ImageSource}}
                                />
                            </View>
                            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                                <CommonText text={'เปลี่ยนรูปโปรไฟล์'} style={styles.fontBtnIMG} />
                            </TouchableOpacity>
                            <View style={styles.containerHistory}>
                                <CommonText text={'ประวัติ'} size={22} style={{fontWeight: 'bold'}} />
                                <View style={[styles.containerText,{marginTop: 30}]}>
                                    <CommonText text={'ชื่อ :'} style={{fontWeight: 'bold'}} />
                                    <TextInput style={styles.inputBox}
                                               underlineColorAndroid='rgba(0,0,0,0)'
                                               defaultValue={this.state.nameAnimal}
                                               placeholderTextColor = "#d6913a"
                                               keyboardType="text"
                                               onChangeText={TextInputValue => this.setState({nameAnimal: TextInputValue})}
                                    />
                                </View>
                                <View style={[styles.containerText,{marginTop: 0}]}>
                                    <CommonText text={'เพศ :'} style={{fontWeight: 'bold'}} />
                                    <TextInput style={styles.inputBox}
                                               underlineColorAndroid='rgba(0,0,0,0)'
                                               defaultValue={this.state.sexAnimal}
                                               placeholderTextColor = "#d6913a"
                                               keyboardType="text"
                                               onChangeText={TextInputValue => this.setState({sexAnimal: TextInputValue})}
                                    />
                                </View>
                                <View style={[styles.containerText,{marginTop: 0}]}>
                                    <CommonText text={'วันเกิด :'} style={{fontWeight: 'bold'}} />
                                    <TextInput style={styles.inputBox}
                                               underlineColorAndroid='rgba(0,0,0,0)'
                                               defaultValue={this.state.birthAnimal}
                                               placeholderTextColor = "#d6913a"
                                               keyboardType="text"
                                               onChangeText={TextInputValue => this.setState({birthAnimal: TextInputValue})}
                                    />
                                </View>
                                <View style={[styles.containerText,{marginTop: 0, marginBottom: 0}]}>
                                    <CommonText text={'สายพันธ์ :'} style={{fontWeight: 'bold'}} />
                                    <TextInput style={styles.inputBox}
                                               underlineColorAndroid='rgba(0,0,0,0)'
                                               defaultValue={this.state.breedAnimal}
                                               placeholderTextColor = "#d6913a"
                                               keyboardType="text"
                                               onChangeText={TextInputValue => this.setState({breedAnimal: TextInputValue})}
                                    />
                                </View>
                                <TouchableOpacity
                                    style={{marginTop: '10%', marginBottom: '5%'}}
                                    onPress={() => {Keyboard.dismiss(); this.setState({DialogChangeEmail: true})}}
                                >
                                    <CommonText text={'เปลี่ยน E-mail'} style={styles.fontBtnIMG} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {Keyboard.dismiss(); this.setState({DialogChange: true})}}
                                >
                                    <CommonText text={'เปลี่ยนรหัสผ่าน'} style={styles.fontBtnIMG} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{marginBottom: '5%', marginTop: '5%'}}
                                    onPress={() => {
                                        Keyboard.dismiss();
                                        this.props.REDUCER_SetLogOut();
                                        this.props.navigation.navigate(LOGIN);
                                    }}
                                >
                                    <CommonText text={'ลงชื่อออก'} style={styles.fontBtnIMG} />
                                </TouchableOpacity>
                            </View>
                            <Dialog  //Dialogเปลี่ยนรหัสผ่าน
                                visible={this.state.DialogChange}//เช้ดค่าจากตัวแปลเพื่อเปิดหรือปิด
                                onTouchOutside={() => {this.setState({ DialogChange: true })}}//ไม่ให้กดข้างนอกได้
                                dialogTitle={//ส่วนของTitle
                                    <DialogTitle
                                        title={'การเปลี่ยนรหัสผ่าน'}
                                        hasTitleBar={false}
                                        textStyle={styles.dialogTextTitle}
                                        style={styles.dialogTitleView}
                                    />
                                }
                                actions={[//ส่วนของฺbutton
                                    <DialogButton
                                        text={'ตกลง'}
                                        textStyle={styles.dialogTextButton}
                                        //onPress={() => {this.UpdateChangePassword()}}
                                        style={styles.dialogTitleView}
                                    />,
                                    <DialogButton
                                        text={'ยกเลิก'}
                                        textStyle={styles.dialogTextButton}
                                        onPress={() => {
                                            this.setState({ DialogChange: false });
                                        }}
                                        style={styles.dialogTitleView}
                                    />
                                ]}
                            >{/*ส่วนของbody*/}
                                <View style={styles.dialogBodyView}>
                                    <TextInput
                                        style={styles.inputBoxDialog}
                                        underlineColorAndroid='rgba(0,0,0,0)'
                                        placeholder={'รหัสผ่านเดิม'}
                                        secureTextEntry={true}
                                        placeholderTextColor = "#d6913a"
                                        onChangeText={ TextInputValue => this.setState({ TextInput_old_Password : TextInputValue })}
                                    />
                                    <TextInput
                                        style={styles.inputBoxDialog}
                                        underlineColorAndroid='rgba(0,0,0,0)'
                                        placeholder={'รหัสผ่านใหม่'}
                                        secureTextEntry={true}
                                        placeholderTextColor = "#d6913a"
                                        onChangeText={ TextInputValue => this.setState({ TextInput_Password : TextInputValue })}
                                    />
                                    <TextInput
                                        style={styles.inputBoxDialog}
                                        underlineColorAndroid='rgba(0,0,0,0)'
                                        placeholder={'ยืนยัน รหัสผ่านใหม่'}
                                        secureTextEntry={true}
                                        placeholderTextColor = "#d6913a"
                                        selectionColor="#fff"
                                        onChangeText={ TextInputValue => this.setState({ TextInput_PasswordAgain : TextInputValue })}
                                    />
                                </View>
                            </Dialog>
                            <Dialog //Dialogตอนกรอกข้อมูลเส้ดสิ้น
                                visible={this.state.DialogSuccess}//เช้ดค่าจากตัวแปลเพื่อเปิดหรือปิด
                                onTouchOutside={() => {this.setState({ DialogSuccess: true })}}//ไม่ให้กดข้างนอกได้
                                dialogTitle={//ส่วนของTitle
                                    <DialogTitle
                                        title={'เปลี่ยนรหัสผ่านสำเร็จ'}
                                        hasTitleBar={false}
                                        textStyle={styles.dialogTextTitle}
                                        style={styles.dialogTitleView}
                                    />
                                }
                                actions={[//ส่วนของฺbutton
                                    <DialogButton
                                        text={'ยกเลิก'}
                                        textStyle={styles.dialogTextButton}
                                        onPress={() => {
                                            this.setState({ DialogSuccess: false });
                                        }}
                                        style={styles.dialogTitleView}
                                    />
                                ]}
                            >{/*ส่วนของbody*/}
                                <View style={styles.dialogBodyView}>
                                    <CommonText style={styles.dialogTextBody} text={'เปลี่ยนรหัสผ่านเสร็จสิ้น'}/>
                                </View>
                            </Dialog>

                            <Dialog  //Dialogเปลี่ยนE-mail
                                visible={this.state.DialogChangeEmail}//เช้ดค่าจากตัวแปลเพื่อเปิดหรือปิด
                                onTouchOutside={() => {this.setState({ DialogChangeEmail: true })}}//ไม่ให้กดข้างนอกได้
                                dialogTitle={//ส่วนของTitle
                                    <DialogTitle
                                        title={'การเปลี่ยน E-mail'}
                                        hasTitleBar={false}
                                        textStyle={styles.dialogTextTitle}
                                        style={styles.dialogTitleView}
                                    />
                                }
                                actions={[//ส่วนของฺbutton
                                    <DialogButton
                                        text={'ตกลง'}
                                        textStyle={styles.dialogTextButton}
                                        //onPress={() => {this.UpdateChangePassword()}}
                                        style={styles.dialogTitleView}
                                    />,
                                    <DialogButton
                                        text={'ยกเลิก'}
                                        textStyle={styles.dialogTextButton}
                                        onPress={() => {
                                            this.setState({ DialogChangeEmail: false });
                                        }}
                                        style={styles.dialogTitleView}
                                    />
                                ]}
                            >{/*ส่วนของbody*/}
                                <View style={styles.dialogBodyView}>
                                    <TextInput
                                        style={styles.inputBoxDialog}
                                        underlineColorAndroid='rgba(0,0,0,0)'
                                        placeholder={'E-mail เดิม'}
                                        secureTextEntry={true}
                                        placeholderTextColor = "#d6913a"
                                        onChangeText={ TextInputValue => this.setState({ TextInput_old_Email : TextInputValue })}
                                    />
                                    <TextInput
                                        style={styles.inputBoxDialog}
                                        underlineColorAndroid='rgba(0,0,0,0)'
                                        placeholder={'E-mail ใหม่'}
                                        secureTextEntry={true}
                                        placeholderTextColor = "#d6913a"
                                        onChangeText={ TextInputValue => this.setState({ TextInput_Email : TextInputValue })}
                                    />
                                    <TextInput
                                        style={styles.inputBoxDialog}
                                        underlineColorAndroid='rgba(0,0,0,0)'
                                        placeholder={'ยืนยัน E-mail ใหม่'}
                                        secureTextEntry={true}
                                        placeholderTextColor = "#d6913a"
                                        selectionColor="#fff"
                                        onChangeText={ TextInputValue => this.setState({ TextInput_EmailAgain : TextInputValue })}
                                    />
                                </View>
                            </Dialog>
                            <Dialog //Dialogตอนกรอกข้อมูลเส้ดสิ้น
                                visible={this.state.DialogSuccessEmail}//เช้ดค่าจากตัวแปลเพื่อเปิดหรือปิด
                                onTouchOutside={() => {this.setState({ DialogSuccessEmail: true })}}//ไม่ให้กดข้างนอกได้
                                dialogTitle={//ส่วนของTitle
                                    <DialogTitle
                                        title={'เปลี่ยน E-mail สำเร็จ'}
                                        hasTitleBar={false}
                                        textStyle={styles.dialogTextTitle}
                                        style={styles.dialogTitleView}
                                    />
                                }
                                actions={[//ส่วนของฺbutton
                                    <DialogButton
                                        text={'ยกเลิก'}
                                        textStyle={styles.dialogTextButton}
                                        onPress={() => {
                                            this.setState({ DialogSuccessEmail: false });
                                        }}
                                        style={styles.dialogTitleView}
                                    />
                                ]}
                            >{/*ส่วนของbody*/}
                                <View style={styles.dialogBodyView}>
                                    <CommonText style={styles.dialogTextBody} text={'เปลี่ยน E-mail เสร็จสิ้น'}/>
                                </View>
                            </Dialog>
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

settingScreen.navigationOptions  = ({navigation}) => ({
    header: null
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F4F4F4',
        flex: 1,
        alignItems: 'center',
        marginTop: '10%'
    },
    bgColorApp: {
        backgroundColor: '#d6913a'
    },
    image: {
        width: 120,
        height: 120,
        marginBottom: 10
    },
    containerHistory: {
        flex: 1,
        width: '99%',
        marginTop: 10
    },
    containerText: {
        margin: 10
    },
    inputBox: {
        width: '98%',
        height: 30,
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderColor: '#000',
        fontSize: 18,
        color: '#d6913a',
        paddingLeft: 15,
        paddingBottom: -5
    },
    fontBtnIMG: {
        color: '#d6913a',
        fontSize: 20
    },
    dialogBodyView: {
        backgroundColor: '#F4F4F4',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    dialogTitleView: {
        backgroundColor: '#d6913a',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputBoxDialog: {
        width: 250,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 25,
        borderWidth: 1,
        fontSize: 18,
        color: '#d6913a',
        paddingLeft: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        paddingBottom: -3
    },
    dialogTextBody: {
        color: '#000',
        fontSize: 18
    },
    dialogTextButton: {
        color: '#fff',
        fontSize: 18
    },
    dialogTextTitle: {
        color: '#fff',
        fontSize: 20
    },
    containerimg: {
        borderWidth: 2,
        borderColor: '#d6913a',
        margin: '5%'
    }

});

function mapStateToProps(state) {
    return{
        Users: state.dataUser
    };
}

export default connect(
    mapStateToProps,
    (dispatch) => ({
        NavigationActions: bindActionCreators(NavigationActions, dispatch),
        REDUCER_SetLoadinglist: bindActionCreators(SETLOAD, dispatch),
        REDUCER_SetLogOut: bindActionCreators(getUSER_LOGOUT, dispatch),
    })
)(settingScreen);
