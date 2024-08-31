import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProtectionScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>AdGuard</Text>

        <View style={styles.statusContainer}>
          <Ionicons name="refresh" size={24} color="#fff" style={styles.refreshIcon} />
          <Text style={styles.statusTitle}>Protection is on</Text>
          <Text style={styles.statusSubtitle}>Safari Protection is on</Text>

          <TouchableOpacity style={styles.toggleButton}>
            <Ionicons name="checkmark-circle" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.iconRow}>
          <Ionicons name="shield-checkmark" size={30} color="#4CAF50" style={styles.icon} />
          <Ionicons name="shield-outline" size={30} color="#9E9E9E" style={styles.icon} />
          <Ionicons name="glasses-outline" size={30} color="#9E9E9E" style={styles.icon} />
        </View>

        <View style={styles.premiumContainer}>
          <Image 
            source={require('C:/Users/AZU/SafeGuard/src/icons/security-worker-svgrepo-com.png')}  // Replace with your image path
            style={styles.premiumImage} 
          />
          <View style={styles.premiumTextContainer}>
            <Text style={styles.premiumText}>Get stronger with Premium!</Text>
            <TouchableOpacity style={styles.premiumButton}>
              <Text style={styles.premiumButtonText}>Try for free</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 1,
  },
  statusContainer: {
    alignItems: 'center',
  },
  refreshIcon: {
    position:'absolute',
    top: 10,
    right: 10,
  },
  statusTitle: {
    color: '#000',
    fontSize: 22,
    fontWeight: '600',
  },
  statusSubtitle: {
    color: '#9E9E9E',
    fontSize: 16,
    marginBottom: 20,
  },
  toggleButton: {
    backgroundColor: '#4CAF50',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginBottom: 30,
  },
  icon: {
    marginHorizontal: 10,
  },
  premiumContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#121212',
    padding: 10,
    borderRadius: 10,
    width: '90%',
  },
  premiumImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  premiumTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  premiumText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 5,
  },
  premiumButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  premiumButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProtectionScreen;
