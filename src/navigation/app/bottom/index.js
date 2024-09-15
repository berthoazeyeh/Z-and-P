import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Import de MaterialCommunityIcons
import { Badge } from 'react-native-paper';
import Collapsible from 'react-native-collapsible';
import Icon from "react-native-vector-icons/MaterialIcons";
import Theme from "theme"
import { useTheme } from 'store';
import { HomeScreen, NotificationScreen } from 'screens';

const Tab = createBottomTabNavigator();



const SettingsScreen = (props) => (
    <View style={styles.container}>
        <Collapsible collapsed={false} >
            <View >

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                        setiIsCollapsed(!isCollapsed)
                    }}>
                    <Icon size={30} color={"red"} name="layers" />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                        setiIsCollapsed(!isCollapsed)
                    }}>
                    <Icon size={30} color={"red"} name="layers" />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                        setiIsCollapsed(!isCollapsed)
                    }}>
                    <Icon size={30} color={"red"} name="layers" />
                </TouchableOpacity>
            </View>
        </Collapsible>
        <Text>Settings Screen</Text>
    </View>
);


const HomeBottomTabNavigation = () => {
    const [badgeCount, setBadgeCount] = useState(40); // Initial badge count

    const theme = useTheme()
    return (
        <Tab.Navigator
            initialRouteName="HomeScreen"
            tabBarPosition="bottom"
            screenOptions={{
                tabBarActiveTintColor: "green",
                tabBarInactiveTintColor: theme.primaryText,
                tabBarGap: 10,
                tabBarIndicatorStyle: {
                    height: 0,
                },
                tabBarAndroidRipple: {
                    color: "#ffffff"
                },
                tabBarStyle: { backgroundColor: theme.primaryBackground, paddingBottom: 5, paddingTop: 5, },
            }}
        >
            <Tab.Screen name="HomeScreen" component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarIcon({ color, size }) {
                        iconName = 'view-dashboard-outline';
                        return <MaterialCommunityIcons style={iconStyle(color).icons} name={iconName} size={size} color={color} />;
                    },
                    tabBarLabel() {
                        return null;
                    },

                }}
            />
            <Tab.Screen name="NotificationScreen" component={NotificationScreen}
                options={{
                    headerShown: false,
                    tabBarIcon({ color, size }) {
                        iconName = 'bell-outline';
                        return <View>
                            <MaterialCommunityIcons style={iconStyle(color).icons} name={iconName} size={size} color={color} />
                            <Badge
                                style={{ color: "white", backgroundColor: "black", position: "absolute", top: -5, right: 0 }}
                                onPress={() => {

                                }}>
                                {40}
                            </Badge>
                        </View>
                    },
                    tabBarLabel() {
                        return null;
                    },
                }}
            />
        </Tab.Navigator >
    );
};
const iconStyle = (color) => StyleSheet.create({
    icons: {
        color: color,
        backgroundColor: color === "green" ? "#D0EDA4" : null,
        paddingHorizontal: 15,
        paddingVertical: 1,
        borderRadius: 17,
    }
})
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBarLabel: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
    },
});

export default HomeBottomTabNavigation;
