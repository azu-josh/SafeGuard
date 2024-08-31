import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ImageBackground, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BlurView } from 'expo-blur';
import AuthContext from '../Component/AuthContext';

const { width } = Dimensions.get('window');

const usernameRegex = /^(?!.*[-_]{2,})(?!.*[-_]$)[a-zA-Z0-9-_]{3,20}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,30}$/;

const Register = ({ navigation }) => {
  const { register } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [suggestedUsername, setSuggestedUsername] = useState('');

  const handlePasswordChange = (password) => {
    setPassword(password);
    if (passwordRegex.test(password)) {
      setPasswordStrength(3);
    } else if (password.length >= 8) {
      setPasswordStrength(2);
    } else {
      setPasswordStrength(1);
    }
  };

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
    } else if (!usernameRegex.test(username)) {
      setError('Invalid username');
    } else if (!emailRegex.test(email)) {
      setError('Invalid email address');
    } else if (!passwordRegex.test(password)) {
      setError('Password must be 8-30 characters long and contain at least one uppercase letter and one number.');
    } else {
      setLoading(true);
      try {
        await register(username, email, password);
        setError('');
        setLoading(false);
        navigation.navigate('Login');
      } catch (err) {
        if (err.response && err.response.data.suggestedUsername) {
          setSuggestedUsername(err.response.data.suggestedUsername);
        }
        setError(err.response ? err.response.data.message : 'Error registering user. Please try again.');
        setLoading(false);
      }
    }
  };

  return (
    <ImageBackground source={require('../Assets/WhatsApp Image 2024-05-07 at 02.23.22 (1).jpeg')} style={styles.registerPage}>
      <BlurView intensity={50} style={styles.wrapper}>
        {loading && (
          <View style={styles.spinner}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        )}
        <Text style={styles.title}>SIGN UP</Text>
        <View style={styles.inputBox}>
          <Icon name="user" size={20} color="#fff" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#fff"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>
        {suggestedUsername && (
          <View style={styles.suggestion}>
            <Text style={styles.suggestionText}>Suggested Username: {suggestedUsername}</Text>
          </View>
        )}
        <View style={styles.inputBox}>
          <Icon name="envelope" size={20} color="#fff" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#fff"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputBox}>
          <Icon name="lock" size={20} color="#fff" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#fff"
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>
        <View style={styles.passwordStrengthContainer}>
          <View style={[styles.passwordStrengthBar, passwordStrength >= 1 && styles.passwordStrengthWeak]} />
          <View style={[styles.passwordStrengthBar, passwordStrength >= 2 && styles.passwordStrengthMedium]} />
          <View style={[styles.passwordStrengthBar, passwordStrength >= 3 && styles.passwordStrengthStrong]} />
        </View>
        <View style={styles.inputBox}>
          <Icon name="lock" size={20} color="#fff" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#fff"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        <View style={styles.registerLink}>
          <Text style={styles.registerText}>
            Already have an account?{' '}
            <Text style={styles.registerAction} onPress={() => navigation.navigate('Login')}>
              Login
            </Text>
          </Text>
        </View>
      </BlurView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  registerPage: {
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
  spinner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    zIndex: 1,
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    color: 'white',
    marginBottom: 20,
    fontWeight: 'bold',
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
    paddingLeft: 40,
  },
  icon: {
    position: 'absolute',
    left: 10,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  passwordStrengthContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  passwordStrengthBar: {
    height: 5,
    width: '30%',
    backgroundColor: 'gray',
  },
  passwordStrengthWeak: {
    backgroundColor: 'red',
  },
  passwordStrengthMedium: {
    backgroundColor: 'orange',
  },
  passwordStrengthStrong: {
    backgroundColor: 'green',
  },
  suggestion: {
    marginBottom: 10,
  },
  suggestionText: {
    color: 'yellow',
    fontSize: 14,
  },
  error: {
    color: 'red',
    marginVertical: 10,
    fontSize: 14,
    textAlign: 'center',
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
});

export default Register;
