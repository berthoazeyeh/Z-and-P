import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Linking, Alert, View } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { getEventRegistrationByQRCode, updateEventRegistration } from 'apis/database';
import { Image } from 'react-native';
import { logo } from 'utils';
import { CustomerLoader } from 'components';
import { useTheme } from 'store';
import { I18n } from 'i18n';
import { base_url, putDataM } from 'apis/api';

function ScanQRCodeScreen(props: any): React.JSX.Element {
    const { navigation, route } = props;
    const { event } = route.params;

    const [loading, setLoading] = useState(false);
    const theme = useTheme();
    const handleQRCodeRead = (e: any) => {
        const url = e.data;
        handleGetUsers(url)
        setLoading(true)
        console.log(url);


    };
    const handleGetUsers = async (code: any) => {
        const users: any = await getEventRegistrationByQRCode(code.toString());
        if (users.success && users.data.length > 0) {
            if (event.id === users.data[0]?.event_id) {
                const up: any = await updateEventRegistration(users.data[0]?.id);
                // console.log(users.data[0]);
                navigation.navigate("UserScreen", { user: users.data[0] });
                putDataM(`${base_url}/api/event.registration/${users.data[0]?.id}`, { arg: { "state": "done" } }).then((res) => {
                    console.log("response update event", res);
                }).catch((er: any) => {
                    console.log("errrrr=====", er);
                });
            } else {
                Alert.alert('Erreur', 'Le code QR ne correspond pas à cet événement.', [{ text: 'Okay', onPress: () => console.log('Okay Pressed') }])
            }
        } else {
            Alert.alert('Erreur', 'Le code QR ne correspond à aucun utilisateur.', [{ text: 'Okay', onPress: () => console.log('Okay Pressed') }])
        }
        setLoading(false)
    };

    return (
        <View style={{ flex: 1 }}>

            <QRCodeScanner
                onRead={handleQRCodeRead}
                reactivate={true}
                reactivateTimeout={2000}
                flashMode={RNCamera.Constants.FlashMode.off}
                topContent={
                    <View style={styles.centerText}>
                        <Image
                            source={logo}
                            style={styles.logos}
                        />
                        <Text style={styles.textBold}>scannez le code QR.</Text>
                    </View>
                }
                bottomContent={
                    <TouchableOpacity style={styles.buttonTouchable} onPress={() => {
                        navigation.goBack();
                    }}>
                        <Text style={styles.buttonText}>Quitter</Text>
                    </TouchableOpacity>
                }
            />
            <CustomerLoader loading={loading} theme={theme} I18n={I18n} color={theme.primary} />
        </View>
    );
};

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: 'white'
    },
    logos: {
        resizeMode: "contain",
        position: "relative",
        height: 70,
        width: 70,
        alignSelf: "center",
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    }
});

export default ScanQRCodeScreen;
