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
  Image,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import Swipeable from 'react-native-swipeable';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {darkHomepage} from '../styleSheets/dark/darkHomepage';
import {lightHomepage} from '../styleSheets/light/lightHomepage';
import MapHomepage from '../components/MapHomepage';
import {auth} from '../firebase';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const ReminderItem = ({item}) => {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const styles = isDarkTheme ? darkHomepage : lightHomepage;
  return (
    <View style={styles.reminderSection}>
      <View style={styles.reminderColumn}>
        <Text style={styles.reminderName}> {item.title}</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.date}> {item.target_date.substring(0, 10)}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text numberOfLines={1}> {item.description} </Text>
        </View>
      </View>

        </View>
  );
};

const SwipeableMissedReminderItem = ({item, onDelete, onEdit}) => {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const styles = isDarkTheme ? darkHomepage : lightHomepage;
  const rightButtons = [
    <TouchableOpacity onPress={onEdit}>
      <Image
        style={{width: 75, height: 100}}
        source={require('../assets/edit-icon.png')}
      />
    </TouchableOpacity>,
    <TouchableOpacity onPress={() => onDelete(item._id)}>
      <Image
        style={{width: 75, height: 100}}
        source={require('../assets/delete-icon.png')}
      />
    </TouchableOpacity>,
  ];

  return (
    <Swipeable rightButtons={rightButtons} style={styles.reminderSwipe}>
      <ReminderItem item={item} />
    </Swipeable>
  );
};

