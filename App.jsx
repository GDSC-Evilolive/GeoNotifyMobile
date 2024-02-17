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
import TabBar from './componenets/TabBar';
import useAuth from './hooks/useAuth';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function App() {
  const {user} = useAuth();
  if (!user) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            // options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            // options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            // options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    // console.log(user.uid);

    return (
      <>
        <NavigationContainer>
          <Tab.Navigator tabBar={TabBar}>
            <Tab.Screen
              name="Home"
              component={HomeNavigation}
              options={{headerShown: false}}
            />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </>
    );
  }
}

export default App;
