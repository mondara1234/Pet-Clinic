import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import { Thumbnail, Picker } from 'native-base';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import DatePicker from 'react-native-datepicker';
import ImagePicker from "react-native-image-picker";
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import CommonText from '../../../common/components/CommonText'
import moment from "moment/moment";
import { SERVER_URL } from "../../../../common/constants";
import { LOGIN } from "../../router";

class FormRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TextInput_Name: '',
            TextInput_Password: '',
            TextInput_Email: '',
            TextInput_PasswordAgain: '',
            TextInput_MyName: '',
            TextInput_Phone: '',
            TextInput_NameAnimal: '',
            TextInput_sexAnimal: 'กรุณาเลือกเพศของสัตว์เลี้ยง',
            TextInput_birthAnimal: '',
            TextInput_breedAnimal: '',
            date: 'กรุณาเลือกวันเกิดของสัตว์เลี้ยง',
            ImgDefault: 'https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1',
            ImageSource: null,
            data: null
        }
    }

    onValueChange(value) {
        this.setState({
            TextInput_sexAnimal: value
        });
    }

    InsertStudentRecordsToServer = () =>{
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;

       if(
           this.state.TextInput_Name === ''
           ||this.state.TextInput_Email === ''
           ||this.state.TextInput_Password === ''
           ||this.state.TextInput_PasswordAgain === ''
           ||this.state.TextInput_NameAnimal === ''
           ||this.state.TextInput_breedAnimal === ''
           ||this.state.TextInput_MyName === ''
           ||this.state.TextInput_Phone === ''
       ){
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
       }else if(this.state.TextInput_Phone.length != 10){
           Alert.alert(
               'แจ้งเตือน',
               'กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก',
               [
                   {
                       text: 'ยกเลิก', onPress: () => {
                       }, style: "cancel"
                   }
               ],
               {cancelable: false},
           );
       }else if(this.state.TextInput_sexAnimal === 'กรุณาเลือกเพศของสัตว์เลี้ยง'){
           Alert.alert(
               'แจ้งเตือน',
               'กรุณาเลือกเพศของสัตว์เลี้ยง',
               [
                   {
                       text: 'ยกเลิก', onPress: () => {
                       }, style: "cancel"
                   }
               ],
               {cancelable: false},
           );
       }else if(this.state.TextInput_birthAnimal === 'กรุณาเลือกวันเกิดของสัตว์เลี้ยง'){
           Alert.alert(
               'แจ้งเตือน',
               'กรุณาเลือกวันเกิดของสัตว์เลี้ยง',
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
                       text: 'ยกเลิก', onPress: () => {}, style: "cancel"
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
               const Myname = this.state.TextInput_MyName;
               const Phone = this.state.TextInput_Phone;
               const NameAnimal = this.state.TextInput_NameAnimal;
               const sexAnimal = this.state.TextInput_sexAnimal;
               const birthAnimal = this.state.TextInput_birthAnimal;
               const breedAnimal = this.state.TextInput_breedAnimal;
               const ImgProfile = this.state.ImageSource ? 'data:image/jpeg;base64,'+this.state.data : this.state.ImgDefault;
               const keyScreens = this.props.keyScreen;
               const res = fetch(`${SERVER_URL}/MYSQL/user/InsertData.php`, {
                   method: 'POST',
                   headers: {
                       'Accept': 'application/json',
                       'Content-Type': 'application/json',
                   },
                   body: JSON.stringify({
                       name: Name,
                       email: Email,
                       password: Password,
                       myname: Myname,
                       phone: Phone,
                       imgProfile: ImgProfile,
                       NameAnimal: NameAnimal,
                       sexAnimal: sexAnimal,
                       birthAnimal: birthAnimal,
                       breedAnimal: breedAnimal,
                       date: dateFormat
                   })
               }).then((response) => response.json())
                   .then((responseJson) => {
                       if(responseJson === 'Email'||responseJson === 'Name'){
                           Alert.alert(
                               'แจ้งเตือน',
                               `${responseJson} นี้มีคนใช้ไปแล้วครับ`,
                               [
                                   { text: 'ยกเลิก', onPress: () => {}, style: "cancel" }
                               ],
                               { cancelable: false },
                           );
                       }else{
                           Alert.alert(
                               'แจ้งเตือน',
                               'สมัครสมาชิกเสร็จสิ้น',
                               [
                                   { text: 'ตกลง', onPress: () => keyScreens({routeName: LOGIN})},
                                   { text: 'ยกเลิก', onPress: () => {}, style: "cancel" }
                               ],
                               { cancelable: false },
                           );
                       }
                   }).catch((error) => {
                       console.error(error);
                   });
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
                    <CommonText text={'ข้อมูลผู้ใช้'} size={20} style={{fontWeight:'bold'}} />
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
                    <TextInput style={styles.inputBox}
                               underlineColorAndroid='rgba(0,0,0,0)'
                               placeholder={'ชื่อ-นามสกุล'}
                               placeholderTextColor = "#d6913a"
                               onChangeText={ TextInputValue => this.setState({ TextInput_MyName : TextInputValue }) }
                    />
                    <TextInput style={styles.inputBox}
                               underlineColorAndroid='rgba(0,0,0,0)'
                               placeholder={'เบอร์โทรศัพท์'}
                               secureTextEntry={true}
                               placeholderTextColor = "#d6913a"
                               onChangeText={ TextInputValue => this.setState({ TextInput_Phone : TextInputValue }) }
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
                               onChangeText={ TextInputValue => this.setState({ TextInput_NameAnimal : TextInputValue }) }
                    />
                    <TextInput style={styles.inputBox}
                               underlineColorAndroid='rgba(0,0,0,0)'
                               placeholder={'สายพันธ์ุ'}
                               placeholderTextColor = "#d6913a"
                               onChangeText={ TextInputValue => this.setState({ TextInput_breedAnimal : TextInputValue }) }
                    />
                    <View style={styles.containerText}>
                        <Picker
                            mode="dropdown"
                            style={{ color:'#d6913a', marginBottom: -10 , textDecorationLine: 'underline'}}
                            selectedValue={this.state.TextInput_sexAnimal}
                            onValueChange={this.onValueChange.bind(this)}
                        >
                            <Picker.Item label={'กรุณาเลือกเพศของสัตว์เลี้ยง'} value="กรุณาเลือกเพศของสัตว์เลี้ยง" />
                            <Picker.Item label={'ตัวผู้'} value="ตัวผู้" />
                            <Picker.Item label={'ตัวเมีย'} value="ตัวเมีย" />
                        </Picker>
                    </View>
                    <View style={styles.containerdate}>
                        <CommonText text={this.state.date} style={styles.textDate}/>
                        <DatePicker
                            style={{width: 45, marginTop: -16}}
                            date={this.state.date}
                            hideText
                            mode="date"
                            format="YYYY-MM-DD"
                            maxDate={moment().format("YYYY-MM-DD")}
                            customStyles={{
                                dateIcon: {
                                    width: 25,
                                    height: 25,
                                    marginBottom: -15
                                }
                            }}
                            onDateChange={(fulldate) => {
                                this.setState({date: fulldate});
                            }}
                        />
                    </View>
                </ScrollView>
                <TouchableOpacity style={styles.button} onPress={this.InsertStudentRecordsToServer}>
                    <View style={styles.containerButton}>
                        <IconFontAwesome name="registered" size={30} style={styles.styleIconFontAwesome} />
                        <CommonText text={this.props.nameRegistration} style={styles.buttonText} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
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
        width: 200,
        borderRadius: 25,
        borderWidth: 1,
        marginTop: 10,
        paddingVertical: 5,
        borderColor: '#f5b57f',
        backgroundColor: '#f5b57f'
    },
    buttonText: {
        fontSize: 18,
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
    containerdate: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        height: 25
    },
    textDate: {
        color: '#d6913a',
        fontSize: 18,
        paddingLeft: 10,
        borderBottomWidth: 1,
        paddingRight: 20,
        width: '75%'
    },
    imageUser: {
        width: 100,
        height: 100,
        marginTop: 5,
        borderRadius: 80
    },
    touchImage: {
        marginTop: -30,
        marginLeft: 70
    },
    image: {
        width: 30,
        height: 30
    },
    containerText: {
        borderBottomWidth: 1,
        marginTop: -5,
        marginBottom: 12
    }
});

function mapStateToProps(state) {
    return{
        servers: state.dataUser
    };
}

export default connect(
    mapStateToProps,
    (dispatch) => ({
        navigationActions: bindActionCreators(NavigationActions, dispatch)
    })
)(FormRegistration);