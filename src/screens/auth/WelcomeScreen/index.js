import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Image } from "react-native"
import { useCurrentUser, useTheme } from "store";
import { logo, showCustomMessage } from "utils"
import { createTable, createUserWithPartner, db, dropTable, getdata, loginUserWithPartner } from "apis/database";



const Welcome = (props) => {
    const user = useCurrentUser();

    console.log(user);
    const theme = useTheme()
    const { navigation } = props
    useEffect(() => {
        tryToLoginParents();
    }, [navigation]);

    const tryToLoginParents = async () => {
        await createAllTable(db)
        // await dropTable(db)
        try {
            const user_Parent_Id = user?.id
            if (!user_Parent_Id) {
                navigation.navigate("LoginScreen");
                return;
            }
            showCustomMessage("Success", `Authentification reuissi bienvenue Mr/Mme ${user?.name}`, "success", "center")
            navigation.reset({
                index: 0,
                routes: [{ name: 'AppStacks' }],
            })
        } catch (error) {
            console.log("hffffffffffffffff");

            navigation.navigate("LoginScreen");
        }
    }
    const createAllTable = async () => {
        createTable(db);
    }




    return (
        <View style={styles.container}>
            <View style={styles.boxContainerCenter}>
                <View style={{ backgroundColor: theme.primaryBackground, width: "80%", borderRadius: 20, paddingBottom: 10, paddingHorizontal: 10 }}>
                    <Image
                        source={logo}
                        style={styles.logos} />
                </View>
            </View>
            <View style={styles.boxContainer}>
                <ActivityIndicator size={45} color={theme.primary} style={styles.loader} />
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    boxContainer: {
        flex: 1,
        position: "absolute",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    boxContainerCenter: {
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
    },
    boxContainersCenter: {
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
    },
    logo: {
        resizeMode: "contain",
        position: "relative",
        width: "100%",
        height: "50%"
        // flex: 1,

    },
    logos: {
        resizeMode: "contain",
        position: "relative",
        height: 100,
        alignSelf: "center",
    },
    loader: {
        marginVertical: 20,
    },
    text: {
        color: '#0C0C0C',
        fontSize: 16,
    },
    subText: {
        color: '#3700FF',
        fontSize: 18,
    },
});
export default Welcome