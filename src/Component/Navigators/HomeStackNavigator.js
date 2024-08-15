import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Home';
import LoginC from '../LoginC';
import Register from '../Register';
import SplashScreen from '../SplashScreen';
import SecureVault from '../SecureVault'; // Ensure SecureVault is imported

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={LoginC} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="SecureVault" component={SecureVault} /> {/* Register SecureVault */}
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
