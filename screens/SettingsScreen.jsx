import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
  useColorScheme,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import settingsScreenLight from '../styleSheets/light/settingsScreenLight';
import {auth} from '../firebase';
import {useNavigation} from '@react-navigation/native';

const SettingsScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const styles = isDarkMode ? settingsScreenLight : settingsScreenLight;
  const user = auth.currentUser;

  const navigation = useNavigation();

  const handleSignOut = () => {
    auth.signOut().then(() => console.log('User signed out!'));
  };
  return (
    <View>
      <SafeAreaView>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>Profile</Text>
          </View>
          <View style={styles.nameEmailContainer}>
            <Text style={styles.name}>Name</Text>
            <Text style={styles.email}>email</Text>
          </View>
          <View style={styles.settingsContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditProfileScreen')}
              style={styles.touchable}>
              <Text style={styles.touchableText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('NotificationsScreen')}
              style={styles.touchable}>
              <Text style={styles.touchableText}>Notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchable}>
              <Text style={styles.touchableText}>Help</Text>
            </TouchableOpacity>
            <View style={styles.darkThemeContainer}>
              <Text style={styles.touchableText}>Dark Theme</Text>
              <Switch
                value={isDarkMode}
                onValueChange={() => setIsDarkMode(!isDarkMode)}
              />
            </View>
            <TouchableOpacity onPress={handleSignOut} style={styles.touchable}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
