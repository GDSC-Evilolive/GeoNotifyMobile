import 'react-native-gesture-handler';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  useColorScheme,
} from 'react-native';
import React, {useState} from 'react';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../firebase';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

import {signUpScreenDark} from '../styleSheets/dark/signUpScreenDark';
import {signUpScreenLight} from '../styleSheets/light/signUpScreenLight';
// library.add(faArrowLeft);
const SignUpScreen = () => {
  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const styles = isDarkMode ? signUpScreenDark : signUpScreenLight;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const handleSubmit = async () => {
    if (email && password) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        axios
          .post('http://localhost:3002/users/createNew', {
            first_name: firstName,
            last_name: lastName,
            email: email,
            uid: user.uid,
          })
          .then(res => {
            console.log(res);
          })
          .catch(error => {
            console.log(error);
          });
      } catch (err) {
        console.log(err);
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
