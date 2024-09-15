import { StyleSheet } from 'react-native';
import Theme from "theme"

const dynamicStyles = (theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: 'center',
            backgroundColor: theme.primaryBackground,
            gap: 20
        },
        content: {
            padding: 10,
            flex: 1,
            backgroundColor: theme.primaryBackground,
        },
        eventName: {
            color: theme.secondaryText,
            fontSize: 22,
            textAlign: "center",
            ...Theme.fontStyle.montserrat.bold,
            fontWeight: "bold",
        },
        logos: {
            resizeMode: "contain",
            position: "relative",
            height: 100,
            alignSelf: "center",
        },
        titleHeader: {
            fontSize: 25,
            ...Theme.fontStyle.montserrat.bold,
            color: theme.primary,
            fontWeight: "bold",

        },
        loginTexts: {
            fontSize: 20,
            color: theme.secondaryText,
            ...Theme.fontStyle.montserrat.bold,
            fontWeight: 'bold',

        },
        element: {
            width: "50%",
            fontSize: 16,
            color: theme.primaryText,
            ...Theme.fontStyle.montserrat.bold,
            fontWeight: 'bold',

        },
        rowElement: {
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
        },
        value: {
            flex: 1,
            fontSize: 18,
            textAlign: "right",
            color: theme.primary,
            ...Theme.fontStyle.montserrat.bold,
            fontWeight: 'bold',

        },
        values: {
            fontSize: 14,
            textAlign: "right",
            color: theme.primary,
            ...Theme.fontStyle.montserrat.bold,
            fontWeight: 'bold',

        },
        boxContainer: {
            // flex: 1,
            // position: "absolute",
            alignItems: "center",
            backgroundColor: '#FFFFFF',
            borderRadius: 15,
            width: '80%',
            paddingHorizontal: 20,
            paddingVertical: 30,
            paddingTop: 15,
            gap: 20,
            borderColor: theme.primary,
            borderWidth: 1
        },

    });
};

export default dynamicStyles;
