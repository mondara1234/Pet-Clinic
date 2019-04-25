import React from 'react';
import PropTypes from 'prop-types';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { StyleSheet } from 'react-native';
import { Footer, FooterTab, Button } from 'native-base';
import CommonText from '../../common/components/CommonText';

const SideMenu = (props) => {
    return<Footer>
        <FooterTab>
            <Button
                style={styles.button}
                onPress={ props.homeScreen }
            >
                <IconEntypo name="home" size={30} style={styles.icon}/>
                <CommonText text={'หน้าหลัก'} style={styles.Text} />
            </Button>
            <Button
                style={styles.button}
                onPress={ props.symptomScreen }
            >
                <IconFontAwesome name="history" size={30} style={styles.icon} />
                <CommonText text={'ประวัติการรักษา'} style={[styles.Text,{marginLeft: -3}]} />
            </Button>
            <Button
                style={styles.button}
                onPress={ props.herbScreen }
            >
                <IconMaterialCommunityIcons name="settings-outline" size={30} style={styles.icon} />
                <CommonText text={'ตั้งค่า'} style={styles.Text} />
            </Button>
        </FooterTab>
    </Footer>
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#d6913a',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        color: '#fff'
    },
    Text: {
        color: '#fff',
        fontSize: 12
    }
});

SideMenu.propTypes = {
    homeScreen: PropTypes.func.isRequired,
    herbScreen: PropTypes.func.isRequired,
    symptomScreen: PropTypes.func.isRequired
};

export default SideMenu;
