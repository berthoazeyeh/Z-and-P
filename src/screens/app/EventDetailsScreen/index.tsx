import { useCallback, useEffect, useState } from "react";
import { Alert, Dimensions, FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import { clearUserStored, selectLanguageValue, updateUserStored, useCurrentSynchronisedState, useCurrentUser, useTheme } from "store";
import dynamicStyles from "./style";
import { I18n } from "i18n"
import { ActivityIndicator, Banner, Button, Dialog, FAB, Portal, TextInput } from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useSWR from "swr";
import { base_url, getData, postData } from "apis/api";
import useSWRMutation from "swr/mutation";
import { getdata, getEventRegistrationData, getEventTiketData, insertEventRegistration, insertTicket } from "apis/database";
import { updateSynchronisationDateStored, updateSynchronisationStateStored } from "store/actions/SynchronisationAction";
import { Headers } from "./components";
import moment from "moment";
import 'moment/locale/fr'; // Importer la localisation française
import RenderHtml from 'react-native-render-html';
import { Picker } from "@react-native-picker/picker";
import { Theme, validateFormData } from "utils";
import { Linking } from "react-native";
import { useFocusEffect } from "@react-navigation/native";




function EventDetailsScreen(props: any): React.JSX.Element {
    const { navigation, route } = props;
    const { event } = route.params;
    const language = useSelector(selectLanguageValue);
    const { width } = Dimensions.get('window');
    const theme = useTheme()
    const user = useCurrentUser();
    const dispatch = useDispatch()
    const styles = dynamicStyles(theme)
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refreshLocal, setRefreshLocal] = useState(false);
    const [url, setUrl] = useState<string | null>(null);
    const [sync, setSync] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const hideDialog = () => setVisible(false);
    const isSynchronised = useCurrentSynchronisedState();
    const [messages, setMessages] = useState<string | null>(null)
    const startDate = moment(event?.date_begin);
    const endDate = moment(event?.date_end);
    const [events, setEvents] = useState<any[]>([])
    const [tickets, setTickets] = useState<any[]>([])

    // console.log(data);

    const htmlContent = event?.description

    const { trigger: getAllEventsReg } = useSWRMutation(`${base_url}/api/event/registrations/${event.id}`, getData);
    const { trigger: getAllTickets } = useSWRMutation(`${base_url}/api/event.event.ticket/search`, getData);
    const { trigger: creatNewInvitation } = useSWRMutation(`${base_url}/api/crud/ticket/${event.id}`, postData);

    useEffect(() => {
        dispatch(updateSynchronisationStateStored(true))
        moment.locale(language);
        getOnlineData()
        setTimeout(() => {
        }, 3000)
        getLocalData()
        getLocalDataTikect()
    }, [navigation,])


    useFocusEffect(
        useCallback(() => {
            getOnlineData()
            return () => {
                // Code à exécuter quand l'écran perd le focus (facultatif)
                console.log("L'écran a perdu le focus");
            };
        }, [])
    );

    useEffect(() => {
        dispatch(updateSynchronisationStateStored(true))
        getOnlineData()
    }, [navigation])


    useEffect(() => {
        getLocalData()
        getLocalDataTikect()
    }, [refreshLocal, navigation])



    const openURL = () => {
        if (url) {
            Linking.canOpenURL(url)
                .then((supported) => {
                    Linking.openURL(url);

                })
                .catch((err) => console.error("Erreur lors de l'ouverture de l'URL", err));
        } else {
            setVisible(false);
        }
    };

    const getOnlineData = async () => {
        const eventsRes = await getAllEventsReg();
        const events: any[] = eventsRes?.success ? eventsRes.data : [];

        insertEventRegistration(events).then((data: any) => {
            console.log(data);
            setRefreshLocal(!refreshLocal);
        }).catch((error) => {
            console.log(error);
        })
        const tickterRes = await getAllTickets();
        const tickters: any[] = tickterRes?.success ? tickterRes.data : [];
        insertTicket(tickters).then((data: any) => {
            console.log(data);
            setRefreshLocal(!refreshLocal);
        }).catch((error) => {
            console.log(error);
        })
        dispatch(updateSynchronisationStateStored(false));
        dispatch(updateSynchronisationDateStored((new Date()).toString()));
    }

    const getLocalData = async () => {
        if (event.id) {
            const data: any = await getEventRegistrationData(event.id);
            if (data.success) {

                setEvents(data.data);
            }
        }
    }
    const getLocalDataTikect = async () => {
        if (event.id) {
            const data: any = await getEventTiketData(event.id);

            if (data.success) {
                setTickets(data.data);
            }
            else {
                console.log("getEventTiketData[[[[", data);
            }
        }
    }
    const handleSubmitData = async () => {
        const data = { name, email, phone, selectField: selectedOption };
        const dataPost = { name, email, phone, ticket_id: selectedOption };
        const { isValid, message } = validateFormData(data);
        if (!isValid) {
            setLoading(false)
            setMessages(message)
            return;
        }
        setLoading(true)
        setMessages(null)
        const res = await creatNewInvitation(dataPost);
        setLoading(false)

        if (res.success) {
            setUrl(res?.urlDownload);
            dispatch(updateUserStored(dataPost))

            // setVisible(tr);
            setSync(!sync);
        } else {
            setMessages(res?.message)
        }
        console.log(res);

    }


    // console.log("datta", data && data.success && data.data[0]);
    const renderHeader = () => (
        <Banner
            visible={isSynchronised}
        >
            <View style={{ flexDirection: 'row', alignItems: "center", gap: 10 }}>
                <MaterialCommunityIcons name='sync' size={25} color={theme.primary}
                />
                <Text>
                    Synchrinisation en cours.
                </Text>
                <ActivityIndicator color="green" size={10} />
            </View>
        </Banner>
    );


    const renderItem = ({ item }: any) => (
        <View style={styles.itemContainer}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={{ width: 10, height: 10, borderRadius: 10, backgroundColor: item.state === "done" ? "green" : theme.primary }}>
                </View>
            </View>
            <Text style={styles.email}  >{item.email}, {item.phone}</Text>
        </View>
    );

    return <View style={styles.container}>
        <Headers title={I18n.t("EventDetailsScreen.title")} onLogoutPressed={() => {
            dispatch(clearUserStored(null))
            navigation.reset({
                index: 0,
                routes: [{ name: 'AuthStacks' }],
            })
        }} theme={theme} navigation={navigation} />
        {renderHeader()}
        <ScrollView>
            <View style={styles.content}>
                <View style={styles.eventNameContent}>
                    <Text style={styles.eventName}>{event.name}</Text>
                </View>
                <View style={styles.eventDatecontainer}>
                    <View style={styles.eventDateContent}>
                        <Text style={styles.titleHeader}>{"Début"}</Text>
                        <Text style={styles.title}>{startDate.format("dddd DD.")}</Text>
                        <Text style={styles.subTitle}>{startDate.format("MMMM YYYY")}</Text>
                        <Text style={styles.subTitle}>{startDate.format("HH[h]mm")}</Text>
                    </View>
                    <View style={styles.eventDateContent}>
                        <Text style={styles.titleHeader}>{"Fin"}</Text>
                        <Text style={styles.title}>{endDate.format("dddd DD.")}</Text>
                        <Text style={styles.subTitle}>{endDate.format("MMMM YYYY")}</Text>
                        <Text style={styles.subTitle}>{endDate.format("HH[h]mm")}</Text>
                    </View>
                </View>
                <View style={styles.eventDescriptioncontainer}>
                    <Text style={styles.titleHeader}>{"Description"}</Text>
                    <RenderHtml
                        contentWidth={width}
                        source={{ html: htmlContent }}
                    />
                    {/* <WebView
                        originWhitelist={['*']}
                        scalesPageToFit={true}
                        source={{
                            html: htmlContent }}
                        style={styles.webview}
                    /> */}
                </View>
                <View style={styles.eventDatecontainer}>
                    <View style={styles.eventDateContent}>
                        <Text style={styles.titleHeader}>{"Pays"}</Text>
                        <Text style={styles.title}>{event?.country}</Text>
                    </View>
                    <View style={styles.eventDateContent}>
                        <Text style={styles.titleHeader}>{"Status"}</Text>
                        <Text style={styles.title}>{event?.stage}</Text>
                    </View>
                </View>
                {user && user?.id &&
                    <View style={styles.eventMenbercontainer}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10 }}>
                            <Text style={styles.titleHeader}>{"Membres"}</Text>
                            <TouchableOpacity
                                onPress={() => setVisible(true)}>
                                <Text style={styles.titleHeaders}>{"Ajouter un Membres"}
                                    {' '}<MaterialCommunityIcons name="plus-circle-outline" size={20} color={'green'} />
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={events}
                            renderItem={renderItem}
                            nestedScrollEnabled={false}
                            scrollEnabled={false}
                            keyExtractor={item => item.id.toString()}
                        />
                    </View>
                }

            </View>

        </ScrollView>
        {user && user?.id && !visible &&
            <FAB
                icon="qrcode-scan"
                style={styles.fab}
                color={theme.secondaryText}
                onPress={() => navigation.navigate("ScanQRCodeScreen", { event })}
            />}

        {!user?.id && !visible &&
            <FAB
                style={styles.fab}
                label="Voir mon Invitation"
                color={theme.secondaryText}
                onPress={() => {
                    if (user) {
                        navigation.navigate("ViewTicketScreen", { event })
                    } else {

                        navigation.navigate("ViewInvitationScreen", { event })
                    }

                }} />
        }
        {!user?.id && !visible &&
            <FAB
                style={styles.fab1}
                label="Rejoindre "
                color={theme.secondaryText}
                onPress={() => setVisible(true)} />}

        <Portal>
            <Dialog
                visible={visible}
                onDismiss={hideDialog}
                style={styles.dialog} >
                <Dialog.Content>
                    <TouchableOpacity
                        onPress={() => {
                            hideDialog();
                            setUrl(null);
                        }}
                        style={styles.closeButton} >
                        <MaterialCommunityIcons name="close-circle-outline" size={20} color={theme.secondaryText} />
                    </TouchableOpacity>
                    {messages && <Text style={styles.message}>
                        {messages}
                    </Text>
                    }
                    <View style={styles.dialogContent} >
                        {!url && <>
                            <Text style={styles.dialogTitle}>
                                Rejoindre cet Evenement.
                            </Text>
                            <View style={styles.containers}>
                                <Text style={styles.label}>Nom</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Entrez votre nom"
                                    value={name}
                                    onChangeText={setName}
                                />
                                <Text style={styles.label}>Email</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Entrez votre email"
                                    keyboardType="email-address"
                                    value={email}
                                    onChangeText={setEmail}
                                />
                                <Text style={styles.label}>Téléphone</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Entrez votre téléphone"
                                    keyboardType="phone-pad"
                                    value={phone}
                                    onChangeText={setPhone}
                                />

                                <Text style={styles.label}>Choisissez un ticket</Text>
                                <Picker
                                    selectedValue={selectedOption}
                                    onValueChange={(itemValue, itemIndex) => {
                                        setSelectedOption(itemValue);
                                    }}
                                    style={{ flex: 1, gap: 0, color: theme.primaryText, fontSize: 1, padding: 0, }}
                                    dropdownIconColor={theme.primary}
                                    mode="dropdown">
                                    <Picker.Item style={{ fontSize: 16, ...Theme.fontStyle.montserrat.semiBold }} label={'Choisir'} value={null} />
                                    {tickets.map((relation: any) => {
                                        return <Picker.Item key={relation.id} style={{ fontSize: 16, ...Theme.fontStyle.montserrat.semiBold }} label={relation.name} value={relation.id} />
                                    })}
                                </Picker >
                                <Button
                                    style={{ marginHorizontal: 10, backgroundColor: theme.primaryText, width: "85%", marginVertical: 20 }}
                                    onPress={handleSubmitData}
                                    elevation={3}
                                    loading={loading}
                                    mode="elevated"
                                >
                                    <Text style={styles.loginText}>{'Soumetre'}</Text>
                                </Button>
                            </View></>}
                        {url &&
                            <>
                                <Text style={styles.dialogTitle}>Ajout effectuer avec success</Text>
                                <Button
                                    style={{ marginHorizontal: 10, backgroundColor: theme.primaryText, width: "85%", marginVertical: 20, padding: 0 }}
                                    onPress={() => {
                                        setVisible(false)
                                        navigation.navigate("ViewTicketScreen", { event })

                                    }}
                                    elevation={3}
                                    mode="elevated"
                                    icon={"download"}
                                >
                                    <Text style={styles.loginTexts}>{'Voir le ticket'}</Text>
                                </Button>
                                <Button
                                    style={{ marginHorizontal: 10, backgroundColor: theme.primaryText, width: "85%", marginVertical: 20, padding: 0 }}
                                    onPress={openURL}
                                    elevation={3}
                                    mode="elevated"
                                    icon={"download"}
                                >
                                    <Text style={styles.loginTexts}>{'Télecharger le ticket'}</Text>
                                </Button>
                            </>
                        }
                    </View>
                </Dialog.Content>
            </Dialog>
        </Portal>
    </View >
}

export default EventDetailsScreen