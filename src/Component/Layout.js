// Layout.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated';
//import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Octicons'
import Home from './Home';
import ProfilePage from './PAGES/ProfilePage';
import Reports from './PAGES/Reports';
import PrivacySettings from './PAGES/PrivacySettings';
import ProtectionScreen from './ProtectionScreen';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();


const BottomTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Profile') {
          iconName = 'gear';
        } else if (route.name === 'ProtectionScreen') {
          iconName = 'shield-check';
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: '#add8e6',
      inactiveTintColor: 'gray',
      showLabel: false,
      style: {
        height: 70,
        borderTopWidth: 0,
        elevation: 10,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: -5 },
        shadowRadius: 20,
        paddingTop: 10,
        backgroundColor: '#fff',
        borderRadius: 15,
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
        shadowColor: '#000',
      },
    }}
  >
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="ProtectionScreen" component={ProtectionScreen} />
    <Tab.Screen name="Profile" component={ProfilePage} />
   
  </Tab.Navigator>
);

const Layout = () => {
  const [username, setUsername] = useState(''); // Initial state is empty
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get('http://192.168.210.183:5000/api/getUsername');
        setUsername(response.data.username); // Set username from response
      } catch (error) {
        console.error('Failed to fetch username:', error);
      }
    };

    fetchUsername();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#add8e6" />
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name="three-bars" size={24} style={styles.menuIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>WELCOME, JAK</Text>
      
      </View>
      
      <BottomTabNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 50, // Adjust for status bar height
    backgroundColor: '#add8e6', // Light blue background color for the app
  },
  navbar: {
    height: 60,
    backgroundColor: '#add8e6', // Light blue background color for the navbar
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderBottomWidth: 0,
    borderBottomColor: '#ddd',
  },
  menuIcon: {
    paddingLeft: 10,
    color: '#000',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    paddingRight:15,
   
  },
 

});

export default Layout;
