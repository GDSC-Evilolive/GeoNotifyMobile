import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import HomeNavigation from './navigation/HomeNavigation';
import SettingsScreen from './screens/SettingsScreen';
import CreateReminderScreen from './screens/CreateReminderScreen';

import useAuth from './hooks/useAuth';
import CustomTabBar from './components/CustomTabBar';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function App() {
  const {user} = useAuth();
  if (!user) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    // console.log(user.uid);

    return (
      <SafeAreaView style={{flex: 1, marginBottom: 20}}>
        <NavigationContainer>
          <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
            <Tab.Screen
              name="Home"
              component={HomeNavigation}
              options={{
                tabBarLabel: 'Home',
                headerShown: false,
                activeIcon: require('./assets/home-active.png'),
                inactiveIcon: require('./assets/home-inactive.png'),
              }}
            />
            <Tab.Screen
              name="Create Reminders"
              component={CreateReminderScreen}
              options={{
                tabBarLabel: 'Create Reminders',
                headerShown: false,
                activeIcon: require('./assets/create-icon.png'),
                inactiveIcon: require('./assets/create-icon.png'),
              }}
            />
            <Tab.Screen
              name="Settings"
              component={SettingsScreen}
              options={{
                tabBarLabel: 'Profile',
                headerShown: false,
                activeIcon: require('./assets/profile-active.png'),
                inactiveIcon: require('./assets/profile-inactive.png'),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    );
  }
}

export default App;
