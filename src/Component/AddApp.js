import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const AddApp = () => {
  const [appName, setAppName] = useState('');
  const [appPermissions, setAppPermissions] = useState('');

  const handleAddApp = () => {
    // Here you would typically handle the logic to add the app data to your backend or state manager
    console.log('App Name:', appName);
    console.log('Permissions:', appPermissions);
    // Clear form
    setAppName('');
    setAppPermissions('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a New App</Text>
      <TextInput
        style={styles.input}
        value={appName}
        onChangeText={setAppName}
        placeholder="Enter App Name"
      />
      <TextInput
        style={styles.input}
        value={appPermissions}
        onChangeText={setAppPermissions}
        placeholder="Enter App Permissions"
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleAddApp}>
        <Text style={styles.buttonText}>Add App</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default AddApp;
