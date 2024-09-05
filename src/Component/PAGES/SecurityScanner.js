import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Alert, ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native';
//import DeviceInfo from 'react-native-device-info';
import NetInfo from '@react-native-community/netinfo';
import AWS from 'aws-sdk';


// AWS Configuration (Set up with your credentials)
AWS.config.update({
  region: 'us-east-1', // Replace with your AWS region
  accessKeyId: 'AKIATOMKLEFOGOJ3SRVO', // Replace with your AWS Access Key
  secretAccessKey: 'cAqMdruPF3ouP+VGIBmnQTdApQMhb2dbKUNYGRiH', // Replace with your AWS Secret Key
});

const SecurityScanner = () => {
  const [installedApps, setInstalledApps] = useState([]);
  const [networkInfo, setNetworkInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    checkInstalledApps();
    monitorNetworkActivity();
  }, []);

  const checkInstalledApps = async () => {
    try {
      const apps = await DeviceInfo.getInstalledApplications();
      setInstalledApps(apps);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching installed apps:', error);
      setLoading(false);
    }
  };

  const monitorNetworkActivity = () => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        const isSuspicious = checkForMaliciousDomains(state.details.ssid);
        if (isSuspicious) {
          handleSuspiciousActivity(`Suspicious network detected: ${state.details.ssid}`);
        }
      }
      setNetworkInfo(state);
    });

    return () => unsubscribe();
  };

  const checkForMaliciousDomains = (ssid) => {
    const knownMaliciousDomains = ['malicious.com', 'phishing.com'];
    return knownMaliciousDomains.includes(ssid);
  };

  const handleSuspiciousActivity = (activityDetails) => {
    setAlerts((prevAlerts) => [...prevAlerts, `Suspicious activity detected: ${activityDetails}`]);
    uploadLogsToS3(`Suspicious activity: ${activityDetails}`);
  };

  const uploadLogsToS3 = async (logContent) => {
    const s3 = new AWS.S3();
    const params = {
      Bucket: 'your-s3-bucket-name',
      Key: `logs/${Date.now()}.txt`,
      Body: logContent,
      ContentType: 'text/plain',
    };

    try {
      await s3.upload(params).promise();
      Alert.alert('Logs Uploaded', 'Security logs have been uploaded to S3.');
    } catch (error) {
      console.error('Error uploading logs to S3:', error);
    }
  };

  const renderAppItem = ({ item }) => (
    <View style={styles.appItem}>
      <Text style={styles.appName}>{item}</Text>
      <Button title="Block" onPress={() => handleBlockApp(item)} color="#ff0000" />
    </View>
  );

  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>Security Scanner</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <>
          <Text style={styles.sectionTitle}>Installed Applications:</Text>
          <FlatList
            data={installedApps}
            keyExtractor={(item) => item}
            renderItem={renderAppItem}
          />
          <Text style={styles.sectionTitle}>Network Status:</Text>
          <Text>{networkInfo.isConnected ? 'Connected' : 'Not Connected'}</Text>
          <Text>SSID: {networkInfo.details ? networkInfo.details.ssid : 'N/A'}</Text>
          <Text style={styles.sectionTitle}>Alerts:</Text>
          {alerts.length === 0 ? (
            <Text>No Alerts</Text>
          ) : (
            alerts.map((alert, index) => (
              <Text key={index} style={styles.alertText}>
                {alert}
              </Text>
            ))
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  appItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  appName: {
    fontSize: 16,
  },
  alertText: {
    color: 'red',
    marginVertical: 5,
  },
});

export default SecurityScanner;
