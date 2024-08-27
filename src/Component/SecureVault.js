import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { useActionSheet } from '@expo/react-native-action-sheet';
import AWS from 'aws-sdk';
import * as LocalAuthentication from 'expo-local-authentication'

const SecureVault = () => {
  const navigation = useNavigation();
  const { showActionSheetWithOptions } = useActionSheet();
  const [photos, setPhotos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [isBiometricsSupported, setIsBiometricsSupported] = useState(false);



  [
    {
      "AllowedHeaders": ["*"],
      "AllowedMethods": ["GET", "POST", "PUT"],
      "AllowedOrigins": ["*"],
      "ExposeHeaders": []
    }
  ]
  //for my face id detection and fingerpring config
  useEffect(()=>{
    (async ()=> {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricsSupported(compatible);
    })();
  });
const fallBackToDefualtAuth = () => {
  console.log ('fall back to password authentication');

};
const alertComponent = (title, mess, btnTxt, btnFunc) => {
  return Alert.alert(title, mess, [
    {
      text:btnTxt,
      onPress: btnFunc,
    }
  ])
}

const handleBiometricAuth = async ()=> {
//check if it supports bio
const isBiometricAvailable =await LocalAuthentication.hasHardwareAsync();
//Go back if Bio is missing
if (!isBiometricAvailable)
  return alertComponet (
'KINDLY ENTER PIN TO CONTINUE',
'FACE ID OR FINGERPRINT ISNT SUPPORTED',
'Ok',
()=>fallBackToDefualtAuth()
);
//Check what Bio is Available 
let supportedBiometrics;
is (isBiometricAvailable)
supportedBiometrics = await LocalAuthentication.supportedAuthenticationTypesAsync()

//check saved Bio locally
const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
if (!savedBiometrics)
  return alertComponent(
'Biometric Not Found',
'Please use PIN to login',
'Ok',
()=> fallBackToDefualtAuth()
);
//authenicate with Bio
const biometricAuth = await LocalAuthentication.authenticateAsync({
  promptMessage: 'Login with FcaeID or TouchID',
  cancelLabel: 'cancel',
  disableDeviceFallback: true,
});
//  Log the to SecureVAULT on successs
if (biometricAuth) {TwoButtonAlet()};
console.log ({isBiometricAvailable});
console.log ({supportedBiometrics});
console.log({savedBiometrics});
console.log ({biometricAuth});
};

  // Configure AWS SDK
  const s3 = new AWS.S3({
    accessKeyId: 'AKIATOMKLEFOGOJ3SRVO', // Replace with your actual access key, these are suposed to be encrypted to avoid hacking
    secretAccessKey: 'cAqMdruPF3ouP+VGIBmnQTdApQMhb2dbKUNYGRiH', // Replace with your actual secret access key
    region: 'us-east-1', // Replace with your bucket's region
  });

  const uploadImageToS3 = async (uri) => {
    setUploading(true);
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
  
      const uploadParams = {
        Bucket: 'safeguardb45', // Replace with your bucket name
        Key: `photos/photo_${Date.now()}.jpg`, // The name of the file in your S3 bucket
        Body: blob,
        ContentType: blob.type,
      };
  
      s3.upload(uploadParams, (err, data) => {
        setUploading(false);
        if (err) {
          console.error('Error uploading to S3:', err.message);
          Alert.alert('Upload failed', err.message);
        } else {
          const newPhoto = { id: Date.now().toString(), uri: data.Location };
          setPhotos([...photos, newPhoto]);
        }
      });
    } catch (e) {
      setUploading(false);
      console.error('Upload failed:', e.message);
      Alert.alert('Upload failed', 'Network request failed');  
    }
  };
  
  const handleAddPhotos = () => {
    showActionSheetWithOptions({
        options: ['Cancel', 'Photo Library', 'Camera'],
        cancelButtonIndex: 0,
      },
      async (buttonIndex) => {
        if (buttonIndex === 1) {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
          });

          if (!result.canceled) {
            await uploadImageToS3(result.assets[0].uri);
          }
        } else if (buttonIndex === 2) {
          let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
          });

          if (!result.canceled) {
            await uploadImageToS3(result.assets[0].uri);
          }
        }
      }
    );
  };

  useEffect(() => {
    (async () => {
      const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (mediaLibraryStatus !== 'granted') {
        Alert.alert('Permission Denied', 'Sorry, we need media library permissions to make this work!');
      }

      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      if (cameraStatus !== 'granted') {
        Alert.alert('Permission Denied', 'Sorry, we need camera permissions to make this work!');
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Photo Vault</Text>
          <TouchableOpacity>
            <Text style={styles.headerRight}>SELECT</Text>
          </TouchableOpacity>
        </View>
        {uploading && (
          <View style={styles.spinner}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        )}
        <FlatList
          data={photos}
          renderItem={({ item }) => (
            <Image source={{ uri: item.uri }} style={styles.photo} />
          )}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={styles.photoGrid}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddPhotos}>
          <Text style={styles.addButtonText}>ADD PHOTOS</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#add8e6',
  },
  container: {
    flex: 1,
    backgroundColor: '#add8e6',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  headerRight: {
    fontSize: 16,
    color: 'black',
  },
  spinner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    zIndex: 1,
  },
  photoGrid: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  photo: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 5,
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    height: 50,
    backgroundColor: '#27AE60',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  addButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SecureVault;