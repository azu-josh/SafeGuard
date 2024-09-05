import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ManageAppPermissions = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { appId } = route.params;

  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    async function fetchPermissions() {
      try {
        const response = await axios.get(`http://localhost:5000/api/permissions/${appId}`);
        setPermissions(response.data.permissions);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch permissions');
      }
    }
    fetchPermissions();
  }, [appId]);

  const togglePermission = async (permissionName, isEnabled) => {
    try {
      const updatedPermissions = permissions.map(perm =>
        perm.permissionName === permissionName ? { ...perm, isEnabled: !isEnabled } : perm
      );
      await axios.put(`http://localhost:5000/api/permissions/${appId}`, {
        permissions: updatedPermissions
      }, {
        headers: { Authorization: 'Bearer your_jwt_token_here' }
      });
      setPermissions(updatedPermissions);
    } catch (error) {
      Alert.alert('Error', 'Failed to update permissions');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Permissions</Text>
      </View>
      <View style={styles.container}>
        {permissions.map(({ permissionName, isEnabled }) => (
          <View key={permissionName} style={styles.permissionItem}>
            <Text style={styles.permissionText}>{permissionName}</Text>
            <Switch
              value={isEnabled}
              onValueChange={() => togglePermission(permissionName, isEnabled)}
            />
          </View>
        ))}
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
    backgroundColor: '#2d2d2d',
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
  permissionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  permissionText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default ManageAppPermissions;
