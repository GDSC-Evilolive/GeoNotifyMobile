import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { ForgotPasswordDark } from '../styleSheets/dark/ForgotPasswordDark';
import { ForgotPasswordLight } from '../styleSheets/light/ForgotPasswordLight';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const styles = isDarkTheme
    ? ForgotPasswordDark
    : ForgotPasswordLight;

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      navigation.navigate('ResetSuccess');
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/missing-email') {
        setError('Missing an email. Input in your email');
        
      } 
      if (err.code === 'auth/invalid-email') {
        setError('Invalid email. Make sure you the email is valid.');
      }
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.textForm}>Email</Text>
        <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            style={styles.input}
        />
        {error && <Text style={styles.error}>{error}</Text>}
        <TouchableOpacity onPress={handleResetPassword} style={styles.button}>
            <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Back To Login</Text>
        </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordScreen;
