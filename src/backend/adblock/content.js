const blockAds = () => {
  const adSelectors = [
    'iframe[src*="ad"]',
    'img[src*="ad"]',
    'div[class*="ad"]',
    '[id*="ad"]',
    '[class*="ad"]',
    'a[href*="ad"]',
    // Add more selectors as needed
  ];

  adSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => el.remove());
  });

  new MutationObserver((mutations) => {
    mutations.forEach(() => {
      adSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => el.remove());
      });
    });
  }).observe(document.body, { childList: true, subtree: true });
};

blockAds();
