import { Alert } from "react-native";
import { SERVER_URL } from "../../../common/constants";

export const InsertSledging = (UserNames, dateFormat, Title, Img, Type, Detail) => dispatch => {
    return fetch(`${SERVER_URL}/MYSQL/Problem/InsertProblem.php`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: Title,
            type: Type,
            detail: Detail,
            img: Img,
            username: UserNames,
            date: dateFormat
        })
    }).then((response) => response.json())
        .then((responseJson) => {
                Alert.alert(
                    'แจ้งเตือน',
                    responseJson,
                    [
                        { text: 'ตกลง', onPress: () => {}, style: "cancel" }
                    ],
                    { cancelable: false },
                );
        }).catch((error) => {
            console.error(error);
        });

};