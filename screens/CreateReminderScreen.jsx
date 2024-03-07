import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Switch,
  useColorScheme,
  Animated,
  ScrollView,
  Image,
} from 'react-native';
import React, {useReducer, useState, useRef, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker';
import {Calendar} from 'react-native-calendars';
import axios from 'axios';
import { auth } from '../firebase';

import createReminderScreenDark from '../styleSheets/dark/createReminderScreenDark';
import createReminderScreenLight from '../styleSheets/light/createReminderScreenLight';
import Collapsible from 'react-native-collapsible';
import SelectList from '../components/SelectList';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const CreateReminderScreen = () => {
  const navigation = useNavigation();
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const styles = isDarkTheme
    ? createReminderScreenDark
    : createReminderScreenLight;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [repeat, setRepeat] = useState('never');
  const [dateOpen, setDateOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const [repeatOpen, setRepeatOpen] = useState(false);
  const [activeDate, setActiveDate] = useState(null);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [error, setError] = useState('');
  const repeatData = [
    {key: 'never', value: 'Never', disabled: false},
    {key: 'daily', value: 'Daily', disabled: false},
    {key: 'weekdays', value: 'Weekdays', disabled: false},
    {key: 'weekends', value: 'Weekends', disabled: false},
    {key: 'weekly', value: 'Weekly', disabled: false},
  ];

  useEffect(() => {
    const today = new Date();
    // Adjust for time zone offset
    today.setDate(today.getDate() - 1); // Add 1 day to get the correct date
    const dateString = today.toISOString().split('T')[0];
    setActiveDate(dateString);
  }, []);

  const createReminder = () => {
    if (!title.trim()) {
      setError('Title is required');
      return; 
    } else {
      setError(''); 
    }

    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      try {
        axios
            .post('https://gdsc-geonotify.wl.r.appspot.com/createReminder', {
                linked_uid: uid,
                title: title,
                description: description,
                target_date: date,
                is_active: true,
                location: [38.5382, 121.7617],
                //repeat: repeat,
            })
            .then(res => {
                console.log(res);
                setTitle('');
                setDescription('');
                setDateOpen(false);
                setTimeOpen(false);
                setRepeatOpen(false);
                setRepeat('never');
                setDate(new Date());
                setError('');
                navigation.navigate('Home');
            })
            .catch(error => {
                console.log(error);
            });
    } catch (err) {
        console.log(err);
    }
  } else {
      console.log('User not authenticated.');
  }
  };
  return (
    <SafeAreaView style={styles.safeareaview}>
      <View style={styles.background}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputHeader}>Title</Text>
              <TextInput
                value={title}
                onChangeText={value => {
                  setTitle(value);
                }}
                style={styles.textInput}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputHeader}>Description</Text>
              <TextInput
                value={description}
                onChangeText={value => {
                  setDescription(value);
                }}
                style={styles.textInput}
              />
            </View>
            <View style={styles.dateContainer}>
              <View style={styles.headerContainer}>
                <View style={styles.iconContainer}>
                  <Image
                      source={require('../assets/date-icon.png')}
                      style={{
                        width: 32,
                        height: 32,
                        resizeMode: 'cover',
                      }} 
                    />
                  <View style={styles.justifyCenter}>
                    <Text style={styles.sectionTitle}>Date</Text>
                    {dateOpen ? (
                      <Text style={styles.sectionSubTitle}>
                        {date.toDateString()}
                      </Text>
                    ) : null}
                  </View>
                </View>
                  <Switch
                    value={dateOpen}
                    onValueChange={() => {
                      setDateOpen(!dateOpen);
                    }}
                    style={styles.toggleButton}
                  />
              </View>
              <Collapsible collapsed={!dateOpen}>
              <Calendar
                onDayPress={day => {
                  let d = new Date();
                  d.setFullYear(day.year, day.month - 1, day.day);
                  d.setHours(date.getHours(), date.getMinutes());
                  setDate(d);
                  setActiveDate(day.dateString); // Update the active date
                  console.log(day);
                  console.log(d);
                }}
                markedDates={{
                  [activeDate]: { selected: true, selectedColor: '#0C79FE' }
                }}
                style={styles.calendar}
              />

                <View style={styles.headerContainer}>
                  <View style={styles.iconContainer}>
                    <Image
                        source={require('../assets/time-icon.png')}
                        style={{
                          width: 32,
                          height: 32,
                          resizeMode: 'cover',
                        }} 
                      />
                    <View style={styles.justifyCenter}>
                      <Text style={styles.sectionTitle}>Time</Text>
                      {timeOpen ? (
                        <Text style={styles.sectionSubTitle}>
                          {date.getHours()}:{date.getMinutes()}
                        </Text>
                      ) : null}
                    </View>
                  </View>
                  <Switch
                    value={timeOpen}
                    onValueChange={() => setTimeOpen(!timeOpen)}
                  />
                </View>

                <Collapsible collapsed={!timeOpen}>
                  <DatePicker
                    mode="time"
                    date={date}
                    onDateChange={t => {
                      setDate(t);
                    }}
                    style={{alignSelf: 'center'}}
                  />
                </Collapsible>

                <View style={styles.headerContainer}>
                  <View style={styles.iconContainer}>
                    <Image
                      source={require('../assets/repeat-icon.png')}
                      style={{
                        width: 32,
                        height: 32,
                        resizeMode: 'cover',
                      }} 
                    />
                    <View style={styles.justifyCenter}>
                      <Text style={styles.sectionTitle}>Repeat</Text>
                    </View>
                  </View>
                  <Switch
                    value={repeatOpen}
                    onValueChange={() => setRepeatOpen(!repeatOpen)}
                  />
                </View>
                <Collapsible collapsed={!repeatOpen}>
                  <View style={styles.repeatContainer}>
                    <SelectList
                      data={repeatData}
                      repeat={repeat}
                      setRepeat={setRepeat}
                    />
                  </View>
                </Collapsible>
              </Collapsible>
            </View>

            <View style={styles.locationContainer}>
              <View style={styles.headerContainer}>
                <View style={styles.iconContainer}>
                  <Image
                    source={require('../assets/location-icon.png')}
                    style={{
                      width: 32,
                      height: 32,
                      resizeMode: 'cover',
                    }} 
                  />
                  <View style={styles.justifyCenter}>
                    <Text style={styles.sectionTitle}>Location</Text>
                  </View>
                </View>
                <Switch
                  value={locationEnabled}
                  onValueChange={() => setLocationEnabled(!locationEnabled)}
                  style={styles.toggleButton}
                />
              </View>
              {locationEnabled && (
                <View style={styles.locationButtonsContainer}>
                  <TouchableOpacity onPress={() => {}} style={{gap: 8}}>
                    <Image
                      source={require('../assets/current-button.png')}
                      style={{
                        width: 50,
                        height: 50,
                        resizeMode: 'cover',
                      }} 
                    />
                    <Text >Current</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {}} style={{gap: 8}}>
                    <Image
                        source={require('../assets/custom-button.png')}
                        style={{
                          width: 50,
                          height: 50,
                          resizeMode: 'cover',
                        }} 
                    />
                    <Text >Custom </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            {error ? <Text style={{color: "red"}}>{error}</Text> : null}
            <TouchableOpacity
              onPress={createReminder}
              style={styles.createReminder}>
              <Text style={styles.createReminderText}>Save Reminder</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CreateReminderScreen;