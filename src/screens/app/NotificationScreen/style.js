import { StyleSheet } from 'react-native';
import Theme from "theme"

const dynamicStyles = (theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            backgroundColor: theme.primaryBackground,
        },
        content: {
            flex: 1,
            justifyContent: 'center',
            backgroundColor: theme.primaryBackground,
        },
        itemContainer: {
            marginBottom: 10,
            padding: 10,
            margin: 10,
            // borderWidth: 1,
            backgroundColor: theme.gray3,
            borderRadius: 10

        },
        title: {
            fontSize: 18,
            fontWeight: 'bold',
        },
        name: {
            fontSize: 16,
            color: '#333',
        },
        date: {
            fontSize: 14,
            color: '#666',
        },
    });
};

export default dynamicStyles;
