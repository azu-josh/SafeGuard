import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import AuthContext from '../Component/AuthContext';

const { width } = Dimensions.get('window');

const LoginC = ({ navigation }) => {
  const { login, isAuthenticated } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await login(username, password);
      if (isAuthenticated) {
        navigation.navigate('App');
      }
    } catch (err) {
      setError('Error logging in. Please try again.');
    }
  };

  return (
    <ImageBackground source={require('../Assets/WhatsApp Image 2024-05-07 at 02.23.22 (1).jpeg')} style={styles.loginPage}>
      <BlurView intensity={50} style={styles.wrapper}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#fff"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#fff"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <View style={styles.rememberForgot}>
          <Text style={styles.remember}>Remember me</Text>
          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
        {error && <Text style={styles.error}>{error}</Text>}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.registerLink}>
          <Text style={styles.registerText}>
            Haven't signed up?{' '}
            <Text style={styles.registerAction} onPress={() => navigation.navigate('Register')}>
              Sign up
            </Text>
          </Text>
        </View>
      </BlurView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  loginPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  wrapper: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    color: 'white',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    color: 'white',
    marginBottom: 20,
  },
  inputBox: {
    position: 'relative',
    marginVertical: 10,
    width: '100%',
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
    marginVertical: 10,
    width: '100%',
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
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 25,
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
    textDecorationLine: 'none',
  },
  registerAction: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
  error: {
    color: 'red',
    marginVertical: 10,
  },
});

export default LoginC;
