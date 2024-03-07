import React from 'react';
import { View, Text, TouchableOpacity, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ResetDark } from '../styleSheets/dark/ResetDark';
import { ResetLight } from '../styleSheets/light/ResetLight';

const ResetSuccessScreen = () => {
  const navigation = useNavigation();
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const styles = isDarkTheme ? ResetDark : ResetLight;

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container }>
      <Text style={styles.title}>Password reset email has been sent.</Text>
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResetSuccessScreen;
