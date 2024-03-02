import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, ScrollView, useColorScheme, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import DatePicker from 'react-native-date-picker';
import axios from 'axios';
import { auth } from '../firebase';
import Collapsible from 'react-native-collapsible';
import createReminderScreenDark from '../styleSheets/dark/createReminderScreenDark';
import createReminderScreenLight from '../styleSheets/light/createReminderScreenLight';
import SelectList from '../components/SelectList';

const UpdateReminderScreen = ({ route }) => {
    const { id } = route.params;
    const theme = useColorScheme();
    const isDarkTheme = theme === 'dark';
    const styles = isDarkTheme ? createReminderScreenDark : createReminderScreenLight;
    const backButtonImage = theme === 'dark' ? require('../assets/back-button-light.png') : require('../assets/back-button-dark.png');
    const navigation = useNavigation();
  
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [repeat, setRepeat] = useState('never');
    const [dateOpen, setDateOpen] = useState(false);
    const [timeOpen, setTimeOpen] = useState(false);
    const [repeatOpen, setRepeatOpen] = useState(false);
    const repeatData = [
      { key: 'never', value: 'Never', disabled: false },
      { key: 'daily', value: 'Daily', disabled: false },
      { key: 'weekdays', value: 'Weekdays', disabled: false },
      { key: 'weekends', value: 'Weekends', disabled: false },
      { key: 'weekly', value: 'Weekly', disabled: false },
    ];
  
    useEffect(() => {
        console.log(id);
      // Need to ask backend to make this request 
      axios.get(`https://gdsc-geonotify.wl.r.appspot.com/getReminder/${id}`)
        .then(response => {
            console.log(response.data);
          const { title, description, target_date } = response.data;
          setTitle(title);
          setDescription(description);
          if (target_date) {
            setDate(new Date(target_date));
            setDateOpen(true);
            setTimeOpen(true);
          }
        })
        .catch(error => {
          console.error('Error fetching reminder details:', error);
        });
    }, [id]);
  
    const handleUpdate = () => {
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        try {
          axios.patch(`https://gdsc-geonotify.wl.r.appspot.com/updateReminder/${id}`, {
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
              navigation.goBack();
            })
            .catch(error => {
              console.error('Error updating reminder:', error);
            });
        } catch (err) {
          console.error('Error updating reminder:', err);
        }
      } else {
        console.log('User not authenticated.');
      }
    };

  return (
    <SafeAreaView style={styles.safeareaview}>
      <View style={styles.background}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.goBackButton}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                    source={backButtonImage}
                    style={{
                      width: 28,
                      height: 28,
                      resizeMode: 'cover',
                    }} 
                  />
              </TouchableOpacity>
              <Text style={styles.goBackText}>Edit Reminder</Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputHeader}>Title</Text>
              <TextInput
                value={title}
                onChangeText={value => setTitle(value)}
                style={styles.textInput}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputHeader}>Description</Text>
              <TextInput
                value={description}
                onChangeText={value => setDescription(value)}
                style={styles.textInput}
              />
            </View>
            
            <View style={styles.dateContainer}>
              <View style={styles.headerContainer}>
                <View style={styles.justifyCenter}>
                 <Image
                    source={require('../assets/date-icon.png')}
                    style={{
                      width: 32,
                      height: 32,
                      resizeMode: 'cover',
                    }} 
                  />
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
                    <Image
                      source={require('../assets/time-icon.png')}
                      style={{
                        width: 32,
                        height: 32,
                        resizeMode: 'cover',
                      }} 
                    />
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
                    <Image
                      source={require('../assets/repeat-icon.png')}
                      style={{
                        width: 32,
                        height: 32,
                        resizeMode: 'cover',
                      }} 
                    />
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
                <Image
                    source={require('../assets/location-icon.png')}
                    style={{
                      width: 32,
                      height: 32,
                      resizeMode: 'cover',
                    }} 
                />
                  <Text style={styles.sectionTitle}>Location</Text>
                </View>
                <Switch style={styles.toggleButton} />
              </View>
            </View>
            
            <TouchableOpacity onPress={handleUpdate} style={styles.createReminder}>
              <Text style={styles.createReminderText}>Update Reminder</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default UpdateReminderScreen;