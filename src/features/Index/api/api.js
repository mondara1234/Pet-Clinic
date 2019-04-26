import { Alert } from "react-native";
import { SERVER_URL } from "../../../common/constants";

export const InsertSledging = (user, title, dateBD, time, detail, status, Responsible, old_date) => dispatch => {
    return fetch(`${SERVER_URL}/MYSQL/sledging/Insert_Postponement.php`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: user,
            title: title,
            date: dateBD,
            time: time,
            detail: detail,
            Responsible: Responsible,
            old_date: old_date,
            status: status
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