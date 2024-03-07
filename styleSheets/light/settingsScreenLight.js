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
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  logoutText: {
    color: '#FF6161',
    fontSize: 18,
    fontWeight: '600',
  },
  bottomSheetContent: {
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF6161',
    marginBottom: 30,
  },
  logoutContainer: {
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingVertical: 24,
  },
  questionText: {
    marginBottom: 24,
    fontWeight: 'bold',
    fontSize: 20,
    color: '#181823',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'column',
    gap: 12,
  },
  logoutButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#537FE7',
    width: 323,
  },
  logoutTextSheet: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#D4DFF9',
    width: 323,
  },
  cancelText: {
    color: '#537FE7',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default settingsScreenLight;
