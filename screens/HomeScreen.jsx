import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
// import {auth} from '../firebase';
// import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
const HomeScreen = () => {
  return (
    <SafeAreaView style={{height: '100%'}}>
      <Text>HomeScreen</Text>
      <ScrollView
        style={{
          height: '100%',
          borderColor: 'black',
          borderWidth: 2,
          // position: 'absolute',
          alignContent: 'stretch'
        }}>
        <View style={{backgroundColor: 'grey',}}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
