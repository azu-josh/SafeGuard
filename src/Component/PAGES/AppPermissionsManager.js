import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

const ManageAppPermissions = () => {
  const [permissions, setPermissions] = useState({});
  const navigation = useNavigation();
  const { appId } = useRoute().params;

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/permissions/${appId}`);
        setPermissions(response.data);  // Assume permissions are grouped and include usage stats
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch permissions');
      }
    };
    fetchPermissions();
  }, [appId]);

  const togglePermissionGroup = async (group) => {
    const updatedPermissions = { ...permissions, [group.name]: { ...group, isEnabled: !group.isEnabled } };
    try {
      await axios.put(`http://localhost:5000/api/permissions/${appId}`, { permissions: updatedPermissions });
      setPermissions(updatedPermissions);
    } catch (error) {
      Alert.alert('Error', 'Failed to update permissions');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Octicons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Permissions</Text>
      </View>
      <View style={styles.container}>
        {Object.entries(permissions).map(([groupName, groupDetails]) => (
          <View key={groupName} style={styles.permissionItem}>
            <Text style={styles.permissionText}>{groupName}</Text>
            <Text style={styles.usageText}>Used {groupDetails.usageCount} times</Text>
            <Switch
              value={groupDetails.isEnabled}
              onValueChange={() => togglePermissionGroup({ name: groupName, ...groupDetails })}
            />
            {groupDetails.usageCount > 10 && (
              <Octicons name="alert" size={24} color="red" />
            )}
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
  usageText: {
    fontSize: 14,
    color: '#aaa',
    marginRight: 10,
  },
});

export default ManageAppPermissions;
