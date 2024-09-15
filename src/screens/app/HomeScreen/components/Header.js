import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Button, Checkbox, Divider, Menu, Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { logo, Theme } from 'utils';

const Header = ({ title, onLogoutPressed, theme }) => {

    return (
        <View style={styles(theme).header}>
            <View style={styles(theme).headerIconText}>
                <Image source={logo} style={{ width: 40, resizeMode: "contain", height: 40, borderRadius: 3, }} />
                <Text style={styles(theme).headerText}>{title}</Text>
            </View>
            <TouchableOpacity onPress={onLogoutPressed}>
                <MaterialCommunityIcons
                    name="power" size={33} color={"red"}
                    style={styles(theme).icon}
                />
            </TouchableOpacity>
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
    headerleft: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderRadius: 5,
        flexDirection: 'row',

    },
    headerIconText: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        gap: 10,
    },
    headerText: {
        fontSize: 18,
        ...Theme.fontStyle.montserrat.bold
    },
    icon: {
    },

});

export default Header;
