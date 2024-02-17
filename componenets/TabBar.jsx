import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import React from 'react';
import tabBarDark from '../styleSheets/dark/tabBarDark';
import Bar from '../assets/icons/Bar.svg';
import Home from '../assets/icons/vuesax/outline/vuesax/outline/Home.svg';
// import {useNavigation} from '@react-navigation/native';

const TabBar = () => {
  const styles = tabBarDark;
  // const navigation = useNavigation();

  return (
    <>
      <Bar style={styles.barSvg} />
      <View style={styles.bar}>
        <View style={styles.homeTab}>
          <Home />
          <Text>Home</Text>
        </View>
        <View style={styles.createReminder}>
          <Text>Create</Text>
        </View>
        <View style={styles.profileTab}>
          <Text>Profile</Text>
        </View>
      </View>
    </>
  );
};

export default TabBar;
