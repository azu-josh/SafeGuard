import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import LoginC from './src/Component/LoginC';
import Register from './src/Component/Register';
import SplashScreen from './src/Component/SplashScreen';
import Sidebar from './src/Component/Sidebar';
import Layout from './src/Component/Layout';
import AuthContext, { AuthProvider } from './src/Component/AuthContext'; // Ensure AuthContext is imported
import MyTabs from './src/Component/ButtomTabNavigator'; // Import the BottomTabNavigator
import SecureVault from './src/Component/SecureVault'; // Import SecureVault
import HomeStackNavigator from './src/Component/Navigators/HomeStackNavigator'; // Import HomeStackNavigator
import AdBlockerComponent from './src/Component/AdBlocker';
import { ThemeProvider } from './src/Component/ThemeContext';
import ProfilePage from './src/Component/PAGES/ProfilePage'; // Ensure the correct path
import PrivacySettings from './src/Component/PAGES/PrivacySettings'; // Ensure the correct path
import NotificationSettings from './src/Component/PAGES/NotificationSetting'; // Import NotificationSettings
import AppPermissionsManager from './src/Component/PAGES/AppPermissionsManager';
import ManageAppPermissions from './src/Component/PAGES/ManageAppPermissions';
import UploadFile from './src/Component/UploadFile';

import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import SecurityScanner from './src/Component/PAGES/SecurityScanner';
import ChangePasswordScreen from './src/Component/PAGES/ChangePasswordscreen';




const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginC} />
    <Stack.Screen name="Register" component={Register} />
  </Stack.Navigator>
);




const AppStack = () => (
  <Drawer.Navigator
    initialRouteName="HomeDrawer"
    drawerContent={(props) => <Sidebar {...props} />}
    screenOptions={{ headerShown: false }}
  >
    <Drawer.Screen name="HomeDrawer" component={Layout} />
    <Drawer.Screen name="HomeStackNavigator" component={HomeStackNavigator} />
    <Drawer.Screen name="ChangePasswordscreen" component={ChangePasswordScreen} />
    <Drawer.Screen name="SecureVault" component={SecureVault} />
    <Drawer.Screen name="SecurityScanner" component={SecurityScanner} />
    <Drawer.Screen name="AdsBlocker" component={AdBlockerComponent} />
    <Drawer.Screen name="PrivacySettings" component={PrivacySettings} />
    <Drawer.Screen name="NotificationSettings" component={NotificationSettings} />
    <Drawer.Screen name="AppPermissionsManager" component={AppPermissionsManager} />
    <Drawer.Screen name="ManageAppPermissions" component={ManageAppPermissions} />
    <Drawer.Screen name="UploadFile" component={UploadFile} />
  </Drawer.Navigator>
);

const RootNavigator = () => {
  const { isAuthenticated } = React.useContext(AuthContext);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {

    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Simulate loading time
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="AppS" component={AppStack} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

const App = () => {
  return ( 
  <ActionSheetProvider>
    <AuthProvider>
      <ThemeProvider>
       
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </AuthProvider></ActionSheetProvider>
  );
};

export default App;
