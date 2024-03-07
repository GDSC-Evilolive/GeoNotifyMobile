import {StyleSheet} from 'react-native';
const createReminderScreenDark = StyleSheet.create({
  safeareaview: {
    height: '105%',
    backgroundColor: '#181823',
  },
  scrollView: {
    height: '100%',
  },
  background: {
    backgroundColor: '#181823',
    height: '100%',
  },
  goBackButton: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  goBackText: {
    fontSize: 25,
    color: "#EFF3F5",
    fontWeight: 'bold',
  },
  container: {
    gap: 20,
    paddingHorizontal: 35,
    paddingTop: 25,
    paddingBottom: 25,
  },
  dateContainer: {
    borderRadius: 10,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#BBBBC5',
  },
  locationContainer: {
    borderRadius: 10,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#BBBBC5',
  },
  inputContainer: {
    gap: 5,
  },
  inputHeader: {
    color: '#EFF3F5',
    fontWeight: 'bold',
  },
  textInput: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 18,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#BBBBC5',
  },
  headerContainer: {
    flexDirection: 'row',
    width: '100%',
    padding: 12,
    justifyContent: 'space-between',
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  sectionTitle: {
    color: '#6A6A73',
    fontSize: 18,
    fontWeight: '600',
  },
  sectionSubTitle: {
    color: '#537FE7',
    fontSize: 13,
    fontWeight: '600',
  },
  toggleButton: {
    alignSelf: 'center',
  },
  calendar: {
    borderRadius: 10,
  },
  repeatContainer: {
    borderColor: '#BBBBC5',
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 12,
    marginBottom: 12,
  },
  justifyCenter: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'start',
  },
  createReminder: {
    width: '100%',
    height: 60,
    backgroundColor: '#537FE7',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createReminderText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  locationButtonsContainer : {
    flexDirection: 'row',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'gap',
    gap: 25,
  },
});

export default createReminderScreenDark;