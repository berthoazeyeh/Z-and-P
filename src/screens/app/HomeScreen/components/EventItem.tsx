import { Image, Text, TouchableOpacity, View } from "react-native"
import dynamicStyles from "../style";
import { useTheme } from "store";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';

const EventItem = ({ item, I18n, navigation }: any): React.JSX.Element => {
    const theme = useTheme()
    const styles = dynamicStyles(theme)
    const startDate = moment(item?.date_begin);
    const endDate = moment(item?.date_end);
    // console.log(item?.date_begin);
    // console.log(item?.date_end);


    return <View style={styles.itemContainer}>
        <TouchableOpacity style={{ flexDirection: "row", }}
            onPress={() => {
                navigation.navigate("EventDetailsScreen", { event: item })
                // EventDetailsScreen
            }}
        >
            <View style={{ backgroundColor: theme.primary, height: 160, width: "30%", justifyContent: "center", alignItems: "center" }}>
                <Text style={styles.title}>{startDate.format("DD")}</Text>
                <Text style={styles.subTitle}>{startDate.format("MMM YYYY")}</Text>
                <Text style={styles.subTitle}>{startDate.format("HH[h]mm")}</Text>
                <View style={{ flexDirection: "row", gap: 5, marginVertical: 10, alignItems: "center" }}>
                    <MaterialCommunityIcons name="arrow-right-thin" size={30} color={theme.secondaryText} />
                    <Text style={styles.subTitle}>{endDate.format("DD MMM")}</Text>
                </View>
            </View>
            <View style={{ height: 160, width: "70%", padding: 5, justifyContent: "space-between" }}>
                <Text style={styles.title1} numberOfLines={1} > {item.name}</Text>
                <Text style={styles.name}>{' '}
                    <MaterialCommunityIcons name="crosshairs-gps" size={25} color={theme.primaryText} />  {item?.address}
                </Text>
                <Text style={styles.name}>{' '}
                    <MaterialCommunityIcons name="account-group" size={25} color={theme.primaryText} />  {item?.attendees} {'Invitation(s)'}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 5 }}>
                    <Text style={styles.stage}>
                        {item?.stage}
                    </Text>
                    <MaterialCommunityIcons name="arrow-right-bold-circle" size={25} color={theme.primary} />
                </View>
            </View>
        </TouchableOpacity>

    </View >
}

export default EventItem;