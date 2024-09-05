import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Home';
import LoginC from '../LoginC';
import Register from '../Register';
import SplashScreen from '../SplashScreen';
import SecureVault from '../SecureVault'; // Ensure SecureVault is imported
import SecurityScanner from '../PAGES/SecurityScanner';
import ChangePasswordScreen from '../PAGES/ChangePasswordscreen';
import PasswordManager from '../PAGES/PasswordManager';


const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={LoginC} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="SecureVault" component={SecureVault} /> {/* Register SecureVault */}
      <Stack.Screen name="SecurityScanner" component={SecurityScanner}/>
      <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen}
        options={{
          presentation: 'modal',
          headerShown: false,
          cardStyle: { backgroundColor: 'transparent' },
          cardOverlayEnabled: true,
          cardStyleInterpolator: ({ current: { progress } }) => ({
            cardStyle: {
              transform: [
                {
                  translateY: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1000, 0],
                  }),
                },
              ],
            },
            overlayStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
              }),
            },
          }),
        }}
      />
 <Stack.Screen name="PasswordManager" component={PasswordManager}/>
    </Stack.Navigator>

    
  );
};

export default HomeStackNavigator;
