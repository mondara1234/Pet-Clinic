import { Alert } from "react-native";
import { SERVER_URL } from "../../../common/constants";
import { LOGIN } from "../router";

export const fetchLogin = (UserNames, Password) => dispatch => {
    return fetch(`${SERVER_URL}/MYSQL/user/User_Login.php`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: UserNames,
            password: Password
        })
    }).then((response) => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => {
            console.error(error);
        });

};

export const fetchRegister = (Name, Email, Password, ImgProfile, NameAnimal, sexAnimal, birthAnimal, breedAnimal, keyScreens, dateFormat) => dispatch => {
    return fetch(`${SERVER_URL}/MYSQL/user/InsertData.php`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: Name,
            email: Email,
            password: Password,
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
            console.log(error);
        });

};

export const fetchSearchUser = (UserNames) => dispatch => {
    return fetch(`${SERVER_URL}/MYSQL/user/ShowOneDataList.php`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: UserNames
        })
    }).then(response => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => {
            console.error(error);
        });

};

export const fetchUpdateUserName = (UserID, Emails, oldEmails ) => dispatch => {
    return fetch(`${SERVER_URL}/MYSQL/user/UpdateUserName.php`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id : UserID,
            email : Emails,
            oldemail : oldEmails
        })
    }).then(response => response.json())
        .then((responseJson) => {
            if(responseJson === 'Email'){
                Alert.alert(
                    Trans.tran('general.alert'),
                    `${responseJson} ${Trans.tran('User.already_people')}`,
                    [
                        { text: Trans.tran('general.canceled'), onPress: () => {}, style: "cancel" }
                    ],
                    { cancelable: false },
                );
                return responseJson;
            }else{
                return responseJson;
            }
        })
        .catch((error) => {
            console.error(error);
        });
};

export const fetchUpdateUser = (UserID, Sex, Age, Weight, Height, BMRUser ) => dispatch => {
    return fetch(`${SERVER_URL}/MYSQL/user/UpdateBMIUser.php`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id : UserID,
            sex : Sex,
            age : Age,
            weight: Weight,
            height: Height,
            bmruser: BMRUser
        })
    }).then(response => response.json())
        .then((responseJson) =>
            console.log(responseJson)
        )
        .catch((error) => {
            console.error(error);
        });

};

export const fetchUpdateUpdateImgUser = (UserID, dataImg) => dispatch => {
    return fetch(`${SERVER_URL}/MYSQL/user/UpdateImgProfile.php`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: UserID,
            dataimg: dataImg
        })
    }).then(response => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => {
            console.error(error);
        });

};
