// src/Component/PAGES/PrivacySettings.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as LocalAuthentication from 'expo-local-authentication';
import { useAuth } from '../AuthContext';

const PrivacySettings = () => {
  
  const { faceIDEnabled, setFaceIDEnabled } = useAuth(); 
  const navigation = useNavigation();

  const toggleFaceID = async (enabled) => {
    if (enabled) {
      // Check if the device supports biometric authentication
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !isEnrolled) {
        Alert.alert('Error', 'Your device does not support Face ID or you have not enrolled any biometric data.');
        return;
      }

      // Authenticate the user
      const authResult = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to enable Face ID',
        fallbackLabel: 'Use Passcode',
      });

      if (authResult.success) {
        setFaceIDEnabled(true);
        // Activate local authentication for secure vault here
        Alert.alert('Success', 'Face ID enabled. Local authentication is now active.');
      } else {
        Alert.alert('Error', 'Authentication failed. Face ID has not been enabled.');
        setFaceIDEnabled(false);
      }
    } else {
      setFaceIDEnabled(false);
      // Deactivate local authentication for secure vault here
      Alert.alert('Face ID disabled. Local authentication has been turned off.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Settings</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>PHOTO VAULT</Text>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Change access code</Text>
        </TouchableOpacity>
        <View style={styles.option}>
          <Text style={styles.optionText}>Use Face ID</Text>
          <Switch
            value={faceIDEnabled}
            onValueChange={(value) => toggleFaceID(value)}
          />
        </View>

        <Text style={styles.sectionTitle}>PERSONAL PRIVACY</Text>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Data Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1c1c1c',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#1c1c1c',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1c1c1c',
  },
  sectionTitle: {
    fontSize: 16,
    color: '#fff',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1c1c1c',
  },
  optionText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default PrivacySettings;
