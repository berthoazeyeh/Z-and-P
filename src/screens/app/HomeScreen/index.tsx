import React, { useCallback, useEffect, useState, } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import { I18n } from 'i18n';
import { Header, EventItem } from './components';
import { clearUserStored, useCurrentSynchronisedState, useTheme } from 'store';
import dynamicStyles from './style';
import { ActivityIndicator, Banner } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useSWR from 'swr';
import { base_url, getData } from 'apis/api';
import { useDispatch } from 'react-redux';
import { createPartner, getdata, insertEvent } from 'apis/database';
import useSWRMutation from 'swr/mutation';
import { updateSynchronisationDateStored, updateSynchronisationStateStored } from 'store/actions/SynchronisationAction';
import { useFocusEffect } from '@react-navigation/native';


function HomeScreen(props: any): React.JSX.Element {
    const { navigation } = props;
    const theme = useTheme()
    const dispatch = useDispatch()
    const styles = dynamicStyles(theme)
    const isSynchronised = useCurrentSynchronisedState();
    const [refresh, setRefresh] = useState(false)
    const [events, setEvents] = useState<any[]>([])
    useEffect(() => {
        getLocalData();
        dispatch(updateSynchronisationStateStored(true))
        getOnlineData()
        setTimeout(() => {
            dispatch(updateSynchronisationStateStored(false))
            dispatch(updateSynchronisationDateStored((new Date()).toString()))
        }, 3000)
        console.log(isSynchronised);

    }, [navigation])

    useEffect(() => {
        getLocalData();
    }, [isSynchronised, navigation])

    useFocusEffect(
        useCallback(() => {
            getLocalData();
            return () => {
                console.log("L'écran a perdu le focus");
            };
        }, [isSynchronised, refresh])
    );



    // console.log(data?.data[0]);

    const { trigger: getOnLinePartner } = useSWRMutation(`${base_url}/api/res.partner/search`, getData);
    const { trigger: getAllEvents } = useSWRMutation(`${base_url}/api/event.event/search`, getData);

    const getOnlineData = async () => {
        const eventsRes = await getAllEvents();
        // const partners: any[] = partnerRes?.success ? partnerRes.data : []
        const events1: any[] = eventsRes?.success ? eventsRes.data : [];
        if (events.length <= 0) {
            setEvents(events1)
        }
        uploadAllFile(events1);
    }

    const uploadAllFile = async (datas: any[]) => {
        try {
            const promises = datas.map(element => insertEvent(element));
            const res = await Promise.all(promises);
            // console.log('Toutes les requêtes sont terminées. Dernière requête effectuée.', res);
        } catch (error) {
            console.error('Une erreur s\'est produite :',);
        }
    }

    // console.log(data && data?.data[0]);
    const getLocalData = async () => {
        const data: any = await getdata("events");
        if (data.success) {
            setEvents(data.data);
        }
        const res = await getOnLinePartner();
        const data1: any[] = res?.success ? res.data : []

        data1.forEach((e) => {
            const user = {
                id: (e.user_ids && e.user_ids?.length > 0) ? e.user_ids[0]?.id : null,
                email: e.email,
                partner_id: e.id,
                name: e.name,
                mobile: e.mobile ? e.mobile : "",
                phone: e.phone ? e.phone : "",
                address: "",
                password: "12345678",
                role: e.is_company ? "Company" : "user"
            };
            createPartner(user).then((result) => {
                // console.log(";;;;;;;;;;", result);
            }).catch((e) => {
                // console.log("errrrrrrrrrrrrrrrrrrrrrrrrr", e);
            })
        })
        setRefresh(false)
        // console.log(data);


    }




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



    const renderEmptyStudentElement = () => (
        <View style={styles.emptyData}>
            <Text style={styles.emptyDataText}>{I18n.t("Home.notstudentFound")}</Text>
        </View>
    );


    return (
        <View style={styles.container}>
            <Header title={I18n.t("Home.title")} onLogoutPressed={() => {
                dispatch(clearUserStored(null))
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'AuthStacks' }],
                })
            }} theme={theme} />
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={() => {
                            setRefresh(!refresh)
                        }}
                    />}
                ListHeaderComponent={renderHeader}
                data={events}
                renderItem={({ item }) => <EventItem item={item} I18n={I18n} navigation={navigation} />}
                keyExtractor={item => item.id}
                ListEmptyComponent={renderEmptyStudentElement}
            />
        </View>
    );
}


export default HomeScreen