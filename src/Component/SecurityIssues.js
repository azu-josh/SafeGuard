// SecurityIssues.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

const dummyIssues = [
  { id: 1, description: 'Breached password from Facebook.', resolved: false },
  { id: 2, description: 'Tiktok is sharing your location and preferences.', resolved: false },
  { id: 3, description: 'Your email was found in a data breach.', resolved: false },
  { id: 4, description: 'Outdated software detected.', resolved: false },
  { id: 5, description: 'Unsecured Wi-Fi network detected.', resolved: false },
  { id: 6, description: 'Suspicious login attempt detected.', resolved: false },
  { id: 7, description: 'Too many permissions granted to an app.', resolved: false },
];

const SecurityIssues = () => {
  const [issues, setIssues] = useState(dummyIssues);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);

  const handleResolveIssue = (issue) => {
    setIssues(issues.map(i => i.id === issue.id ? { ...i, resolved: true } : i));
    setModalVisible(false);
  };

  const handleReviewIssues = (issue) => {
    setSelectedIssue(issue);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>We found {issues.filter(issue => !issue.resolved).length} issues</Text>
      {issues.filter(issue => !issue.resolved).length > 0 ? (
        <TouchableOpacity style={styles.button} onPress={() => handleReviewIssues(issues.find(issue => !issue.resolved))}>
          <Text style={styles.buttonText}>Review Issues</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.allResolvedText}>All issues resolved!</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={() => setIssues(dummyIssues.map(issue => ({ ...issue, resolved: false })))}>
        <Text style={styles.buttonText}>Scan Again</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Security Issue</Text>
            <Text style={styles.modalDescription}>{selectedIssue?.description}</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={() => handleResolveIssue(selectedIssue)}>
                <Text style={styles.modalButtonText}>Resolve</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Ignore</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  allResolvedText: {
    color: 'green',
    marginBottom: 10,
  },
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

export default SecurityIssues;
