import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Theme } from 'utils';

const Header = ({ title, theme }) => {

    return (
        <View style={styles(theme).header}>
            <Text style={styles(theme).headerText}>{title}</Text>
        </View>
    );
};

const styles = (theme) => StyleSheet.create({
    header: {
        backgroundColor: theme.primaryBackground,
        flexDirection: 'row',
        alignItems: 'center', justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 0,
        elevation: 10,
        zIndex: 1,
        height: 45,
        width: "100%",
    },

    headerText: {
        textAlign: "center",
        fontSize: 18,
        width: "100%",
        ...Theme.fontStyle.montserrat.semiBold,

    },


});

export default Header;
