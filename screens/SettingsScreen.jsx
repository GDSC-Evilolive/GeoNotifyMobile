import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {auth} from '../firebase';

const SettingsScreen = () => {
  const handleSignOut = () => {
    auth.signOut().then(() => console.log('User signed out!'));
  };
  return (
    <View>
      <SafeAreaView>
        <Text>Settings</Text>
        <TouchableOpacity onPress={handleSignOut}>
          <Text>Sign Out</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
