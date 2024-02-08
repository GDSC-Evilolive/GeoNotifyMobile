import {View, Text, TextInput, TouchableOpacity, Button} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Dropdown} from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker';
import axios from 'axios';
const CreateReminderScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [repeat, setRepeat] = useState('never');
  const [open, setOpen] = useState(false);
  const data = [
    {label: 'never', value: 'never'},
    {label: 'daily', value: 'daily'},
    {label: 'weekly', value: 'weekly'},
    {label: 'monthly', value: 'monthly'},
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
    <View>
      <SafeAreaView>
        <Text>Create Reminder</Text>
        <Text>Title</Text>
        <TextInput
          value={title}
          onChangeText={value => {
            setTitle(value);
          }}
        />
        <Text>Description</Text>
        <TextInput
          value={description}
          onChangeText={value => {
            setDescription(value);
          }}
        />
        <View style={{borderColor: 'black', borderWidth: 2}}>
          <Text>Starts</Text>
          <Text>{date.toDateString()}</Text>
        </View>

        <Button title="Open" onPress={() => setOpen(true)} />
        <DatePicker
          modal
          mode="date"
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />

        <Text>Repeat</Text>
        <Dropdown
          value={repeat}
          onChange={item => {
            setRepeat(item);
          }}
          data={data}
          labelField="label"
          valueField="value"
        />
        <TouchableOpacity onPress={createReminder}>
          <Text>Create</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default CreateReminderScreen;
