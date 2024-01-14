import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
// import {auth} from '../firebase';
// import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
const HomeScreen = () => {
  // const navigation = useNavigation();
  // const [user, setUser] = useState();
  // const currentUser = auth.currentUser;
  // useEffect(() => {
  //   try {
  //     axios
  //       .post('http://localhost:8000/api/user/uid', {
  //         email: currentUser.email,
  //         uid: currentUser.uid,
  //       })
  //       .then(res => {
  //         setUser(res.data);
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);
  // return (
  //   <View>
  //     <SafeAreaView>
  //       <View>
  //         <TouchableOpacity
  //           onPress={() => navigation.navigate('CreateReminder')}>
  //           <Text>Create Reminder</Text>
  //         </TouchableOpacity>
  //       </View>
  //       <View>
  //         <Text>Hello {user ? user.name : 'user'}</Text>
  //       </View>
  //     </SafeAreaView>
  //   </View>
  // );
  return (
    <SafeAreaView>
      <Text>HomeScreen</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
