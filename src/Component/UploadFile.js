// src/Component/UploadFile.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UploadFile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Upload File Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});

export default UploadFile;
