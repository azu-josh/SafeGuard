// src/Component/PAGES/PrivacySettings.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PrivacySettings = () => {
  const [faceIDEnabled, setFaceIDEnabled] = useState(false);
  const navigation = useNavigation();

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
            onValueChange={setFaceIDEnabled}
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
