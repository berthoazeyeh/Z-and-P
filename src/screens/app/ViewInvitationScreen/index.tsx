import { Linking, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { updateUserStored, useTheme } from "store";
import dynamicStyles from "./style";
import { Image } from "react-native";
import { logo, validateEmailData, validateFormData } from "utils";
import { Button, IconButton, TextInput } from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { base_url, postData } from "apis/api";
import { CustomerLoader } from "components";
import { I18n } from "i18n"

function ViewInvitationScreen(props: any): React.JSX.Element {
    const { navigation, route } = props;
    const { event } = route.params;
    const theme = useTheme()
    const styles = dynamicStyles(theme)
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [messages, setMessages] = useState<string | null>(null);
    const [url, setUrl] = useState<string | null>(null);
    const { trigger: searchInvitaion } = useSWRMutation(`${base_url}/api/registrations`, postData);
    const handleSubmitData = async () => {
        const data = { email, event_id: event.id };
        const { isValid, message } = validateEmailData(email);
        if (!isValid) {
            setLoading(false)
            setMessages(message)
            return;
        }
        setLoading(true)
        setMessages(null)
        const res = await searchInvitaion(data);
        setLoading(false)

        if (res.success) {
            if (res?.data?.length <= 0) {
                setMessages("Aucune invitation ne correspond à l'adresse email " + email)
                setUrl(null)
                setUser(null)
            } else {
                setMessages(null)
                setUrl(res?.data?.[0]?.urlDownload)
                setUser(res?.data?.[0])
                const tmp = res?.data?.[0];
                dispatch(updateUserStored(
                    {
                        barcode: tmp?.barcode,
                        date: tmp?.date,
                        email: tmp?.email,
                        name: tmp?.name,
                        phone: tmp?.phone,
                        state: tmp?.state,
                    }))

            }
            // setUrl(res?.urlDownload);
        } else {
            setMessages(res?.message);
        }
        console.log(res);

    }
    const openURL = () => {
        if (url) {
            Linking.canOpenURL(url)
                .then((supported) => {
                    Linking.openURL(url);

                })
                .catch((err) => console.error("Erreur lors de l'ouverture de l'URL", err));
        } else {
            setLoading(false);
        }
    };
    // console.log(event);

    return <View style={styles.container}>
        <Image
            source={logo}
            style={styles.logos}
        />
        <Text style={styles.titleHeader}>{"Rechercher mon invitation"}</Text>
        <TextInput
            style={styles.input}
            placeholder="Entrez votre e-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
        />
        <View style={{ width: "100%", alignItems: "flex-end" }}>
            <IconButton
                style={{
                    backgroundColor: theme.primaryText, padding: 0,
                }}
                onPress={() => { handleSubmitData() }}
                iconColor={theme.secondaryText}
                icon={"search-web"}
            />
        </View>
        {
            user &&
            <View style={styles.boxContainer}>
                <View style={styles.rowElement}>
                    <Text style={styles.element}>{"Nom et prénom"}</Text>
                    <Text style={styles.value}>{user?.name}</Text>
                </View>
                <View style={styles.rowElement}>
                    <Text style={styles.element}>{"Adresse E-mail"}</Text>
                    <Text style={styles.value}>{user?.email}</Text>
                </View>
                <View style={styles.rowElement}>
                    <Text style={styles.element}>{"Numéro de téléphone"}</Text>
                    <Text style={styles.value}>{user?.phone}</Text>
                </View>
            </View>
        }
        {/* <MaterialCommunityIcons name="check-decagram" size={30} color={"green"} />
        <Text style={styles.values}>Mise à jour réussie.</Text> */}
        {messages && <Text style={styles.message}>
            {messages}
        </Text>}
        {url &&
            <>

                <Button
                    style={{ marginHorizontal: 10, backgroundColor: theme.primaryText, width: "85%", marginVertical: 10, padding: 0 }}
                    onPress={() => {
                        navigation.navigate("ViewTicketScreen", { event })

                    }}
                    elevation={3}
                    mode="elevated"
                    icon={"download"}
                >
                    <Text style={styles.loginTexts}>{'Voir le ticket'}</Text>
                </Button>
                <Button
                    style={{ marginHorizontal: 10, alignSelf: "center", backgroundColor: theme.primary, width: "85%", marginVertical: 10, padding: 0 }}
                    onPress={openURL}
                    elevation={3}
                    mode="elevated"
                    icon={"download"}
                    labelStyle={styles.loginTexts}
                >
                    <Text style={styles.loginTexts}>{'Télecharger le ticket'}</Text>
                </Button>
            </>
        }



        <Button
            style={{
                position: "absolute", bottom: 0,
                alignSelf: "center",
                marginHorizontal: 10, backgroundColor: theme.primaryText, width: "85%", marginVertical: 20, padding: 0,
            }}
            onPress={() => { navigation.goBack(); }}
            elevation={3}
            mode="elevated"
            icon={"arrow-left-thin"}
            labelStyle={styles.loginTexts}
        >
            <Text style={styles.loginTexts}>{'Quitter'}</Text>
        </Button>
        <CustomerLoader loading={loading} theme={theme} I18n={I18n} color={theme.primary} />

    </View>
}
export default ViewInvitationScreen;