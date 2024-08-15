import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PrivacySettings from './PrivacySettings';
import Icon from 'react-native-vector-icons/Ionicons'; 

const ProfileImage = require('../PAGES/profile.jpeg'); // Ensure the path to the profile image is correct

const ProfilePage = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
     
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ChangePassword')}>
          <Icon name="lock-closed-outline" size={20} style={styles.icon} />
          <Text style={styles.optionText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('PrivacySettings')}>
          <Icon name="shield-outline" size={20} style={styles.icon} />
          <Text style={styles.optionText}>Privacy Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('NotificationSettings')}>
          <Icon name="notifications-outline" size={20} style={styles.icon} />
          <Text style={styles.optionText}>Notification Settings</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>More Options</Text>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Help')}>
          <Icon name="help-circle-outline" size={20} style={styles.icon} />
          <Text style={styles.optionText}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('About')}>
          <Icon name="information-circle-outline" size={20} style={styles.icon} />
          <Text style={styles.optionText}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Logout')}>
          <Icon name="exit-outline" size={20} style={styles.icon} />
          <Text style={styles.optionText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileEmail: {
    fontSize: 16,
    color: 'gray',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  icon: {
    marginRight: 10,
    color: '#add8e6',  // Set color according to your design preference
  },
  optionText: {
    fontSize: 16,
  },
});

export default ProfilePage;
