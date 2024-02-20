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
} from 'react-native';
import React, {useReducer, useState, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Dropdown} from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker';
import {Calendar} from 'react-native-calendars';
import axios from 'axios';

import CreateReminderScreenDark from '../styleSheets/dark/CreateReminderScreenDark';
import Collapsible from 'react-native-collapsible';
import SelectList from '../components/SelectList';

const CreateReminderScreen = () => {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const styles = isDarkTheme
    ? CreateReminderScreenDark
    : CreateReminderScreenDark;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [repeat, setRepeat] = useState('never');
  const [dateOpen, setDateOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const [repeatOpen, setRepeatOpen] = useState(false);
  const repeatData = [
    {key: 'never', value: 'Never', disabled: false},
    {key: 'daily', value: 'Daily', disabled: false},
    {key: 'weekdays', value: 'Weekdays', disabled: false},
    {key: 'weekends', value: 'Weekends', disabled: false},
    {key: 'weekly', value: 'Weekly', disabled: false},
  ];
  const createReminder = () => {
    try {
      axios
        .post('http://localhost:3002/createReminder', {
          title: title,
          description: description,
          date: date,
          repeat: repeat,
        })
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
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
                <View style={styles.justifyCenter}>
                  <Text style={styles.sectionTitle}>Date</Text>
                  {dateOpen ? (
                    <Text style={styles.sectionSubTitle}>
                      {date.toDateString()}
                    </Text>
                  ) : null}
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
                    console.log(day);
                    console.log(d);
                  }}
                  style={styles.calendar}
                />
                <View style={styles.headerContainer}>
                  <View style={styles.justifyCenter}>
                    <Text style={styles.sectionTitle}>Time</Text>
                    {timeOpen ? (
                      <Text style={styles.sectionSubTitle}>
                        {date.getHours()}:{date.getMinutes()}
                      </Text>
                    ) : null}
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
                  <View style={styles.justifyCenter}>
                    <Text style={styles.sectionTitle}>Repeat</Text>
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
                <View style={styles.justifyCenter}>
                  <Text style={styles.sectionTitle}>Location</Text>
                </View>
                <Switch style={styles.toggleButton} />
              </View>
            </View>

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
