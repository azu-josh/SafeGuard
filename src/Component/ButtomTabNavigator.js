import * as React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Octicon from 'react-native-vector-icons/Octicons';
import Home from './Home';
import Reports from './Reports';
import AddApp from './AddApp';
import ProfilePage from './PAGES/ProfilePage'; // Ensure the path is correct
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

function CustomProfileButton({ children, onPress }) {
  return (
    <TouchableOpacity
      style={{
        top: -30, // Adjusted to lift the profile icon slightly
        justifyContent: 'center',
        alignItems: 'center',
        ...styles.shadow,
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: '#E1E1E1', // Changed for better visibility
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
}

function MyTabs() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            const iconName = focused ? 'home' : 'home-outline';
            return <Octicon name={iconName} size={size} color={color} />;
          } else if (route.name === 'Reports') {
            const iconName = focused ? 'file-text' : 'file-text-outline';
            return <Octicon name={iconName} size={size} color={color} />;
          } else if (route.name === 'AddApp') {
            const iconName = focused ? 'plus-circle' : 'plus-circle-outline';
            return <Octicon name={iconName} size={size} color={color} />;
          }
        },
        tabBarButton: (props) => {
          if (route.name === 'Profile') {
            return (
              <CustomProfileButton {...props} onPress={() => navigation.navigate('ProfilePage')}>
                <Image
                  source={{ uri: 'https://www.example.com/path/to/your/profile.jpg' }} // Replace with your image URL
                  style={{ width: 60, height: 60, borderRadius: 30 }} // Adjusted size for uniformity
                />
              </CustomProfileButton>
            );
          }
          return <TouchableOpacity {...props} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#add8e6',
        inactiveTintColor: 'gray',
        showLabel: false, // Set to false to hide labels by default
        style: styles.tabBar
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Reports" component={Reports} />
      <Tab.Screen name="Profile" component={ProfilePage} />
      <Tab.Screen name="AddApp" component={AddApp} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  tabBar: {
    height: 70,
    borderTopWidth: 0,
    elevation: 10,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -5 },
    shadowRadius: 20,
    paddingTop: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    shadowColor: '#000',
  }
});

export default MyTabs;
