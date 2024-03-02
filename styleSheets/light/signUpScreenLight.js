import {StyleSheet} from 'react-native';
export const signUpScreenLight = StyleSheet.create({
  background: {
    backgroundColor: '#EFF3F5',
    height: '100%',
  },
  container: {
    height: '100%',
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  inputContainer: {
    justifyContent: 'flex-end',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 7,
    paddingTop: 35,
  },
  title: {
    color: '#537FE7',
    fontSize: 25,
    fontWeight: '700',
    marginBottom: 10,
  },
  inputHeader: {
    color: '#6A6A73',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  textInput: {
    width: '100%',
    backgroundColor: '#FFF',
    height: 48,
    borderRadius: 10,
    borderColor: '#BBBBC5',
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 15,
  },
  signUpButton: {
    height: 48,
    width: '100%',
    backgroundColor: '#537FE7',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  signUpText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  text: {
    color: '#6A6A73',
    fontSize: 14,
  },
  loginText: {
    color: '#537FE7',
    textDecorationLine: 'underline',
  },
});
