import {StyleSheet} from 'react-native';
export const loginScreenLight = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    // paddingTop: 165,
    paddingBottom: 0,
  },
  inputContainer: {
    height: '50%',
    justifyContent: 'flex-end',
  },
  signupContainer: {
    height: '50%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  navigateContainer: {
    flexDirection: 'row',
    padding: 5,
  },
  background: {
    backgroundColor: '#EFF3F5',
    height: '100%',
  },
  text: {
    color: '#6A6A73',
    fontSize: 15,
  },
  signupText: {
    color: '#537FE7',
    fontSize: 15,
    textDecorationLine: 'underline'
  },
  title: {
    color: '#537FE7',
    fontFamily: 'jost_medium',
    fontSize: 25,
    fontWeight: '700',
    marginBottom: 15,
  },
  input_header: {
    color: '#6A6A73',
    fontFamily: 'Jost-Bold',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  textInput: {
    width: '100%',
    color: '#6A6A73',
    backgroundColor: 'white',
    height: 48,
    borderRadius: 10,
    borderColor: '#BBBBC5',
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 25,
  },
  loginButton: {
    backgroundColor: '#537FE7',
    height: 48,
    borderRadius: 10,

    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: "#FFFF",
  }
});
