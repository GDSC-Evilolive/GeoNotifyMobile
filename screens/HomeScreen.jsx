import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  Animated,
  PanResponder,
  useColorScheme,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {darkHomepage} from '../styleSheets/dark/darkHomepage';
import {lightHomepage} from '../styleSheets/light/lightHomepage';
import MapHomepage from '../components/MapHomepage';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const HomeScreen = () => {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const styles = isDarkTheme ? darkHomepage : lightHomepage;
  const [userData, setUserData] = useState(null);
  const [isModalVisible, setModalVisible] = useState(true);
  const translateY = useRef(new Animated.Value(screenHeight - 370)).current;
  const [rotate, setRotate] = useState(new Animated.Value(0));
  const [sortBy, setSortBy] = useState('time'); // Default sort by time
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [highlightedSort, setHighlightedSort] = useState('time'); // Default highlight on 'time'

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const newTranslateY = translateY._value + gestureState.dy;

        if (newTranslateY > screenHeight - 350) {
          translateY.setValue(screenHeight - 350);
        } else if (newTranslateY < screenHeight / 11) {
          translateY.setValue(screenHeight / 11);
        } else {
          translateY.setValue(newTranslateY);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.moveY > screenHeight - 350) {
          Animated.spring(translateY, {
            toValue: screenHeight - 350,
            useNativeDriver: false,
            velocity: gestureState.vy, // Use gesture velocity to control animation speed
          }).start();
        } else if (gestureState.moveY < screenHeight / 11) {
          Animated.spring(translateY, {
            toValue: screenHeight / 11,
            useNativeDriver: false,
            velocity: gestureState.vy, // Use gesture velocity to control animation speed
          }).start();
        }
      },
    }),
  ).current;

  const closeModal = () => {
    setModalVisible(false);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3002/getUserData/jif2389y7f2jh1hid',
      );
      const userData = response.data;
      setUserData(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchData();

    Animated.spring(translateY, {
      toValue: screenHeight - 470,
      useNativeDriver: false,
      stiffness: 1000, // Adjust the stiffness to control how fast the animation reacts to user input
      damping: 50, // Adjust the damping to control the smoothness of the animation
    }).start();
  }, []);

  const rotateCaret = () => {
    Animated.timing(rotate, {
      toValue: rotate._value === 0 ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleSortBy = sortBy => {
    setSortBy(sortBy);
    setDropdownVisible(false); // Close the dropdown after selection

    // Reset rotation of the caret-down icon
    rotateCaret();

    // Check the selected sort option and toggle highlighting accordingly
    if (sortBy === 'chronological') {
      setHighlightedSort(null); // Remove highlighting from 'time'
      setHighlightedSort('chronological'); // Highlight 'chronological'
    } else {
      setHighlightedSort(null); // Remove highlighting from 'chronological'
      setHighlightedSort('time'); // Highlight 'time'
    }
  };

  return (
    <View style={{flex: 1}}>
      <MapHomepage />
      {isModalVisible && (
        <Animated.View
          style={[
            styles.screenView,
            {width: screenWidth},
            {transform: [{translateY}]},
          ]}>
          <View style={{width: screenWidth}}>
            <View style={styles.bar} {...panResponder.panHandlers}>
              <View style={styles.line} />
            </View>
            <View style={styles.name}>
              <Text style={styles.helloText}>Hello </Text>
              {userData && (
                <Text style={styles.nameText}>{userData.first_name} </Text>
              )}
            </View>
            <ScrollView style={{paddingLeft: 25, paddingRight: 25}}>
              <View style={styles.flexRow}>
                <Text style={styles.swipe}>Swipe Left To Edit/Delete</Text>
                <Text style={styles.swipe}>Swipe Right To Finish</Text>
              </View>
              <View style={styles.flexRow}>
                <Text style={styles.remindersText}> Reminders </Text>
                <View style={styles.sortContainer}>
                  <Text style={styles.sortText}> Sort By </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setDropdownVisible(!dropdownVisible);
                      rotateCaret();
                    }}>
                    <Animated.Image
                      source={
                        isDarkTheme
                          ? require('../assets/dark-caret-down.png')
                          : require('../assets/light-caret-down.png')
                      }
                      style={[
                        styles.caret,
                        {
                          transform: [
                            {
                              rotate: rotate.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['360deg', '180deg'],
                              }),
                            },
                          ],
                        },
                        {width: 27, height: 20},
                      ]}
                    />
                  </TouchableOpacity>
                  {dropdownVisible && (
                    <View style={styles.dropdown}>
                      <TouchableOpacity
                        onPress={() => handleSortBy('chronological')}
                        style={styles.dropdownItem}>
                        <Text
                          style={[
                            styles.dropdownText,
                            highlightedSort === 'chronological'
                              ? styles.highlight
                              : null,
                          ]}>
                          Chronological
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleSortBy('time')}
                        style={styles.dropdownItem}>
                        <Text
                          style={[
                            styles.dropdownText,
                            highlightedSort === 'time'
                              ? styles.highlight
                              : null,
                          ]}>
                          Time
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
              <ScrollView style={styles.reminderContainer}>
                <View style={styles.reminderSection}>
                  <View style={styles.reminderRow}>
                    <Text style={styles.reminderName}> Reminder Name</Text>
                    <View style={styles.dateContainer}>
                      <Text style={styles.date}> 12/24/24</Text>
                    </View>
                  </View>
                  <View style={styles.reminderRow}>
                    <View style={styles.descriptionContainer}>
                      <Text> Description </Text>
                    </View>
                  </View>
                </View>
              </ScrollView>

              <View style={styles.flexRow}>
                <Text style={styles.swipe}>Swipe Left To Edit/Delete</Text>
                <Text style={styles.swipe}>Swipe Right To Archive</Text>
              </View>
              <View style={styles.flexRow}>
                <Text style={styles.remindersText}> Missed Reminders </Text>
              </View>
              <ScrollView style={styles.reminderContainer}>
                <View style={styles.reminderSection}>
                  <View style={styles.reminderRow}>
                    <Text style={styles.reminderName}> Reminder Name</Text>
                    <View style={styles.dateContainer}>
                      <Text style={styles.date}> 12/24/24</Text>
                    </View>
                  </View>
                  <View style={styles.reminderRow}>
                    <View style={styles.descriptionContainer}>
                      <Text> Description </Text>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </ScrollView>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default HomeScreen;
