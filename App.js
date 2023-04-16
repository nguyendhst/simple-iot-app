import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  useColorScheme,
  View,
  Dimensions,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { createContext, useState } from 'react';
import {
  NavigationContainer,
  useNavigation,
  DefaultTheme,
} from '@react-navigation/native';

import DashboardsScreen from './src/components/DashboardsScreen';
import LoginScreen from './src/components/LoginScreen';
import SettingsScreen from './src/components/SettingsScreen';

const Stack = createStackNavigator();
const AuthContext = createContext();
const AllFeedsDataContext = createContext();

export default function App() {
  const [user, setUser] = useState(null);
  const [feeds, setFeeds] = useState([]);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: '#ffff',
  };

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
          <SafeAreaView
            style={[backgroundStyle, { flex: 1 }]}
          >
            <StatusBar
              barStyle={
                                    isDarkMode
                                      ? 'light-content'
                                      : 'dark-content'
                                }
              backgroundColor={
                                    backgroundStyle.backgroundColor
                                }
            />
            <Stack.Navigator>
              {user ? (
                <Stack.Screen
                  name="Login"
                  component={LoginScreen}
                  options={{
                    headerShown: false,
                  }}
                />
              ) : (
                <>
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
                </>
              )}
            </Stack.Navigator>
          </SafeAreaView>
        </NavigationContainer>
      </AllFeedsDataContext.Provider>
    </AuthContext.Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
