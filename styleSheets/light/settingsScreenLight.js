import {StyleSheet} from 'react-native';
const settingsScreenLight = StyleSheet.create({
  container: {
    paddingHorizontal: 35,
    paddingTop: 20,
    gap: 25,
  },
  nameEmailContainer: {
    // borderColor: 'black',
    // borderWidth: 1,
    alignItems: 'center',
    gap: 8,
  },
  settingsContainer: {
    flexDirection: 'col',
    gap: 30,
  },
  darkThemeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: '#181823',
    fontSize: 25,
    fontWeight: '700',
  },
  name: {
    color: '#181823',
    fontSize: 25,
    fontWeight: '700',
  },
  email: {
    color: '#181823',
    fontSize: 15,
    fontWeight: '600',
  },
  touchableText: {
    color: '#181823',
    fontSize: 18,
    fontWeight: '600',
  },
  touchable: {
    height: 25,
    width: '100%',
  },
  logoutText: {
    color: '#FF6161',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default settingsScreenLight;
