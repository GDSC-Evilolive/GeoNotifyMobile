import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {auth} from '../firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View>
      <SafeAreaView>
        <View>
          <Text>Email </Text>
          <TextInput
            value={email}
            onChangeText={value => setEmail(value)}
            placeholder="Enter Email"
            autoCapitalize="none"
          />
          <Text>Password</Text>
          <TextInput
            value={password}
            onChangeText={value => setPassword(value)}
            placeholder="Enter Password"
            autoCapitalize="none"
            secureTextEntry
          />
          <TouchableOpacity onPress={handleSignIn}>
            <Text>Log In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default LoginScreen;
