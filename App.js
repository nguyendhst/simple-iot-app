import { StatusBar } from "expo-status-bar";
import Paho from "paho-mqtt";
import  Constants  from 'expo-constants';

const apiKey = Constants.manifest.extra.apiKey;
const apiUsr = Constants.manifest.extra.apiUsr;

console.log(apiKey);
console.log(apiUsr);

import {
    StyleSheet,
    Text,
    Image,
    SafeAreaView,
    ScrollView,
    useColorScheme,
    View,
    Dimensions,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import React, { createContext, useEffect, useState } from "react";
import {
    NavigationContainer,
    useNavigation,
    DefaultTheme,
} from "@react-navigation/native";

import DashboardsScreen from "./src/components/DashboardsScreen";
import LoginScreen from "./src/components/LoginScreen";
import SettingsScreen from "./src/components/SettingsScreen";

const Stack = createStackNavigator();
const AuthContext = createContext();
const AllFeedsDataContext = createContext();

const Tab = createBottomTabNavigator();

const PORT = "1883";
const HOST = "ws://io.adafruit.com/mqtt";

function App() {
    const [user, setUser] = useState(null);
    const [feeds, setFeeds] = useState([]);
    const [mtqqClient, setMqttClient] = useState(null);
    const isDarkMode = useColorScheme() === "dark";

    const backgroundStyle = {
        backgroundColor: "#BEBEBE",
    };

    useEffect(() => {
        const client = new Paho.Client(HOST, PORT);
        client.onConnectionLost = (responseObject) => {
            console.log("Connection lost:", responseObject.errorMessage);
        };

        client.onMessageArrived = (message) => {
            console.log("Message arrived:", message.payloadString);
        };

        client.connect({
            onSuccess: () => {
                console.log("Connected to the MQTT broker");
				client.subscribe(apiUsr + "/feeds/+");
            },
            onFailure: (error) => {
                console.log("Failed to connect:", error.errorMessage);
            },
			
			userName: apiUsr,
			password: apiKey,
        });

        setMqttClient(client);
    }, []);

    return (
        <AuthContext.Provider value={{ val: user, setVal: setUser }}>
            <AllFeedsDataContext.Provider
                value={{ val: feeds, setVal: setFeeds }}
            >
                <NavigationContainer
                    theme={{
                        ...DefaultTheme,
                        colors: {
                            ...DefaultTheme.colors,
                            background: backgroundStyle.backgroundColor,
                        },
                    }}
                >
                    <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
                        <StatusBar
                            barStyle={
                                isDarkMode ? "light-content" : "dark-content"
                            }
                            backgroundColor={backgroundStyle.backgroundColor}
                        />
                        {/*<Stack.Navigator>
                            {/*{!user ? (
                                <Stack.Screen
                                    name="Login"
                                    component={LoginScreen}
                                    options={{
                                        headerShown: false,
                                    }}
                                />
                            ) : (*/}
                        {/*<>
                                <Stack.Screen
                                    name="Dashboards"
                                    component={DashboardsScreen}
                                    options={{
                                        headerShown: false,
                                    }}
                                />
                                <Stack.Screen
                                    name="Settings"
                                    component={SettingsScreen}
                                    options={{
                                        headerShown: false,
                                    }}
                                />
                            </>*/}

                        {/*</Stack.Navigator>*/}
                        <Tab.Navigator>
                            <Tab.Screen
                                name="Home"
                                component={DashboardsScreen}
                                options={{
                                    headerShown: false,
                                }}
                            />
                            <Tab.Screen
                                name="Settings"
                                component={SettingsScreen}
                                options={{
                                    headerShown: false,
                                }}
                            />
                        </Tab.Navigator>
                    </SafeAreaView>
                </NavigationContainer>
            </AllFeedsDataContext.Provider>
        </AuthContext.Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#BEBEBE",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default App;
export { AuthContext };
