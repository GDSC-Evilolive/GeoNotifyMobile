import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
// import CreateReminder from '../screens/CreateReminder';
import {StyleSheet} from 'react-native';
import CreateReminderScreen from '../screens/CreateReminderScreen';

const HomeNavBar = () => {
  return <View style={{width: 0, height: 0}} />;
};

const HomeNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateReminder"
        component={CreateReminderScreen}
        // options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
