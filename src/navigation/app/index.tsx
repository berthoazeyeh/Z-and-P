import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import HomeBottomTabNavigation from './bottom';
import { EventDetailsScreen, HomeScreen, NotificationScreen, ScanQRCodeScreen, UserScreen, ViewInvitationScreen, ViewTicketScreen } from 'screens';



export type AuthStackList = {
    HomeScreen: undefined;
    EventDetailsScreen: undefined;
    ScanQRCodeScreen: undefined;
    UserScreen: undefined;
    ViewInvitationScreen: undefined;
    ViewTicketScreen: undefined;
    PrivacySettings: undefined;
    AlertView: undefined;
    ReportsView: undefined;
    ReportsInfo: undefined;
    AllTrips: undefined;
    RoutesMap: undefined;
    AoiMaps: undefined;
    LiveScreen: { uniqueId: string, name: string, status: string, vehicleType: string }; // Ajoutez les paramètres ici
};
const AuthStack = createStackNavigator<AuthStackList>()

const AppStacks = () => {
    return (
        <AuthStack.Navigator
            screenOptions={{
                headerBackTitleVisible: false,
            }}
            initialRouteName="HomeScreen">

            <AuthStack.Screen
                options={{ headerShown: false }}
                name="HomeScreen"
                component={HomeScreen}
            />
            <AuthStack.Screen
                options={{ headerShown: false }}
                name="EventDetailsScreen"
                component={EventDetailsScreen}
            />
            <AuthStack.Screen
                options={{ headerShown: false }}
                name="ScanQRCodeScreen"
                component={ScanQRCodeScreen}
            />
            <AuthStack.Screen
                options={{ headerShown: false }}
                name="UserScreen"
                component={UserScreen}
            />
            <AuthStack.Screen
                options={{ headerShown: false }}
                name="ViewInvitationScreen"
                component={ViewInvitationScreen}
            />
            <AuthStack.Screen
                options={{ headerShown: false }}
                name="ViewTicketScreen"
                component={ViewTicketScreen}
            />



        </AuthStack.Navigator>
    )
}



export default AppStacks
