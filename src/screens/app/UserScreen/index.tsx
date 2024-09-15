import { Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { useTheme } from "store";
import dynamicStyles from "./style";
import { Image } from "react-native";
import { logo } from "utils";
import { Button } from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function UserScreen(props: any): React.JSX.Element {
    const { navigation, route } = props;
    const { user } = route.params;
    const theme = useTheme()
    const dispatch = useDispatch()
    const styles = dynamicStyles(theme)
    console.log(user);

    return <View style={styles.container}>
        <Image
            source={logo}
            style={styles.logos}
        />
        <Text style={styles.titleHeader}>{"Information du participant"}</Text>
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
        <MaterialCommunityIcons name="check-decagram" size={30} color={"green"} />
        <Text style={styles.values}>Mise à jour réussie.</Text>

        <Button
            style={{
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
    </View>
}
export default UserScreen;