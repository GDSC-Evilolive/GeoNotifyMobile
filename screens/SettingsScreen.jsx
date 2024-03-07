import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  useColorScheme,
  Switch,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {auth} from '../firebase';
import BottomSheet from 'react-native-raw-bottom-sheet';
import settingsScreenLight from '../styleSheets/light/settingsScreenLight';
import axios from 'axios';

const SettingsScreen = () => {
  const [user, setUser] = useState();
  const currentUser = auth.currentUser;
  const bottomSheetRef = useRef(null);
  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const styles = isDarkMode ? settingsScreenLight : settingsScreenLight;
  const profileIcon =
    theme === 'dark'
      ? require('../assets/profile-light.png')
      : require('../assets/profile-dark.png');
  const notificationIcon =
    theme === 'dark'
      ? require('../assets/notification-light.png')
      : require('../assets/notification-dark.png');
  const modeIcon =
    theme === 'dark'
      ? require('../assets/mode-light.png')
      : require('../assets/mode-dark.png');

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
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignOut = () => {
    auth.signOut().then(() => console.log('User signed out!'));
  };

  const handleLogoutConfirmation = () => {
    bottomSheetRef.current.open();
  };

  const handleConfirmLogout = () => {
    handleSignOut();
    bottomSheetRef.current.close();
  };

  return (
    <View>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.nameEmailContainer}>
            {user && (
              <>
                <Text style={styles.name}>{user.first_name}</Text>
                <Text style={styles.email}>{user.email}</Text>
              </>
            )}
          </View>
          <View style={styles.settingsContainer}>
            <TouchableOpacity
              // onPress={() => navigation.navigate('EditProfileScreen')}
              style={styles.touchable}>
              <Image
                source={profileIcon}
                style={{width: 28, height: 28, resizeMode: 'cover'}}
              />
              <Text style={styles.touchableText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={() => navigation.navigate('NotificationsScreen')}
              style={styles.touchable}>
              <Image
                source={modeIcon}
                style={{width: 28, height: 28, resizeMode: 'cover'}}
              />
              <Text style={styles.touchableText}>Notifications</Text>
            </TouchableOpacity>
            <View style={styles.darkThemeContainer}>
              <View
                style={{flexDirection: 'row', gap: 15, alignItems: 'center'}}>
                <Image
                  source={notificationIcon}
                  style={{width: 28, height: 28, resizeMode: 'cover'}}
                />
                <Text style={styles.touchableText}>Dark Theme</Text>
              </View>
              <Switch
                value={isDarkMode}
                // onValueChange={() => setIsDarkMode(!isDarkMode)}
              />
            </View>
            <TouchableOpacity
              onPress={handleLogoutConfirmation}
              style={styles.touchable}>
              <Image
                source={require('../assets/logout.png')}
                style={{width: 28, height: 28, resizeMode: 'cover'}}
              />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      <BottomSheet
        ref={bottomSheetRef}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          container: {
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            backgroundColor: 'white',
            height: 330,
            alignItems: 'center',
            justifyContent: 'center',
          },
          wrapper: {
            backgroundColor: 'none',
          },
        }}
        animationType={'slide'}
        duration={500}>
        <View style={styles.bottomSheetContent}>
          <Text style={styles.headerText}>Logout</Text>
          <View style={styles.logoutContainer}>
            <Text style={styles.questionText}>
              Are you sure you want to log out?
            </Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                onPress={handleConfirmLogout}
                style={styles.logoutButton}>
                <Text style={styles.logoutTextSheet}>Yes, Logout</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => bottomSheetRef.current.close()}
                style={styles.cancelButton}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

// const styles = StyleSheet.create({
//   bottomSheetContent: {
//     padding: 20,
//     alignItems: 'center',
//   },
//   headerText: {
//     fontSize: 25,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#FF6161',
//     marginBottom: 30,
//   },
//   logoutContainer: {
//     borderTopWidth: 1,
//     borderTopColor: '#EEEEEE',
//     paddingVertical: 24,
//   },
//   questionText: {
//     marginBottom: 24,
//     fontWeight: 'bold',
//     fontSize: 20,
//     color: '#181823',
//     textAlign: 'center',
//   },
//   buttonsContainer: {
//     flexDirection: 'column',
//     gap: 12,
//   },
//   logoutButton: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     marginHorizontal: 10,
//     borderRadius: 5,
//     backgroundColor: '#537FE7',
//     width: 323,
//   },
//   logoutText: {
//     color: 'white',
//     textAlign: 'center',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   cancelButton: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     marginHorizontal: 10,
//     borderRadius: 5,
//     backgroundColor: '#D4DFF9',
//     width: 323,
//   },
//   cancelText: {
//     color: '#537FE7',
//     textAlign: 'center',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

export default SettingsScreen;
