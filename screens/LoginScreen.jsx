import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Touchable,
  StyleSheet,
  Image,
  useColorScheme,
  Animated,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {auth} from '../firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {loginScreenDark} from '../styleSheets/dark/loginScreenDark';
import {loginScreenLight} from '../styleSheets/light/loginScreenLight';
import Landing from './Landing';

const LoginScreen = () => {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const styles = isDarkTheme ? loginScreenDark : loginScreenLight;
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  const [showContent, setShowContent] = useState(false);
  const opacity = useState(new Animated.Value(0))[0];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <View>
        <SafeAreaView style={styles.background}>
          <Landing />
          <Animated.View style={{flex: 1, opacity}}>
            {showContent && (
              <View style={styles.container}>
                <View style={styles.inputContainer}>
                  <Text style={styles.title}>Login</Text>
                  <Text style={styles.input_header}>Email </Text>
                  <TextInput
                    value={email}
                    onChangeText={value => setEmail(value)}
                    placeholder="Email"
                    placeholderTextColor={'#6A6A73'}
                    autoCapitalize="none"
                    style={styles.textInput}
                  />
                  <Text style={styles.input_header}>Password</Text>
                  <TextInput
                    value={password}
                    onChangeText={value => setPassword(value)}
                    placeholder="Password"
                    placeholderTextColor={'#6A6A73'}
                    autoCapitalize="none"
                    secureTextEntry
                    style={styles.textInput}
                  />
                  <TouchableOpacity
                    onPress={handleSignIn}
                    style={styles.loginButton}>
                    <Text style={styles.loginText}>Login</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.signupContainer}>
                  <Text style={styles.text}>Don't have an account?</Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('SignUp');
                    }}>
                    <Text style={styles.signupText}>Sign Up</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Animated.View>
        </SafeAreaView>
      </View>
    </>
  );
};

export default LoginScreen;
