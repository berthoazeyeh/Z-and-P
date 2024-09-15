import { Linking, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { useCurrentUser, useTheme } from "store";
import dynamicStyles from "./style";
import { Image } from "react-native";
import { logo, validateEmailData, validateFormData } from "utils";
import { Button, IconButton, TextInput } from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useCallback, useState } from "react";
import useSWRMutation from "swr/mutation";
import { base_url, postData } from "apis/api";
import { CustomerLoader } from "components";
import { I18n } from "i18n"
import QRCode from "react-qr-code";
import { useFocusEffect } from "@react-navigation/native";
import UserScreen from "../UserScreen";
import moment from "moment";

function ViewTicketScreen(props: any): React.JSX.Element {
    const { navigation, route } = props;
    const { event } = route.params;
    const theme = useTheme()
    const currentUser = useCurrentUser();
    const styles = dynamicStyles(theme)
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [messages, setMessages] = useState<string | null>(null);
    const [url, setUrl] = useState<string | null>(null);
    const { trigger: searchInvitaion } = useSWRMutation(`${base_url}/api/registrations`, postData);
    const startDate = moment(event?.date_begin);
    const endDate = moment(event?.date_end);

    useFocusEffect(
        useCallback(() => {
            handleSubmitData();
            console.log(event);

            return () => {
                console.log(" ViewTicketScreen a perdu le focus");
            };
        }, [])
    );
    const handleSubmitData = async () => {
        const data = { email: currentUser?.email, event_id: event.id };
        setLoading(true)
        setMessages(null)
        const res = await searchInvitaion(data);

        if (res.success) {
            if (res?.data?.length <= 0) {
                setMessages("Aucune invitation ne correspond à l'adresse email " + currentUser?.email)
                setUrl(null)
                setUser(null)
            } else {
                setMessages(null)
                setUrl(res?.data?.[0]?.urlDownload)
                setUser(res?.data?.[0])
            }
        } else {
            setMessages(res?.message);
        }
        setLoading(false)
        // console.log(res);

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
    console.log(user);

    return <View style={styles.container}>
        <Image
            source={logo}
            style={styles.logos}
        />
        {
            currentUser &&
            <View style={styles.boxContainer}>
                <Text style={styles.titleHeader}>{"Voir mon invitation"}</Text>

                <Text style={styles.date}>{startDate.format("DD/MM/YYYY HH:mm")}</Text>
                <Text style={styles.title}>{event?.name}</Text>

                <Text style={styles.supTitle}>{event?.address}</Text>
                <Text style={styles.supSuptitle}>{event?.country}</Text>
                <View style={styles.rowElement}>
                </View>
                <View style={styles.rowElement}>
                    <Text style={styles.value}>{currentUser?.name}</Text>
                    <Text style={styles.value}>{user?.event_ticket_id?.name}</Text>
                </View>
                <View style={{ alignSelf: "center", alignItems: "center" }}>
                    {
                        user?.barcode &&
                        <QRCode
                            size={140}
                            style={{ height: "auto", maxWidth: "100%", width: "100%", }}
                            value={user?.barcode}
                        />
                    }
                </View>
            </View>
        }


        {messages && <Text style={styles.message}>
            {messages}
        </Text>}
        {url &&

            <Button
                style={{ marginHorizontal: 10, alignSelf: "center", backgroundColor: theme.primary, width: "85%", marginVertical: 20, padding: 0 }}
                onPress={openURL}
                elevation={3}
                mode="elevated"
                icon={"download"}
                labelStyle={styles.loginTexts}
            >
                <Text style={styles.loginTexts}>{'Télecharger le ticket'}</Text>
            </Button>
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

export default ViewTicketScreen;