import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig';
import { useActionSheet } from '@expo/react-native-action-sheet';

const SecureVault = () => {
  const navigation = useNavigation();
  const { showActionSheetWithOptions } = useActionSheet();
  const [photos, setPhotos] = useState([]);
  const [uploading, setUploading] = useState(false);

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

  const uploadImage = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `images/${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
      setUploading(true);
  
      const uploadTask = uploadBytes(storageRef, blob);
      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        }, 
        (error) => {
          console.error('Upload error:', error);
          Alert.alert('Upload failed', error.message);
          setUploading(false);
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            const newPhoto = { id: Date.now().toString(), uri: downloadURL };
            setPhotos([...photos, newPhoto]);
            setUploading(false);
          });
        }
      );
    } catch (e) {
      console.error('Network request failed:', e);
      Alert.alert('Upload failed', 'Network request failed');
      setUploading(false);
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
            await uploadImage(result.uri);
          }
        } else if (buttonIndex === 2) {
          let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
          });

          if (!result.canceled) {
            await uploadImage(result.uri);
          }
        }
      }
    );
  };

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
