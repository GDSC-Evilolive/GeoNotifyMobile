import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Dropdown} from 'react-native-element-dropdown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
const CreateReminderScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [repeat, setRepeat] = useState('');
  const [open, setOpen] = useState(false);
  const data = [
    {label: 'none', value: 'none'},
    {label: 'daily', value: 'daily'},
    {label: 'weekly', value: 'weekly'},
    {label: 'monthly', value: 'monthly'},
  ];
  return (
    // <View>
    //   <SafeAreaView>
    //     <Text>Create Reminder</Text>
    //     <Text>Title</Text>
    //     <TextInput />
    //     <Text>Description</Text>
    //     <TextInput />
    //     <Text>Date</Text>
    <>
      <TouchableOpacity onPress={() => setOpen(true)}>
        <Text>Open Date</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        mode="datetime"
        isVisible={open}
        date={date}
        onConfirm={d => {
          setOpen(false);
          setDate(d);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>

    //     <Text>Repeat</Text>
    //     <Dropdown
    //       value={repeat}
    //       onChange={item => {
    //         setRepeat(item);
    //       }}
    //       data={data}
    //       labelField="label"
    //       valueField="value"
    //     />
    //   </SafeAreaView>
    // </View>
  );
};

export default CreateReminderScreen;
