import React, { useState, useEffect, useRef } from 'react';
import { 
  View, Text, Image, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, 
  ScrollView, RefreshControl, Dimensions 
} from 'react-native';
import ScanResults from './ScanResults'; // Ensure the path is correct

const AppPermissionsImage = require('../Assets/App Permission.jpg');
const PrivacyScannerImage = require('../Assets/Privacy Scanner.jpg');
const AdsBlockerImage = require('../Assets/Ad Blocker.jpg');
const SecureVaultImage = require('../Assets/Secure Vault.jpg');

const { width } = Dimensions.get('window');

const liveImages = [
  { url: 'https://storage.googleapis.com/ibw-blog/media/d3/286a1604222549e64a43134867fa58.png', title: 'Practice Safe Online Behaviour' },
  { url: 'https://storage.googleapis.com/ibw-blog/media/a6/ed987f6df274eec1b14eecd44b28b4.png', title: 'THE PASSWORD GAME' },
  { url: 'https://storage.googleapis.com/ibw-blog/media/42/9b9d76794bc839d62c2618cfe6c283.png', title: 'Frequent Back Up' },
  { url: 'https://www.breachsecurenow.com/wp-content/uploads/2018/02/300-X-250.jpg', title: 'POST RESPONSIBILY' },
  { url: 'https://assets.f-secure.com/i/illustrations/password-generator-hero.png', title: 'IDENTITY THEFT CHECKER' },
  { url: 'https://i0.wp.com/dayoneapp.com/wp-content/uploads/2023/06/day-one-encryption.png?resize=1024%2C1024&quality=80&ssl=1', title: 'Asymmetric and Symmetric Encryption' },
];

const Home = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate a network request or any refresh logic here
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <ScrollView
      style={styles.homeContainer}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <ScanResults />
      <View style={styles.homeContent}>
        <View style={styles.homeGrid}>
          <View style={styles.homeCardWrapper}>
            <TouchableOpacity style={styles.homeCard} onPress={() => navigation.navigate('AppPermissionsManager')}>
              <Image source={AppPermissionsImage} style={styles.homeCardImage} />
            </TouchableOpacity>
            <Text style={styles.homeCardTitle}>APP PERMISSIONS MANAGER</Text>
          </View>
          <View style={styles.homeCardWrapper}>
            <TouchableOpacity style={styles.homeCard} onPress={() => navigation.navigate('SecurityScanner')}>
              <Image source={PrivacyScannerImage} style={styles.homeCardImage} />
            </TouchableOpacity>
            <Text style={styles.homeCardTitle}>PRIVACY SCANNER</Text>
          </View>
        </View>
        <View style={styles.homeGrid}>
          <View style={styles.homeCardWrapper}>
            <TouchableOpacity style={styles.homeCard} onPress={() => navigation.navigate('AdsBlocker')}>
              <Image source={AdsBlockerImage} style={styles.homeCardImage} />
            </TouchableOpacity>
            <Text style={styles.homeCardTitle}>AD'S BLOCKER</Text>
          </View>
          <View style={styles.homeCardWrapper}>
            <TouchableOpacity style={styles.homeCard} onPress={() => navigation.navigate('SecureVault')}>
              <Image source={SecureVaultImage} style={styles.homeCardImage} />
            </TouchableOpacity>
            <Text style={styles.homeCardTitle}>SECURE VAULT</Text>
          </View>
        </View>
        <View style={styles.sectionDivider}></View>
        <View style={styles.riskContainer}>
          <Text style={styles.riskText}>RISK PERCENTAGE 30%</Text>
          <TouchableOpacity style={styles.fixButton}>
            <Text style={styles.fixButtonText}>FIX NOW!</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.liveImagesContainer}>
        <Text style={styles.liveImagesTitle}>Why Keep Online Data Safe?</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={scrollViewRef}
        >
          {liveImages.map((image, index) => (
            <View key={index} style={styles.liveImageWrapper}>
              <Image source={{ uri: image.url }} style={styles.liveImage} />
              <Text style={styles.liveImageTitle}>{image.title}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    padding: 10,
    paddingTop: 20,
  },
  homeContent: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  homeGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  homeCardWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 10,
    width: width / 2 - 30, // Adjusted width for 2 columns
  },
  homeCard: {
    backgroundColor: 'transparent',
    padding: 0,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    height: 150,
    width: '100%',
    overflow: 'hidden',
    marginBottom: 10,
  },
  homeCardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  homeCardTitle: {
    fontWeight: 'normal',
    marginTop: 10,
    textAlign: 'center',
  },
  sectionDivider: {
    marginVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
  },
  riskContainer: {
    marginTop: 15,
    textAlign: 'center',
  },
  riskText: {
    marginBottom: 10,
  },
  fixButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 4,
  },
  fixButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  liveImagesContainer: {
    marginTop: 20,
  },
  liveImagesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  liveImageWrapper: {
    alignItems: 'center',
    marginRight: 10,
  },
  liveImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 5,
  },
  liveImageTitle: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default Home;
