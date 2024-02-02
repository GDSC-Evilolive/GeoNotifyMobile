import { StyleSheet } from 'react-native';

export const darkLanding = StyleSheet.create({
  background: {
    backgroundColor: '#181823',
  },
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    source: require('../../assets/geonotify-logo-light.png'),
  },
});