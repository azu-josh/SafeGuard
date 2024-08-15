import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  loginPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  wrapper: {
    width: 420,
    backgroundColor: 'transparent',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    color: 'white',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    backdropFilter: 'blur(30px)',
    borderRadius: 10,
    padding: 30,
  },
  title: {
    fontSize: 36,
    textAlign: 'center',
    color: 'white',
  },
  inputBox: {
    position: 'relative',
    marginVertical: 15,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'transparent',
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 2,
    borderRadius: 25,
    fontSize: 16,
    color: '#fff',
    paddingLeft: 20,
  },
  rememberForgot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 14.5,
    marginVertical: 20,
  },
  remember: {
    color: '#fff',
  },
  forgot: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '700',
  },
  registerLink: {
    fontSize: 14.5,
    textAlign: 'center',
    marginVertical: 20,
  },
  registerText: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
});
