import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
//import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Octicons'
import { useTheme } from './ThemeContext';

const Sidebar = ({ navigation }) => {
  const { darkMode, toggleDarkMode } = useTheme();
  const styles = darkMode ? darkStyles : lightStyles;

  return (
    <View style={styles.sidebar}>
      <TouchableOpacity style={styles.sidebarItem} onPress={() => navigation.navigate('Home')}>
        <Icon name="home" size={24} style={styles.sidebarIcon} />
        <Text style={styles.sidebarText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sidebarItem} onPress={() => navigation.navigate('Reports')}>
        <Icon name="graph" size={24} style={styles.sidebarIcon} />
        <Text style={styles.sidebarText}>Analytics</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sidebarItem} onPress={() => navigation.navigate('Profile')}>
        <Icon name="gear" size={24} style={styles.sidebarIcon} />
        <Text style={styles.sidebarText}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sidebarItem} onPress={() => navigation.navigate('RateUs')}>
        <Icon name="star" size={24} style={styles.sidebarIcon} />
        <Text style={styles.sidebarText}>Rate Us</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sidebarItem} onPress={() => navigation.navigate('AboutSafeGuard')}>
        <Icon name="info" size={24} style={styles.sidebarIcon} />
        <Text style={styles.sidebarText}>About SafeGuard</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sidebarItem} onPress={() => { /* Handle logout */ }}>
        <Icon name="sign-out" size={24} style={styles.sidebarIcon} />
        <Text style={styles.sidebarText}>Logout</Text>
      </TouchableOpacity>
      <View style={styles.sidebarItem}>
        <Icon name="moon" size={24} style={styles.sidebarIcon} />
        <Text style={styles.sidebarText}>{darkMode ? "Light Mode" : "Dark Mode"}</Text>
        <Switch
          value={darkMode}
          onValueChange={toggleDarkMode}
          style={styles.darkModeToggle}
        />
      </View>
    </View>
  );
};

const commonStyles = {
  sidebar: {
    flex: 1,
    padding: 20,
    paddingTop: 170,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
  },
  sidebarIcon: {
    marginRight: 20,
  },
  sidebarText: {
    fontSize: 16,
  },
};

const lightStyles = StyleSheet.create({
  ...commonStyles,
  sidebar: {
    ...commonStyles.sidebar,
    backgroundColor: '#fff',
  },
  sidebarIcon: {
    ...commonStyles.sidebarIcon,
    color: 'lightblue',
  },
  sidebarText: {
    ...commonStyles.sidebarText,
    color: '#000',
  },
  darkModeToggle: {
    marginLeft: 'auto',
  },
});

const darkStyles = StyleSheet.create({
  ...commonStyles,
  sidebar: {
    ...commonStyles.sidebar,
    backgroundColor: '#000',
  },
  sidebarIcon: {
    ...commonStyles.sidebarIcon,
    color: 'lightblue',
  },
  sidebarText: {
    ...commonStyles.sidebarText,
    color: '#fff',
  },
  darkModeToggle: {
    marginLeft: 'auto',
  },
});

export default Sidebar;
