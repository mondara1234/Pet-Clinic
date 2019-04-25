import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import { Thumbnail } from 'native-base';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import ImagePicker from "react-native-image-picker";
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import CommonText from '../../../common/components/CommonText'
import * as API from '../../api/api';
import moment from "moment/moment";

class FormRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TextInput_Name: '',
            TextInput_Password: '',
            TextInput_Email: '',
            TextInput_PasswordAgain: '',
            ImgDefault: 'https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1',
            ImageSource: null,
            data: null
        }
    }

    InsertStudentRecordsToServer = () =>{
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;

       if(this.state.TextInput_Name === ''||this.state.TextInput_Email === ''||this.state.TextInput_Password === ''|| this.state.TextInput_PasswordAgain === '' ){
           Alert.alert(
               'แจ้งเตือน',
               'กรุณากรอกให้ครบ',
               [
                   { text: 'ยกเลิก', onPress: () => {}, style: "cancel" },
               ],
               { cancelable: false },
           );
       }else if(this.state.TextInput_Name.length < 4 ){
           Alert.alert(
               'แจ้งเตือน',
               'ชื่อผู้ใช้ต้องมากกว่า 4 ตัวขึ้นไป',
               [
                   {
                       text: 'ยกเลิก', onPress: () => {
                       }, style: "cancel"
                   }
               ],
               {cancelable: false},
           );
       }else if(reg.test(this.state.TextInput_Email) !== true ){
           Alert.alert(
               'แจ้งเตือน',
               'กรุณากรอก E-mail ให้ถูกต้อง',
               [
                   {
                       text: 'ยกเลิก', onPress: () => {
                       }, style: "cancel"
                   }
               ],
               {cancelable: false},
           );
       }else if(this.state.TextInput_Password.length < 6 || this.state.TextInput_PasswordAgain.length < 6){
           Alert.alert(
               'แจ้งเตือน',
               'รหัสผ่านต้องมี 6 ตัวขึ้นไป',
               [
                   {
                       text: 'ยกเลิก', onPress: () => {
                       }, style: "cancel"
                   }
               ],
               {cancelable: false},
           );
       }else if(this.state.TextInput_Password === this.state.TextInput_PasswordAgain ){
               let date = new Date();
               let dateFormat = moment(date).format("YYYY-MM-DD");
               const Name = this.state.TextInput_Name;
               const Email = this.state.TextInput_Email;
               const Password = this.state.TextInput_Password;
               const ImgProfile = this.state.ImageSource ? 'data:image/jpeg;base64,'+this.state.data : this.state.ImgDefault;
               const keyScreens = this.props.keyScreen;
               this.props.Flights_Register(Name, Email, Password, ImgProfile, keyScreens, dateFormat);
           }else{
               Alert.alert(
                   'แจ้งเตือน',
                   'รหัสผ่านทั้งสองไม่ตรงกัน',
                   [
                       { text: 'ยกเลิก', onPress: () => {}, style: "cancel" },
                   ],
                   { cancelable: false },
               );
           }
    };

    selectPhotoTapped() {

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

                this.setState({
                    ImageSource: source,
                    data: response.data
                });
            }
        });
    }

    render(){
        return(
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={{width: '100%'}}
                    showsVerticalScrollIndicator={false}
                >
                    <CommonText text={'ข้อมูลผู้ใช้'} size={20} style={{fontWeight:'bold', marginTop: '2%'}} />
                    <TextInput style={styles.inputBox}
                               underlineColorAndroid='rgba(0,0,0,0)'
                               placeholder={'ชื่อผู้ใช้'}
                               placeholderTextColor = "#d6913a"
                               onChangeText={ TextInputValue => this.setState({ TextInput_Name : TextInputValue }) }
                    />
                    <TextInput style={styles.inputBox}
                               underlineColorAndroid='rgba(0,0,0,0)'
                               placeholder={'E-mail'}
                               placeholderTextColor = "#d6913a"
                               keyboardType="email-address"
                               onChangeText={ TextInputValue => this.setState({ TextInput_Email : TextInputValue }) }
                    />
                    <TextInput style={styles.inputBox}
                               underlineColorAndroid='rgba(0,0,0,0)'
                               placeholder={'รหัสผ่าน'}
                               secureTextEntry={true}
                               placeholderTextColor = "#d6913a"
                               onChangeText={ TextInputValue => this.setState({ TextInput_Password : TextInputValue }) }
                    />
                    <TextInput style={styles.inputBox}
                               underlineColorAndroid='rgba(0,0,0,0)'
                               placeholder={'ยืนยัน รหัสผ่าน'}
                               secureTextEntry={true}
                               placeholderTextColor = "#d6913a"
                               onChangeText={ TextInputValue => this.setState({ TextInput_PasswordAgain : TextInputValue }) }
                    />

                    <View style={{alignItems: 'center'}}>
                        <CommonText text={'ข้อมูลสัตว์เลี้ยง'} size={20} style={{fontWeight:'bold', marginTop: '2%'}} />
                        <Thumbnail  style={styles.imageUser}
                                    source={this.state.ImageSource != null ? this.state.ImageSource :
                                        {uri: this.state.ImgDefault}} />
                        <TouchableOpacity style={styles.touchImage} onPress={this.selectPhotoTapped.bind(this)}>
                            <Image  style={styles.image}
                                    source={{uri: 'https://sv1.picz.in.th/images/2019/02/27/TIRutV.png'}}
                            />
                        </TouchableOpacity>
                    </View>
                    <TextInput style={styles.inputBox}
                               underlineColorAndroid='rgba(0,0,0,0)'
                               placeholder={'ชื่อสัตว์เลี้ยง'}
                               placeholderTextColor = "#d6913a"
                               onChangeText={ TextInputValue => this.setState({ TextInput_Name : TextInputValue }) }
                    />
                    <TextInput style={styles.inputBox}
                               underlineColorAndroid='rgba(0,0,0,0)'
                               placeholder={'เพศ'}
                               placeholderTextColor = "#d6913a"
                               keyboardType="email-address"
                               onChangeText={ TextInputValue => this.setState({ TextInput_Email : TextInputValue }) }
                    />
                    <TextInput style={styles.inputBox}
                               underlineColorAndroid='rgba(0,0,0,0)'
                               placeholder={'วันเกิด'}
                               secureTextEntry={true}
                               placeholderTextColor = "#d6913a"
                               onChangeText={ TextInputValue => this.setState({ TextInput_Password : TextInputValue }) }
                    />
                    <TextInput style={styles.inputBox}
                               underlineColorAndroid='rgba(0,0,0,0)'
                               placeholder={'สายพันธ์'}
                               secureTextEntry={true}
                               placeholderTextColor = "#d6913a"
                               onChangeText={ TextInputValue => this.setState({ TextInput_PasswordAgain : TextInputValue }) }
                    />
                    <TouchableOpacity style={styles.button} onPress={this.InsertStudentRecordsToServer}>
                        <View style={styles.containerButton}>
                            <IconFontAwesome name="registered" size={30} style={styles.styleIconFontAwesome} />
                            <CommonText text={this.props.nameRegistration} style={styles.buttonText} />
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputBox: {
        width: 300,
        height: 40,
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderColor: '#000',
        fontSize: 18,
        color: '#d6913a',
        paddingLeft: 10,
        marginBottom: 5,
        justifyContent: 'center',
        paddingBottom: 5
    },
    button: {
        width: 250,
        borderRadius: 25,
        borderWidth: 1,
        marginTop: 20,
        paddingVertical: 10,
        backgroundColor: '#d6913a'
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },
    styleIconFontAwesome: {
        marginRight: 40,
        marginLeft: -20,
        color: '#fff'
    },
    containerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageUser: {
        width: 120,
        height: 120,
        marginTop: 10,
        borderRadius: 80
    },
    touchImage: {
        marginTop: -30,
        marginLeft: 90,
        marginBottom: 10
    },
    image: {
        width: 30,
        height: 30
    },
});

function mapStateToProps(state) {
    return{
        servers: state.dataUser
    };
}

export default connect(
    mapStateToProps,
    (dispatch) => ({
        navigationActions: bindActionCreators(NavigationActions, dispatch),
        Flights_Register: bindActionCreators(API.fetchRegister, dispatch),
    })
)(FormRegistration);