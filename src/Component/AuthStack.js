import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginC from '../LoginC'; // Adjust path as needed
import Register from '../Register'; // Adjust path as needed

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginC} />
    <Stack.Screen name="Register" component={Register} />
  </Stack.Navigator>
);

export default AuthStack;
