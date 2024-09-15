import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { StatusBar } from "react-native";
import { ActivityIndicator, Image, Text } from "react-native"
import { changeLanguage, selectLanguageValue, updateUserStored, useCurrentUser, useTheme } from "store";
import { backgroundImages, logo, showCustomMessage, Theme } from "utils"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { I18n } from 'i18n';
import { useState } from "react";
import dynamicStyles from "./style";
import { Button } from "react-native-paper";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import useSWRMutation from 'swr/mutation';
import { base_url, DATABASE, getData, postData } from "apis/api";
import useSWR from "swr";
import { createUserWithPartner, loginUserWithPartner } from "apis/database";

const LoginScreen = (props) => {
    const { navigation } = props;
    const theme = useTheme()
    const styles = dynamicStyles(theme)
    const language = useSelector(selectLanguageValue);
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [securePasswordEntry, setSecurePasswordEntry] = useState(true)
    const {
        trigger: loginPartner,
    } = useSWRMutation(`${base_url}/api/login`, postData)
    const user = useCurrentUser();

    console.log(user);

    const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    const isValidPassword = (password) => {
        return passwordRegex.test(password);
    }
    const isValidUsername = (username) => {
        return usernameRegex.test(username);
    }
    const handleSubmit = () => {

        try {
            const dataLogin = {
                login: username,
                password: password,
                db: DATABASE
            }
            setLoading(true)
            loginUserWithPartner(username, password)
                .then(userWithPartner => {
                    dispatch(updateUserStored(userWithPartner))
                    setLoading(false)
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'AppStacks' }],
                    })
                    showCustomMessage("Success", "Authentification successful\n" + userWithPartner, "success", "center");
                    setLoading(false)
                })
                .catch(error => {
                    loginPartner(dataLogin).then(async (data) => {
                        console.log(data);

                        if (data?.success) {
                            const { email, id, name, partner_id, phone } = data?.data
                            showCustomMessage("Success", "Authentification successful\n" + data?.data?.name, "success", "center");
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'AppStacks' }],
                            })
                            dispatch(updateUserStored(data.data))
                            createUserWithPartner(id, name, email, password, phone, "Admin", "", "", partner_id).then((e) => {
                                console.log(e);
                                setLoading(false)
                            }).catch((err) => {
                                console.log(err);
                            });
                        } else {
                            showCustomMessage("Avertisement", data?.message);
                        }
                        setLoading(false)
                    });
                });
        } catch (error) {
            showCustomMessage("Avertisement", error);
            setLoading(false)

        }
    }

    return (
        <View style={styles.container}>
            {/* <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent={false} // Rend la barre de statut translucide sur Android
            /> */}
            {/* <Image
                source={backgroundImages} 
                style={styles.logo}
            /> */}

            <Image
                source={logo}
                style={styles.logos}
            />
            <View style={styles.boxContainer}>
                <View style={styles.languageContainer}>
                    <Text style={styles.textlangauge}>{I18n.t("changeLanguage")}</Text>
                    <Picker
                        selectedValue={language}
                        onValueChange={(itemValue, itemIndex) => {
                            dispatch(changeLanguage(itemValue));
                        }}
                        style={{ width: 130, gap: 0, color: theme.primaryText, fontSize: 1, padding: 0 }}

                        dropdownIconColor={theme.primary}
                        mode="dropdown"
                    >
                        <Picker.Item style={{ fontSize: 12, ...Theme.fontStyle.montserrat.bold }} label={I18n.t("Login.languageFrench")} value="fr" />
                        <Picker.Item style={{ fontSize: 12, ...Theme.fontStyle.montserrat.bold }} label={I18n.t("Login.languageEnglish")} value="en" />
                    </Picker >
                </View >
                <View style={styles.viewInputContent}>
                    <MaterialCommunityIcons name='email' size={27} color={isValidUsername(username) ? theme.primary : "gray"} />
                    <TextInput
                        style={styles.inputContainer}
                        placeholderTextColor={theme.placeholderTextColor}
                        onChange={() => { }}
                        placeholder={I18n.t("Login.username")}
                        onChangeText={(text) => { setUsername(text) }}
                        value={username}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        maxLength={550}
                    />
                    {isValidUsername(username) && <MaterialCommunityIcons
                        name={"check"}
                        size={24}
                        color={theme.primary}
                    />}
                </View>
                <View>
                    <View style={styles.viewInputContent}>
                        <MaterialCommunityIcons name='lock' size={27} color={isValidPassword(password) ? theme.primary : "gray"} />
                        <TextInput
                            style={styles.inputContainer}
                            placeholderTextColor={theme.placeholderTextColor}
                            onChange={() => ({})}
                            secureTextEntry={securePasswordEntry}
                            placeholder={I18n.t("Login.password")}
                            onChangeText={(text) => { setPassword(text) }}
                            value={password}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                            maxLength={16}
                        />
                        <TouchableOpacity onPress={() => setSecurePasswordEntry(!securePasswordEntry)}>
                            <MaterialCommunityIcons
                                name={securePasswordEntry ? 'eye-off' : 'eye'}
                                size={24}
                                color="gray"
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.textdanger1}>{message}</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        style={{ ...styles.loginButton, backgroundColor: loading ? theme.gray : theme.primary, flex: 1 }}
                        onPress={handleSubmit}
                        loading={loading}
                        disabled={loading}
                        elevation={3}
                        labelStyle={styles.buttonLabel}
                        mode="elevated"
                    >
                        <Text style={styles.loginText}>{I18n.t("Login.login")}</Text>
                    </Button>
                </View>
            </View>
            <Button
                style={{ position: "absolute", bottom: 5, marginHorizontal: 10, ...styles.loginButton, backgroundColor: theme.primaryText, width: "85%", marginVertical: 30 }}
                onPress={() => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'AppStacks' }],
                    })
                }}
                elevation={3}
                labelStyle={styles.buttonLabel}
                mode="elevated"
                icon={"home"}
            >
                <Text style={styles.loginText}>{'Continuer sans se connecter'}</Text>
            </Button>
        </View>
    )
}


export default LoginScreen




