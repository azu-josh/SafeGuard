import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Switch,
  Image,
  Platform,
} from 'react-native';

const AdsBlockerComponent = () => {
  const [isAdBlockEnabled, setIsAdBlockEnabled] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleToggleAdBlock = () => {
    if (!isAdBlockEnabled) {
      // Show instructions on how to enable adblocker in the browser
      setShowInstructions(true);
    } else {
      setIsAdBlockEnabled(false);
    }
  };

  const closeInstructions = () => {
    setShowInstructions(false);
    setIsAdBlockEnabled(true);
  };

  const renderInstructions = () => {
    if (Platform.OS === 'ios') {
      return (
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>Enable AdBlocker for Browser</Text>
          <Text style={styles.instruction}>1. Open Settings.</Text>
          <Text style={styles.instruction}>2. Go to Browser &gt; Extensions.</Text>
          <Text style={styles.instruction}>3. Set all AdBlocker toggles to on.</Text>
          <Text style={styles.instruction}>4. For advanced protection, open Safari, tap the "aA" icon, then tap Manage extensions and switch on the AdBlocker toggle.</Text>
          <TouchableOpacity style={styles.doneButton} onPress={closeInstructions}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (Platform.OS === 'android') {
      return (
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>Enable AdBlocker for Browser</Text>
          <Text style={styles.instruction}>1. Open Settings.</Text>
          <Text style={styles.instruction}>2. Go to Browser &gt; Extensions.</Text>
          <Text style={styles.instruction}>3. Set all AdBlocker toggles to on.</Text>
          <Text style={styles.instruction}>4. For advanced protection, open Browser, go to Extensions, and switch on the AdBlocker toggle.</Text>
          <TouchableOpacity style={styles.doneButton} onPress={closeInstructions}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>AdBlocker</Text>

        <View style={styles.protectionContainer}>
          <Text style={styles.protectionStatus}>
            {isAdBlockEnabled ? 'Protection is on' : 'Protection is off'}
          </Text>
          <Text style={styles.browserProtection}>{Platform.OS === 'ios' ? 'Safari Protection' : 'Chrome Protection'} is {isAdBlockEnabled ? 'on' : 'off'}</Text>

          <Switch
            style={styles.toggleSwitch}
            value={isAdBlockEnabled}
            onValueChange={handleToggleAdBlock}
          />
        </View>

        <Image
          source={require('../Assets/Ad Blocker.jpg')}
          style={styles.image}
        />

        <TouchableOpacity style={styles.premiumButton}>
          <Text style={styles.premiumButtonText}>Get stronger with Premium!</Text>
        </TouchableOpacity>

        {showInstructions && renderInstructions()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  protectionContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  protectionStatus: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  browserProtection: {
    fontSize: 16,
    color: 'gray',
    marginTop: 5,
  },
  toggleSwitch: {
    marginTop: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 20,
  },
  premiumButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#27AE60',
    borderRadius: 10,
  },
  premiumButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  instructionsContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 20,
    backgroundColor: '#000000',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  instructionsTitle: {
    fontSize: 20,
    color: '#ffffff',
    marginBottom: 10,
  },
  instruction: {
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 5,
  },
  doneButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#27AE60',
    borderRadius: 10,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
 //NEAT 
});

export default AdsBlockerComponent;
