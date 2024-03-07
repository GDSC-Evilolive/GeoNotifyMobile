import {StyleSheet} from 'react-native';
const verifyScreenDark = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#181823',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#EFF3F5',
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#EFF3F5',
  },
  loginButton: {
    backgroundColor: '#537FE7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  loginText: {
    color: 'white',
    fontSize: 16,
  },
});

export default verifyScreenDark;