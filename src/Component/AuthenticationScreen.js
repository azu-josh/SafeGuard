import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Keychain from 'react-native-keychain';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';

const CELL_COUNT = 4;

const AuthenticationScreen = () => {
  const navigation = useNavigation();
  const [authenticated, setAuthenticated] = useState(false);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });

  useEffect(() => {
    const authenticate = async () => {
      try {
        const result = await Keychain.getGenericPassword({
          authenticationPrompt: {
            title: 'Authentication required',
            subtitle: 'Log in to access your secure vault',
            description: 'Use your fingerprint, face recognition or PIN code to unlock the secure vault',
            cancel: 'Cancel',
          },
        });

        if (result) {
          setAuthenticated(true);
        } else {
          Alert.alert(
            'Authentication Failed',
            'Unable to authenticate. Please try again.',
            [
              { text: 'OK', onPress: () => navigation.goBack() }
            ],
            { cancelable: false }
          );
        }
      } catch (error) {
        Alert.alert(
          'Authentication Error',
          'An error occurred during authentication. Please try again.',
          [
            { text: 'OK', onPress: () => navigation.goBack() }
          ],
          { cancelable: false }
        );
      }
    };

    authenticate();
  }, []);

  const onCodeFilled = (code) => {
    // Verify the passcode here
    if (code === '1234') { // Replace '1234' with the actual passcode logic
      setAuthenticated(true);
    } else {
      Alert.alert('Invalid Passcode', 'The passcode you entered is incorrect.');
    }
  };

  if (!authenticated) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Photo Vault</Text>
          </View>
          <Text style={styles.promptText}>Enter passcode</Text>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            onFulfill={onCodeFilled}
            renderCell={({ index, symbol, isFocused }) => (
              <View
                onLayout={getCellOnLayoutHandler(index)}
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
              >
                <Text style={styles.cellText}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />
          <TouchableOpacity style={styles.faceIdButton} onPress={authenticate}>
            <Icon name="ios-face-id" size={50} color="black" />
            <Text style={styles.faceIdText}>Face ID</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Render your SecureVault content here
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text>Authenticated Content</Text>
        {/* Your secure vault content goes here */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#2C2C3E',
  },
  container: {
    flex: 1,
    backgroundColor: '#2C2C3E',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
  promptText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  codeFieldRoot: {
    marginBottom: 20,
  },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
    margin: 5,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  cellText: {
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
  faceIdButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  faceIdText: {
    fontSize: 18,
    color: 'white',
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C2C3E',
  },
});

export default AuthenticationScreen;
