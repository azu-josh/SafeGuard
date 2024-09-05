import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as LocalAuthentication from 'expo-local-authentication';
import useStorage from '../PAGES/UseStorage'; // Assuming the useStorage hook is in the same directory

const PasswordManager = () => {
  const [serviceName, setServiceName] = useState('');
  const [password, setPassword] = useState('');
  const [passwords, setPasswords] = useState([]);
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { getItem, saveItem, removeItem, getAllKeys, multiGet } = useStorage();

  useFocusEffect(
    React.useCallback(() => {
      authenticateUser(); // Trigger authentication every time the screen is focused
    }, [])
  );

  const authenticateUser = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) {
      Alert.alert('Error', 'Your device does not support local authentication');
      return;
    }

    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      Alert.alert('Error', 'No biometrics or PIN/Pattern has been set up on this device');
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate to access Password Manager',
    });

    if (result.success) {
      setIsAuthenticated(true);
      loadPasswords(); // Load passwords after successful authentication
    } else {
      setIsAuthenticated(false);
      Alert.alert('Authentication failed', 'You will not be able to view your passwords.');
    }
  };

  const loadPasswords = async () => {
    const keys = await getAllKeys();
    const passwordData = await multiGet(keys);
    const passwordArray = passwordData.map(([key, value]) => ({
      service: key,
      password: JSON.parse(value),
    }));
    setPasswords(passwordArray);
  };

  const handleSavePassword = async () => {
    if (serviceName.trim() === '' || password.trim() === '') {
      Alert.alert('Error', 'Please enter a service name and password');
      return;
    }

    await saveItem(serviceName, { password });
    setServiceName('');
    setPassword('');
    loadPasswords();
    Alert.alert('Success', 'Password saved successfully');
  };

  const handleDeletePassword = async (service) => {
    await removeItem(service);
    loadPasswords();
    Alert.alert('Success', 'Password deleted successfully');
  };

  const togglePasswordVisibility = (service) => {
    setVisiblePasswords((prevVisiblePasswords) => ({
      ...prevVisiblePasswords,
      [service]: !prevVisiblePasswords[service],
    }));
  };

  const renderPasswordItem = ({ item }) => (
    <View style={styles.passwordItem}>
      <Text style={styles.passwordService}>{item.service}</Text>
      <TouchableOpacity onPress={() => togglePasswordVisibility(item.service)}>
        <Text style={styles.passwordValue}>
          {visiblePasswords[item.service] ? item.password.password : '**********'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeletePassword(item.service)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Please authenticate to access the Password Manager</Text>
        <TouchableOpacity style={styles.authButton} onPress={authenticateUser}>
          <Text style={styles.authButtonText}>Authenticate</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Password Manager</Text>
      <TextInput
        style={styles.input}
        placeholder="Service Name (e.g., Google)"
        value={serviceName}
        onChangeText={setServiceName}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSavePassword}>
        <Text style={styles.saveButtonText}>Save Password</Text>
      </TouchableOpacity>

      <FlatList
        data={passwords}
        keyExtractor={(item) => item.service}
        renderItem={renderPasswordItem}
        contentContainerStyle={styles.passwordList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  passwordList: {
    paddingBottom: 20,
  },
  passwordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  passwordService: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  passwordValue: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
  },
  authButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 50,
  },
  authButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default PasswordManager;
