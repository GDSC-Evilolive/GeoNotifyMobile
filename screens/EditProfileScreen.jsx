import {View, Text, SafeAreaView, TextInput} from 'react-native';
import React, {useState} from 'react';
import EditProfileScreenLight from '../styleSheets/light/editProfileScreenLight';

const EditProfileScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const styles = isDarkMode ? EditProfileScreenLight : EditProfileScreenLight;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <View>
      <SafeAreaView>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>Edit Profile</Text>
          </View>
          <TextInput
            value={firstName}
            onChangeText={value => setFirstName(value)}
            placeholder="First Name"
            placeholderTextColor={'#181823'}
            style={styles.textInput}
          />
          <TextInput
            value={lastName}
            onChangeText={value => setLastName(value)}
            placeholder="Last Name"
            placeholderTextColor={'#181823'}
            style={styles.textInput}
          />
          <TextInput
            value={email}
            onChangeText={value => setEmail(value)}
            placeholder="Email"
            placeholderTextColor={'#181823'}
            style={styles.textInput}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default EditProfileScreen;
