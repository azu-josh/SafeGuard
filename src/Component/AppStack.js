import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeStackNavigator from './Navigators/HomeStackNavigator'; // Adjust path as needed
import Profile from './Profile.js'; // Example screen, adjust path as needed

import Sidebar from './Sidebar.js'; // Custom drawer content, adjust path as needed
import PrivacySettings from './PAGES/PrivacySettings.js';

const Drawer = createDrawerNavigator();

const AppStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName="HomeStackNavigator"
      drawerContent={(props) => <Sidebar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="HomeStackNavigator" component={HomeStackNavigator} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
};

export default AppStack;
