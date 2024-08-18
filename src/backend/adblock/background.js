let blockedUrls = [
    "*://*.doubleclick.net/*",
    "*://*.googleadservices.com/*",
    "*://*.googlesyndication.com/*",
    "*://*.google-analytics.com/*",
    "*://*.adnxs.com/*",
    "*://*.adsafeprotected.com/*",
    "*://*.adform.net/*",
    "*://*.adroll.com/*",
    "*://*.scorecardresearch.com/*",
    "*://*.zedo.com/*",
    // Add more patterns as needed
  ];

  
  chrome.runtime.onInstalled.addListener(() => {
    console.log('Advanced Ads Blocker extension installed.');
});

  chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      return { cancel: true };
    },
    { urls: blockedUrls },
    ["blocking"]
  );
  