const SwipeableReminderItem = ({item, onDelete, onEdit, onFinish}) => {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const styles = isDarkTheme ? darkHomepage : lightHomepage;
  const rightButtons = [
    <TouchableOpacity onPress={onFinish}>
      <Image
        style={{width: 75, height: 100}}
        source={require('../assets/finish-icon.png')}
      />
    </TouchableOpacity>,
    <TouchableOpacity onPress={onEdit}>
      <Image
        style={{width: 75, height: 100}}
        source={require('../assets/edit-icon.png')}
      />
    </TouchableOpacity>,
    <TouchableOpacity onPress={() => onDelete(item._id)}>
      <Image
        style={{width: 75, height: 100}}
        source={require('../assets/delete-icon.png')}
      />
    </TouchableOpacity>,
  ];

  return (
    <Swipeable rightButtons={rightButtons} style={styles.reminderSwipe}>
      <ReminderItem item={item} />
    </Swipeable>
  );
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const styles = isDarkTheme ? darkHomepage : lightHomepage;
  const [userData, setUserData] = useState(null);
  const [activeReminders, setActiveReminders] = useState([]);
  const [inactiveReminders, setInactiveReminders] = useState([]);
  const [isModalVisible, setModalVisible] = useState(true);
  const translateY = useRef(new Animated.Value(screenHeight - 350)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const [sortBy, setSortBy] = useState('Date');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [highlightedSort, setHighlightedSort] = useState('Date');

  const [metadata, setMetadata] = useState({
    numActive: 0,
    numInactive: 0,
    numLocations: 0,
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const newTranslateY = translateY._value + gestureState.dy;

        if (newTranslateY > screenHeight - 350) {
          translateY.setValue(screenHeight - 350);
        } else if (newTranslateY < screenHeight / 10) {
          translateY.setValue(screenHeight / 10);
        } else {
          translateY.setValue(newTranslateY);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.moveY > screenHeight - 350) {
          Animated.spring(translateY, {
            toValue: screenHeight - 350,
            useNativeDriver: false,
            velocity: gestureState.vy,
            stiffness: 1000, // Adjust the stiffness to control how fast the animation reacts to user input
            damping: 50,
          }).start();
        } else if (gestureState.moveY < screenHeight / 10) {
          Animated.spring(translateY, {
            toValue: screenHeight / 10,
            useNativeDriver: false,
            velocity: gestureState.vy,
            stiffness: 1000,
            damping: 50,
          }).start();
        }
      },
    }),
  ).current;

  const closeModal = () => {
    setModalVisible(false);
  };

  const fetchData = async (uid, sortPreference) => {
    try {
      const [userDataResponse, remindersResponse] = await Promise.all([
        axios.get(`https://gdsc-geonotify.wl.r.appspot.com/getUserData/${uid}`),
        axios.get(
          `https://gdsc-geonotify.wl.r.appspot.com/getUserReminders/${uid}?sorted=${sortPreference}`,
        ),
      ]);
      const userData = userDataResponse.data;
      const remindersData = remindersResponse.data;
      const {metadata, activeReminders, inactiveReminders} = remindersData;
      if (activeReminders !== undefined && inactiveReminders !== undefined) {
        if (metadata !== null) {
          setUserData(userData);
          setMetadata(metadata);
        }
        setActiveReminders(activeReminders);
        setInactiveReminders(inactiveReminders);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        fetchData(uid, sortBy);
      }
    }, [sortBy]),
  );

  useEffect(() => {
    Animated.spring(translateY, {
      toValue: screenHeight - 470,
      useNativeDriver: false,
      stiffness: 1000, // Adjust the stiffness to control how fast the animation reacts to user input
      damping: 50,
    }).start();
  }, [sortBy]);

  const rotateCaret = () => {
    Animated.timing(rotate, {
      toValue: rotate._value === 0 ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleSortBy = sortBy => {
    setSortBy(sortBy);
    setDropdownVisible(false);

    rotateCaret();

    if (sortBy === 'Alpha') {
      setHighlightedSort(null);
      setHighlightedSort('Alpha');
    } else {
      setHighlightedSort(null);
      setHighlightedSort('Date');
    }
  };

  const goToUpdateReminder = id => {
    navigation.navigate('UpdateReminder', {id});
  };

  const handleDelete = async _id => {
    try {
      await axios.delete(
        `https://gdsc-geonotify.wl.r.appspot.com/deleteReminder/${_id}`,
      );
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        const sortPreference = sortBy;
        fetchData(uid, sortPreference);
      }
    } catch (error) {
      console.error('Error deleting reminder:', error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <MapHomepage metadata={metadata} />
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
                <Text style={styles.swipe}>
                  Swipe Left To Finish/Edit/Delete

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
                        onPress={() => handleSortBy('Alpha')}
                        style={styles.dropdownItem}>
                        <Text
                          style={[
                            styles.dropdownText,
                            highlightedSort === 'Alpha'
                              ? styles.highlight
                              : null,
                          ]}>
                          Chronological
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleSortBy('Date')}
                        style={styles.dropdownItem}>
                        <Text
                          style={[
                            styles.dropdownText,
                            highlightedSort === 'Date'
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
                <View style={{width: 310, overflow: 'hidden', marginLeft: 10}}>
                  {activeReminders.map((item, index) => (
                    <SwipeableReminderItem
                      key={index}
                      item={item}
                      onDelete={() => handleDelete(item._id)}
                      onEdit={() => goToUpdateReminder(item._id)}
                      onFinish={() => console.log('Finish action')}
                    />
                  ))}
                </View>
              </ScrollView>

              <View style={styles.flexRow}>
                <Text style={styles.swipe}>Swipe Left To Edit/Delete</Text>
              </View>
              <View style={styles.flexRow}>
                <Text style={styles.remindersText}> Missed Reminders </Text>
              </View>
              <ScrollView style={styles.reminderContainer}>
                <View style={{width: 310, overflow: 'hidden', marginLeft: 10}}>
                  {inactiveReminders.map((item, index) => (
                    <SwipeableMissedReminderItem
                      key={index}
                      item={item}
                      onDelete={() => handleDelete(item._id)}
                      onEdit={() => goToUpdateReminder(item._id)}
                    />
                  ))}
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
