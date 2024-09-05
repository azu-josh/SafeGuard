import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    // Handle logout functionality
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Text style={styles.menuIcon}>☰</Text>
      </TouchableOpacity>
      <View style={styles.logoTitleContainer}>
        <Image source={require('../Assets/App logo.jpg')} style={styles.logo} />
        <Text style={styles.title}>Welcome, USERNAME</Text>
      </View>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.logoutButton}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1000,
  },
  menuIcon: {
    fontSize: 24,
    color: '#000',
  },
  logoTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    color: '#000',
    flex: 1,
    textAlign: 'center',
  },
  searchBar: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 40,
    width: 150,
  },
  logoutButton: {
    fontSize: 16,
    color: '#000',
    marginLeft: 10,
  },
});

export default Navbar;
