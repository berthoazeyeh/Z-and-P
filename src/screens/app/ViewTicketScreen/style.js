import { StyleSheet } from 'react-native';
import Theme from "theme"

const dynamicStyles = (theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: theme.primaryBackground,
            gap: 10
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
        label: {
            fontSize: 16,
            marginBottom: 5,
        },
        input: {
            height: 50,
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 5,
            paddingLeft: 10,
        },
        titleHeader: {
            textAlign: "center",
            fontSize: 22,
            paddingBottom: 10,
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
        message: {
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            borderRadius: 30,
            marginVertical: 10,
            fontSize: 14,
            color: theme.primary,
            ...Theme.fontStyle.montserrat.bold,
            fontWeight: "bold",

        },
        element: {
            width: "40%",
            fontSize: 16,
            color: theme.primaryText,
            ...Theme.fontStyle.montserrat.bold,
            fontWeight: 'bold',

        },
        date: {
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
        rowElements: {
            justifyContent: "space-between",
            width: "100%",
        },
        value: {
            fontSize: 18,
            textAlign: "right",
            color: theme.primary,
            ...Theme.fontStyle.montserrat.bold,
            fontWeight: 'bold',
        },
        title: {
            fontSize: 20,
            color: theme.primaryText,
            ...Theme.fontStyle.montserrat.bold,
            fontWeight: 'bold',

        },
        supTitle: {
            paddingTop: 20,
            fontSize: 16,
            color: theme.primaryText,
            ...Theme.fontStyle.montserrat.bold,
            fontWeight: 'bold',

        },

        supSuptitle: {
            fontSize: 16,
            ...Theme.fontStyle.montserrat.bold,

        },
        values: {
            fontSize: 14,
            textAlign: "right",
            color: theme.primary,
            ...Theme.fontStyle.montserrat.bold,
            fontWeight: 'bold',

        },
        boxContainer: {
            backgroundColor: '#FFFFFF',
            borderRadius: 15,
            width: '100%',
            paddingHorizontal: 20,
            paddingVertical: 10,
            paddingTop: 15,
            gap: 5,
            borderColor: theme.primary,
            borderWidth: 1
        },

    });
};

export default dynamicStyles;
