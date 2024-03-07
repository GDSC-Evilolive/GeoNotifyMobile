import { StyleSheet } from 'react-native';

export const ForgotPasswordDark = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 30,
        backgroundColor: '#181823',
        textAlign: 'left'
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#EFF3F5',
        textAlign: 'left'
      },
      textForm: {
        fontSize: 16,
        fontWeight: '600',
        color: '#6A6A73',
        marginBottom: 8
      },
      input: {
        borderWidth: 1,
        borderColor: '#BBBBC5',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        width: '100%',
        backgroundColor: '#FFFFFF'
      },
      error: {
        color: 'red',
        marginBottom: 20,
      },
      button: {
        backgroundColor: '#537FE7',
        padding: 10,
        borderRadius: 10,
        width: '100%',
        height: 48,
        justifyContent: 'center',
        marginBottom: 10
      },
      buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
      },
});