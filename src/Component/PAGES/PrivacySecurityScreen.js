import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PasswordSecurityScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Password and security</Text>
      <Text style={styles.subtitle}>Login & recovery</Text>
      <Text style={styles.description}>
        Manage your passwords, login preferences and recovery methods.
      </Text>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ChangePasswordScreen')}>
        <Text style={styles.optionText}>Change password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('TwoFactorAuthentication')}>
        <Text style={styles.optionText}>Two-factor authentication</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('SavedLogin')}>
        <Text style={styles.optionText}>Saved login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 60, // Adjust based on the notch
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#aaaaaa',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#aaaaaa',
    marginBottom: 30,
  },
  option: {
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  optionText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default PasswordSecurityScreen;
