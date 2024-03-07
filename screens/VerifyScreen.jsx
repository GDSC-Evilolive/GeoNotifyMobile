import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import verifyScreenDark from '../styleSheets/dark/verifyScreenDark';
import verifyScreenLight from '../styleSheets/light/verifyScreenLight';

const VerifyScreen = () => {
const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const styles = isDarkMode ? verifyScreenDark : verifyScreenLight;
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Check Your Email</Text>
      <Text style={styles.text}>
        An email has been sent to your inbox. Please click the verification link to verify your account.
      </Text>
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginText}>Go Back To Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VerifyScreen;
