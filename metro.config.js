// const { getDefaultConfig } = require('metro-config');

// module.exports = (async () => {
//   const defaultConfig = await getDefaultConfig(__dirname); // Ensure to pass `__dirname` to scope the configuration correctly.

//   // Extract existing configurations for assets and source files
//   const {
//     resolver: { sourceExts, assetExts }
//   } = defaultConfig;

//   return {
//     transformer: {
//       getTransformOptions: async () => ({
//         transform: {
//           experimentalImportSupport: false,
//           inlineRequires: false,
//         },
//       }),
//     },
//     resolver: {
//       // Concatenate and ensure that all necessary image extensions are included
//       assetExts: [...new Set([...assetExts, 'jpeg', 'jpg', 'png'])], // Use a Set to avoid duplicate entries
//       sourceExts,
//     },
//   };
// })();

const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

async function getConfig() {
  const defaultConfig = await getDefaultConfig(__dirname);

  // Extend the default asset file types
  const extendedAssetExts = [
    ...defaultConfig.resolver.assetExts,
    'ttf', // Ensure TrueType Font files are included
    'jpeg', 'jpg', 'png', 'gif', // Include common image file types if not already handled
  ];

  const config = {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      // Filter out SVG from the default asset extensions to handle it with SVG transformer
      assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg' && !extendedAssetExts.includes(ext)),
      sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'], // Add SVG to source extensions
    },
  };

  // Return the merged configuration
  return mergeConfig(defaultConfig, {
    ...config,
    resolver: {
      ...config.resolver,
      assetExts: extendedAssetExts, // Use the extended asset extensions
    },
  });
}

module.exports = getConfig(); // Export the configuration function
