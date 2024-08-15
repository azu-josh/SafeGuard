import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const DrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <DrawerItemList {...props} />
        <TouchableOpacity style={styles.logoutButton} onPress={() => props.navigation.navigate('Login')}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  logoutButton: {
    padding: 20,
    backgroundColor: 'red',
    borderRadius: 5,
    margin: 20,
  },
  logoutText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default DrawerContent;
