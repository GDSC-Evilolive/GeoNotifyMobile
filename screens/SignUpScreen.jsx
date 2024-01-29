import 'react-native-gesture-handler';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../firebase';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

// library.add(faArrowLeft);
const SignUpScreen = () => {
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
            name: name,
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
      <SafeAreaView>
        <View>
          <Text>First Name</Text>
          <TextInput
            value={firstName}
            onChangeText={value => setFirstName(value)}
            placeholder="Enter Name"
            autoCapitalize="none"
          />
          <Text>Last Name</Text>
          <TextInput
            value={lastName}
            onChangeText={value => setLastName(value)}
            placeholder="Enter Name"
            autoCapitalize="none"
          />
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
            secureTextEntry
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={handleSubmit}>
            <Text>SignUp</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SignUpScreen;
