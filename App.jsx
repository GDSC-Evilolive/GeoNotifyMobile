/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {auth} from './firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import useAuth from './hooks/useAuth';

/* 
    TODO:
    Created small signup page to check 
    functionality of authentication

    Later will change to add routes
*/
function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {user} = useAuth();
  const handleSubmit = async () => {
    if (email && password) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        console.log(error);
      }
    }
  };
  if (!user) {
    return (
      <View>
        <SafeAreaView>
          <View>
            <Text>Email</Text>
            <TextInput
              placeholder="Enter Email"
              value={email}
              onChangeText={value => setEmail(value)}
              autoCapitalize="none"
            />
            <Text>Password</Text>
            <TextInput
              placeholder="Enter Password"
              value={password}
              onChangeText={value => setPassword(value)}
              secureTextEntry
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={handleSubmit}>
              <Text>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  } else {
    return (
      <View>
        <SafeAreaView>
          <Text>Hello {user.email}</Text>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default App;
