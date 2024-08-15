// ScanResults.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';

function ScanResults() {
  const [issuesFound, setIssuesFound] = useState(0);
  const [lastScanTime, setLastScanTime] = useState(null);
  const [scanProgress, setScanProgress] = useState(new Animated.Value(0));

  useEffect(() => {
    scanProgress.addListener(({ value }) => {
      if (value === 100) {
        setScanProgress(new Animated.Value(0));
      }
    });

    return () => {
      scanProgress.removeAllListeners();
    };
  }, [scanProgress]);

  const handleScan = () => {
    setLastScanTime(new Date().toLocaleTimeString());
    const newIssues = Math.floor(Math.random() * 10);
    setIssuesFound(newIssues);

    Animated.timing(scanProgress, {
      toValue: 100,
      duration: 3000, // 3 seconds
      easing: Easing.linear,
      useNativeDriver: false, // Set to false as we're not using native animation
    }).start();
  };

  const handleReviewIssues = () => {
    alert('Reviewing issues...');
  };

  const animatedStyle = {
    transform: [
      {
        rotate: scanProgress.interpolate({
          inputRange: [0, 100],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressCircle}>
        <View style={styles.progressCircleOverlay}>
          <Animated.View style={[styles.progressCircleInner, animatedStyle]} />
        </View>
        <View style={styles.progressCircleContent}>
          <Animated.Text style={styles.progressText}>
            {scanProgress.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            })}
          </Animated.Text>
        </View>
      </View>
      <Text style={styles.title}>We found {issuesFound} issues</Text>
      {lastScanTime && <Text style={styles.subtitle}>Last scan: {lastScanTime}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleReviewIssues}>
        <Text style={styles.buttonText}>REVIEW ISSUES</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleScan}>
        <Text style={styles.buttonText}>SCAN AGAIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#282c34',
    borderRadius: 10,
    margin: 10,
  },
  progressCircle: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#444', // Change this to match the background color you want
    borderRadius: 50,
  },
  progressCircleOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 50,
    borderWidth: 5,
    borderColor: '#eee',
  },
  progressCircleInner: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 50,
    borderWidth: 5,
    borderColor: '#61dafb',
    borderStyle: 'solid',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  progressCircleContent: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 18,
    color: '#fff',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#61dafb',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
  },
});

export default ScanResults;
