import { View, Text, SafeAreaView, TextInput, TouchableOpacity, StyleSheet, Image, useColorScheme } from 'react-native';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

import { signUpScreenDark } from '../styleSheets/dark/signUpScreenDark';
import { signUpScreenLight } from '../styleSheets/light/signUpScreenLight';

const SignUpScreen = () => {
  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const styles = isDarkMode ? signUpScreenDark : signUpScreenLight;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [error, setError] = useState(null);

  const validateEmail = email => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = async () => {
    if (!firstName || !lastName || !email || !password) {
      setError('All fields are required');
      return;
    }
    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      await sendEmailVerification(user);
      
      // Additional user data
      const userData = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        uid: user.uid,
        verified: false, // User will be verified after email confirmation
      };
      
      // API call to store user data
      await axios.post('https://gdsc-geonotify.wl.r.appspot.com/createUser', userData);

      // Display message to check email for verification
      navigation.navigate('Verify');

    } catch (err) {
      console.log(err);
      // Handle error messages
      if (err.code === 'auth/email-already-in-use') {
        setError('Email is already in use.');
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <View>
      <SafeAreaView style={styles.background}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.inputHeader}>First Name</Text>
            <TextInput
              value={firstName}
              onChangeText={value => setFirstName(value)}
              placeholder="Enter Name"
              autoCapitalize="none"
              style={styles.textInput}
              placeholderTextColor={'#6A6A73'}
            />
            {/* Additional input fields */}
            <Text style={styles.inputHeader}>Last Name</Text>
            <TextInput
              value={lastName}
              onChangeText={value => setLastName(value)}
              placeholder="Enter Name"
              autoCapitalize="none"
              style={styles.textInput}
              placeholderTextColor={'#6A6A73'}
            />
            <Text style={styles.inputHeader}>Email</Text>
            <TextInput
              value={email}
              onChangeText={value => setEmail(value)}
              placeholder="Enter Email"
              autoCapitalize="none"
              style={styles.textInput}
              placeholderTextColor={'#6A6A73'}
            />
            <Text style={styles.inputHeader}>Password</Text>
            <TextInput
              value={password}
              onChangeText={value => setPassword(value)}
              placeholder="Enter Password"
              secureTextEntry
              autoCapitalize="none"
              style={styles.textInput}
              placeholderTextColor={'#6A6A73'}
            />
            {/* Display error message */}
            {error && <Text style={{color:"red"}}>{error}</Text>}
            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.signUpButton}>
              <Text style={styles.signUpText}>Next</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.loginContainer}>
            <Text style={styles.text}>Already have an account?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Text style={styles.loginText}>Login here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SignUpScreen;
