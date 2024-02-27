import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
// import CreateReminder from '../screens/CreateReminder';
import {StyleSheet} from 'react-native';
import SettingsScreen from '../screens/SettingsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

const SettingsNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        component={SettingsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        // options={{headerShown: false}}
      />
      <Stack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
        // options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default SettingsNavigation;
