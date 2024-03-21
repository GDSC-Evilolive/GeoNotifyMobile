import {StyleSheet} from 'react-native';

const EditProfileScreenLight = StyleSheet.create({
  title: {
    color: '#181823',
    fontSize: 25,
    fontWeight: '700',
  },
  container: {
    backgroundColor: '#EFF3F5',
    paddingHorizontal: 35,
    gap: 25,
  },
  textInput: {
    height: 50,
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 18,
    fontWeight: '600',
  },
  updateButton: {
    height: 50,
    width: '100%',
    backgroundColor: '#537FE7',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default EditProfileScreenLight;
