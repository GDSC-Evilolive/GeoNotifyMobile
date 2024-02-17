import {StyleSheet} from 'react-native';
const tabBarDark = StyleSheet.create({
  bar: {
    height: 80,
    backgroundColor: '#273B4A',
    flexDirection: 'row',
  },
  homeTab: {
    flex: 1 / 3,
    borderColor: 'white',
    borderWidth: 30,
  },
  barSvg: {
    // position: 'absolute',
  },
  createReminder: {
    flex: 1 / 3,
  },
  profileTab: {
    flex: 1 / 3,
  },
});

export default tabBarDark;
