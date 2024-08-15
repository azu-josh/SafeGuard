import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Switch,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { WebView } from 'react-native-webview';

const AdsBlockerComponent = () => {
  const [blockedUrls, setBlockedUrls] = useState([
    '*://*doubleclick.net/*',
    '*://*googleadservices.com/*',
  ]);
  const [currentUrl, setCurrentUrl] = useState('https://www.google.com'); // Change to a real URL for testing
  const [isAdBlockEnabled, setIsAdBlockEnabled] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const adBlockerScript = `
    const blockedPatterns = ${JSON.stringify(blockedUrls)};
    const regexps = blockedPatterns.map(pattern => new RegExp(pattern.replace(/\\*/g, '.*')));
    function blockAds() {
      document.querySelectorAll('iframe, img, div').forEach(el => {
        if (regexps.some(regexp => regexp.test(el.src) || regexp.test(el.style.background))) {
          el.remove();
        }
      });
    }
    blockAds();
    new MutationObserver(blockAds).observe(document, { childList: true, subtree: true });
  `;

  const handleNavigationError = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    console.warn('WebView navigation error:', nativeEvent);
  };

  const removeUrlFromBlocklist = (urlToRemove) => {
    setBlockedUrls(blockedUrls.filter(url => url !== urlToRemove));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        {!isFullScreen ? (
          <View style={styles.scrollContainer}>
            <Text style={styles.title}>Ads Blocker</Text>
            <TouchableOpacity
              style={styles.webViewButton}
              onPress={() => setIsFullScreen(true)}
            >
              <Text style={styles.webViewButtonText}>Open Virtual Browser</Text>
            </TouchableOpacity>
            <FlatList
              data={blockedUrls}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <View style={styles.urlItem}>
                  <Text style={styles.urlText}>{item}</Text>
                  <TouchableOpacity onPress={() => removeUrlFromBlocklist(item)}>
                    <Text style={styles.removeButtonText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              )}
              contentContainerStyle={styles.urlList}
            />
            <View style={styles.toggleContainer}>
              <Text style={styles.toggleLabel}>Enable Ad Blocker</Text>
              <Switch
                value={isAdBlockEnabled}
                onValueChange={(value) => setIsAdBlockEnabled(value)}
              />
            </View>
          </View>
        ) : (
          <View style={styles.fullScreenContainer}>
           <WebView>
  source={{ uri: currentUrl }}
  style={styles.webViewFullScreen}
  injectedJavaScript={isAdBlockEnabled ? adBlockerScript : ''}
  javaScriptEnabled={true}
  onShouldStartLoadWithRequest={(request) => {
    // Block navigation if URL matches any patterns in the blockedUrls list when ad blocker is enabled
    if (isAdBlockEnabled) {
      const shouldBlock = blockedUrls.some(pattern => new RegExp(pattern.replace(/\*/g, '.*')).test(request.url));
      return !shouldBlock;
    }
    return true; // Allow navigation if ad blocker is disabled
  }}
  onError={handleNavigationError}
  onHttpError={handleNavigationError}
</WebView>

            <TouchableOpacity
              style={styles.exitFullScreenButton}
              onPress={() => setIsFullScreen(false)}
            >
              <Text style={styles.exitFullScreenButtonText}>Exit Full Screen</Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
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
    padding: 20,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  webViewButton: {
    backgroundColor: '#27AE60',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  webViewButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  urlList: {
    paddingVertical: 10,
  },
  urlItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  urlText: {
    fontSize: 16,
  },
  removeButtonText: {
    color: '#ff0000',
    fontWeight: 'bold',
  },
  webViewContainer: {
    flex: 1,
    marginTop: 20,
    height: 400, // Adjust the height as needed
  },
  webView: {
    flex: 1,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  toggleLabel: {
    fontSize: 18,
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  webViewFullScreen: {
    flex: 1,
  },
  exitFullScreenButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#27AE60',
    padding: 10,
    borderRadius: 5,
  },
  exitFullScreenButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AdsBlockerComponent;
