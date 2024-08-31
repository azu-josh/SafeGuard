import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import axios from 'axios';

const ChangePasswordScreen = ({ navigation }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [currentPasswordValue, setCurrentPasswordValue] = useState('');
  const [newPasswordValue, setNewPasswordValue] = useState('');
  const [retypeNewPasswordValue, setRetypeNewPasswordValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Replace with actual JWT token
  const yourAuthToken = 'YOUR_JWT_TOKEN';
  console.log('JWT Token:', yourAuthToken);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const validatePasswordPolicy = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,30}$/;
    return passwordRegex.test(password);
  };

  const handleChangePassword = async () => {
    if (newPasswordValue !== retypeNewPasswordValue) {
      console.error('Passwords do not match');
      setErrorMessage('Passwords do not match.');
      return;
    }
  
    if (!validatePasswordPolicy(newPasswordValue)) {
      console.error('Password does not meet the required criteria');
      setErrorMessage('Password does not meet the required criteria.');
      return;
    }
  
    try {
      console.log('Sending password change request to API');
      const response = await axios.post('http://172.20.10.4:5000/auth/change-password', {
        currentPassword: currentPasswordValue,
        newPassword: newPasswordValue,
      }, {
        headers: {
          Authorization: `Bearer ${yourAuthToken}`, // Ensure you pass the JWT token for authentication
        },
      });
  
      console.log('API response:', response.data);
  
      if (response.status === 200) {
        console.log('Password changed successfully');
        Alert.alert('Success', 'Password changed successfully', [{ text: 'OK', onPress: () => navigation.goBack() }]);
      }
    } catch (error) {
      console.error('Error changing password:', error);
  
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
        setErrorMessage(error.response.data.message || 'Error changing password');
      } else if (error.request) {
        console.error('Error request:', error.request);
        setErrorMessage('No response received from server');
      } else {
        console.error('Error message:', error.message);
        setErrorMessage(error.message);
      }
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Change Password</Text>
        <Text style={styles.instruction}>
          Your password must be at least 8 characters long and include a combination of numbers, uppercase letters, and special characters.
        </Text>

        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Current password"
          secureTextEntry
          value={currentPasswordValue}
          onChangeText={setCurrentPasswordValue}
        />
        <TextInput
          style={styles.input}
          placeholder="New password"
          secureTextEntry
          value={newPasswordValue}
          onChangeText={setNewPasswordValue}
        />
        <TextInput
          style={styles.input}
          placeholder="Retype new password"
          secureTextEntry
          value={retypeNewPasswordValue}
          onChangeText={setRetypeNewPasswordValue}
        />

        <TouchableOpacity style={styles.checkboxContainer} onPress={toggleCheckbox}>
          <Icon
            name={isChecked ? "check" : "square"}
            size={24}
            color="#fff"
          />
          <Text style={styles.checkboxLabel}>Log out of other devices</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>Forgotten your password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  instruction: {
    color: '#a0a0a0',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 10,
    color: '#fff',
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    color: '#fff',
    marginLeft: 8,
  },
  forgotPassword: {
    color: '#1e88e5',
    textAlign: 'right',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1e88e5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ChangePasswordScreen;
