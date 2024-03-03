import { StyleSheet, Text, TouchableOpacity, View, Image, useColorScheme } from 'react-native';
import React, { useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../firebase';
import BottomSheet from 'react-native-raw-bottom-sheet';

const SettingsScreen = () => {
  const bottomSheetRef = useRef(null);
  const theme = useColorScheme();
  const profileIcon = theme === 'dark' ? require('../assets/profile-light.png') : require('../assets/profile-dark.png');
  const notificationIcon = theme === 'dark' ? require('../assets/notification-light.png') : require('../assets/notification-dark.png');
  const modeIcon = theme === 'dark' ? require('../assets/mode-light.png') : require('../assets/mode-dark.png');

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
        <Text>Settings</Text>
        <TouchableOpacity onPress={handleLogoutConfirmation}>
          <Text>Logout</Text>
        </TouchableOpacity>
        <Image source={profileIcon} style={{ width: 28, height: 28, resizeMode: 'cover'}} />
        <Image source={notificationIcon} style={{ width: 28, height: 28, resizeMode: 'cover'}} />
        <Image source={modeIcon} style={{ width: 28, height: 28, resizeMode: 'cover'}} />
        <Image source={require('../assets/logout.png')} style={{ width: 28, height: 28, resizeMode: 'cover'}} />
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
        duration={500}
      >
        <View style={styles.bottomSheetContent}>
          <Text style={styles.headerText}>Logout</Text>
          <View style={styles.logoutContainer}>
            <Text style={styles.questionText}>Are you sure you want to log out?</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={handleConfirmLogout} style={styles.logoutButton}>
                <Text style={styles.logoutText}>Yes, Logout</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => bottomSheetRef.current.close()} style={styles.cancelButton}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSheetContent: {
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF6161',
    marginBottom: 30,
  },
  logoutContainer: {
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingVertical: 24,
  },
  questionText: {
    marginBottom: 24,
    fontWeight: 'bold',
    fontSize: 20,
    color: '#181823',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'column',
    gap: 12
  },
  logoutButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#537FE7',
    width: 323,
  },
  logoutText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#D4DFF9',
    width: 323,
  },
  cancelText: {
    color: '#537FE7',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;