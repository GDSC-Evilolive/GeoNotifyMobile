import {
    View,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    Touchable,
    TouchableWithoutFeedback,
    StyleSheet,
  } from 'react-native';
  import React, {useState} from 'react';
  
  const SelectList = ({ data, repeat, setRepeat }) => {
    // const [repeat, setRepeat] = useState('never');
    const listItems = data.map(item => (
      <TouchableOpacity
        key={item.key} 
        onPress={() => {
          setRepeat(item.key);
          console.log(item.key);
        }}
        delayPressIn={0}
      >
        <View
          style={[
            styles.listItem,
            { backgroundColor: repeat === item.key ? '#537FE7' : '#FFF' },
            { borderTopLeftRadius: item.key === 'never' ? 9 : 0 },
            { borderTopRightRadius: item.key === 'never' ? 9 : 0 },
            { borderBottomLeftRadius: item.key === 'weekly' ? 9 : 0 },
            { borderBottomRightRadius: item.key === 'weekly' ? 9 : 0 },
          ]}
        >
          <Text
            style={[
              styles.listItemText,
              { color: repeat === item.key ? '#EFF3F5' : '#6A6A73' },
            ]}
          >
            {item.value}
          </Text>
        </View>
      </TouchableOpacity>
    ));
  
    return <View>{listItems}</View>;
  };
  
  export default SelectList;
  
  const styles = new StyleSheet.create({
    listItem: {
      width: '100%',
      height: 50,
      padding: 15,
    },
    listItemText: {
      fontSize: 15,
      fontWeight: '500',
    },
  });