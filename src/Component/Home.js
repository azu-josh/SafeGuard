import React, { useState, useEffect, useRef } from 'react';
import { 
  View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, 
  ScrollView, RefreshControl, Dimensions, Linking, Modal 
} from 'react-native';

import ScanResults from './ScanResults'; // Ensure the path is correct

const AppPermissionsImage = require('../Assets/App Permission.jpg');
const PrivacyScannerImage = require('../Assets/Privacy Scanner.jpg');
const AdsBlockerImage = require('../Assets/Ad Blocker.jpg');
const SecureVaultImage = require('../Assets/Secure Vault.jpg');

const { width } = Dimensions.get('window');

const liveImages = [
  { url: 'https://storage.googleapis.com/ibw-blog/media/d3/286a1604222549e64a43134867fa58.png', title: 'Practice Safe Online Behaviour', link: 'https://staysafeonline.org/resources/online-safety-basics/', description: 'Learn about the best practices to stay safe online.' },
  { url: 'https://storage.googleapis.com/ibw-blog/media/a6/ed987f6df274eec1b14eecd44b28b4.png', title: 'THE PASSWORD GAME', link: 'https://www.educ.cam.ac.uk/services/it/passwords/create-strong-password/#:~:text=A%20good%20password%20is%20at,a%20family%20member%20or%20friend.', description: 'Creating strong passwords is key to safeguarding your online accounts. Use a mix of letters, numbers, and symbols, and avoid using easily guessable information like names or birthdays..' },
  { url: 'https://storage.googleapis.com/ibw-blog/media/42/9b9d76794bc839d62c2618cfe6c283.png', title: 'Frequent Back Up', link: 'https://www.fdmgroup.com/news-insights/what-is-cloud-backup-and-why-is-it-important-for-your-business/#:~:text=A%20cloud%20backup%20acts%20as,the%20type%20of%20service%20used.', description: 'Regularly backing up your data ensures that you can recover important files in case of a cyber attack or hardware failure. Consider using the SECURE VAULT cloud storage for Media backups.' },
  { url: 'https://www.breachsecurenow.com/wp-content/uploads/2018/02/300-X-250.jpg', title: 'POST RESPONSIBILY', link: 'https://www.kaspersky.com/resource-center/preemptive-safety/top-10-preemptive-safety-rules-and-what-not-to-do-online', description: 'Be mindful of what you share online. Avoid posting sensitive personal information, and always think before you post, as once its online, its there forever.' },
  { url: 'https://assets.f-secure.com/i/illustrations/password-generator-hero.png', title: 'IDENTITY THEFT CHECKER', link: 'https://www.kaspersky.com/resource-center/preemptive-safety/top-10-preemptive-safety-rules-and-what-not-to-do-online', description: 'Identity theft can have serious consequences. Regularly monitor your accounts and use identity theft protection tools to safeguard your personal information.' },
  { url: 'https://i0.wp.com/dayoneapp.com/wp-content/uploads/2023/06/day-one-encryption.png?resize=1024%2C1024&quality=80&ssl=1', title: 'Asymmetric and Symmetric Encryption', link: 'https://preyproject.com/blog/types-of-encryption-symmetric-or-asymmetric-rsa-or-aes#:~:text=Symmetric%20encryption%20involves%20using%20a,to%20encrypt%20and%20decrypt%20data.', description: 'Encryption is the cornerstone of data security. Symmetric encryption uses a single key for both encryption and decryption, while asymmetric encryption uses a pair of keys, enhancing security for sensitive communications.' },
];

const Home = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleImagePress = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const handleReadMore = () => {
    if (selectedImage?.link) {
      Linking.openURL(selectedImage.link).catch((err) => console.error("Failed to open URL:", err));
      setModalVisible(false);
    }
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
        <View style={styles.homeGrid}>
          <View style={styles.homeCardWrapper}>
            <TouchableOpacity style={styles.homeCard} onPress={() => navigation.navigate('SecurityScanner')}>
              <Image source={PrivacyScannerImage} style={styles.homeCardImage} />
            </TouchableOpacity>
            <Text style={styles.homeCardTitle}>PRIVACY SCANNER</Text>
          </View>
          <View style={styles.homeCardWrapper}>
            <TouchableOpacity style={styles.homeCard} onPress={() => navigation.navigate('PasswordManager')}>
              <Image source={AppPermissionsImage} style={styles.homeCardImage} />
            </TouchableOpacity>
            <Text style={styles.homeCardTitle}>PASSWORD MANAGER</Text>
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
            <TouchableOpacity key={index} style={styles.liveImageWrapper} onPress={() => handleImagePress(image)}>
              <Image source={{ uri: image.url }} style={styles.liveImage} />
              <Text style={styles.liveImageTitle}>{image.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{selectedImage?.title}</Text>
            <Text style={styles.modalDescription}>{selectedImage?.description}</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={handleReadMore}>
                <Text style={styles.modalButtonText}>Read More</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    width: width / 2 - 30,
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
  // Modal styles
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#007bff',
    marginHorizontal: 5,
    flex: 1,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Home;
