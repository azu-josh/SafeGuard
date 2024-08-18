document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('adblock-toggle');
  
    // Initialize the toggle based on stored settings
    chrome.storage.sync.get('adblockEnabled', (data) => {
      toggle.checked = data.adblockEnabled || false;
    });
  
    toggle.addEventListener('change', () => {
      const isEnabled = toggle.checked;
      chrome.storage.sync.set({ adblockEnabled: isEnabled });
  
      if (isEnabled) {
        chrome.webRequest.onBeforeRequest.addListener(
          function(details) {
            return { cancel: true };
          },
          { urls: blockedUrls },
          ["blocking"]
        );
      } else {
        chrome.webRequest.onBeforeRequest.removeListener();
      }
    });
  });
  