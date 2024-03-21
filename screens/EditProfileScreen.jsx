import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import EditProfileScreenLight from '../styleSheets/light/editProfileScreenLight';
import {auth} from '../firebase';
import axios from 'axios';
const EditProfileScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const styles = isDarkMode ? EditProfileScreenLight : EditProfileScreenLight;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState();
  const currentUser = auth.currentUser;

  const handleUpdate = async () => {
    try {
      await axios
        .patch(
          `https://gdsc-geonotify.wl.r.appspot.com/updateUser/${currentUser.uid}`,
          {
            uid: currentUser.uid,
            first_name: firstName,
            last_name: lastName,
            email: email,
          },
        )
        .then(response => console.log(response.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const uid = currentUser.uid;
      const userDataResponse = await axios.get(
        `https://gdsc-geonotify.wl.r.appspot.com/getUserData/${uid}`,
      );
      const userData = userDataResponse.data;
      console.log(userData);
      setUser(userData);
      setFirstName(userData.first_name);
      setLastName(userData.last_name);
    } catch (err) {
      console.log(err);
    }
  };

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
          {/* <TextInput
            value={email}
            onChangeText={value => setEmail(value)}
            placeholder="Email"
            placeholderTextColor={'#181823'}
            style={styles.textInput}
          /> */}
          <TouchableOpacity onPress={handleUpdate} style={styles.updateButton}>
            <Text style={styles.updateText}>Update</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default EditProfileScreen;
