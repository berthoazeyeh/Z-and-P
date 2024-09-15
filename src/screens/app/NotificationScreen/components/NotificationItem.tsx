import { Text, View } from "react-native"
import dynamicStyles from "../style";
import { useTheme } from "store";

const NotificationItem = ({ item }: any): React.JSX.Element => {
    const theme = useTheme()
    const styles = dynamicStyles(theme)
    return <View style={styles.itemContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.date}>{item.date}</Text>
    </View>
}

export default NotificationItem;