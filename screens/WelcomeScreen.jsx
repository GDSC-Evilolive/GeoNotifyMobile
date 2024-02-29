import {View, Text, Image, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Landing from './Landing';
const WelcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <>
      <Landing />
      <View>
        <SafeAreaView>
          <View>
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </>
  );
};

export default WelcomeScreen;
