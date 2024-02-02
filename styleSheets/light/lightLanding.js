import { StyleSheet } from 'react-native';

export const lightLanding = StyleSheet.create({
  background: {
    backgroundColor: '#EFF3F5',
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
    source: require('../../assets/geonotify-logo-dark.png'),
  },
});