import { useEffect } from "react";
import { FlatList, ScrollView, StyleSheet, Text, useColorScheme, View } from "react-native";
import { useTheme } from "store";
import { Header, NotificationItem } from "./components";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { I18n } from 'i18n';
import dynamicStyles from "./style";

function NotificationScreen(props: any): React.JSX.Element {
    const { navigation } = props;
    const isDarkMode = useColorScheme() === 'dark';
    const theme = useTheme()
    const styles = dynamicStyles(theme)

    const data = [
        { id: '1', name: 'John Doe', date: '2024-07-29', title: 'First Title' },
        { id: '2', name: 'Jane Smith', date: '2024-08-01', title: 'Second Title' },
        { id: '3', name: 'Alice Johnson', date: '2024-09-15', title: 'Third Title' },
        { id: '4', name: 'John Doe', date: '2024-07-29', title: 'First Title' },
        { id: '5', name: 'Jane Smith', date: '2024-08-01', title: 'Second Title' },
        { id: '6', name: 'Alice Johnson', date: '2024-09-15', title: 'Third Title' },
        { id: '7', name: 'John Doe', date: '2024-07-29', title: 'First Title' },
        { id: '8', name: 'Jane Smith', date: '2024-08-01', title: 'Second Title' },
        { id: '9', name: 'Alice Johnson', date: '2024-09-15', title: 'Third Title' },
        { id: '10', name: 'John Doe', date: '2024-07-29', title: 'First Title' },
        { id: '11', name: 'Jane Smith', date: '2024-08-01', title: 'Second Title' },
        { id: '12', name: 'Alice Johnson', date: '2024-09-15', title: 'Third Title' },
        // Ajoutez plus d'éléments si nécessaire
    ];
    useEffect(() => {
        // getlan()

    }, [navigation])





    return (
        <View style={styles.container}>

            <Header title={I18n.t("Notification.title")} theme={theme} />



            <View
                style={styles.content}>
                <FlatList

                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <NotificationItem item={item} />}
                />
            </View>
        </View>
    );
}

export default NotificationScreen