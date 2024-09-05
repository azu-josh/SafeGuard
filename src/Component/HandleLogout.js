import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from 'react';
import { AuthContext } from './src/Component/AuthContext';

const handleLogout = async () => {
  try {
    await AsyncStorage.removeItem('userToken'); // Assuming 'userToken' is your stored token key
    const { setUser } = useContext(AuthContext);
    setUser(null); // Clear user context
    
    // Navigate to login screen or reset navigation stack
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginC' }],
    });
  } catch (error) {
    console.error('Logout failed', error);
    Alert.alert('Logout Error', 'Unable to logout at this time, please try again.');
  }
};
