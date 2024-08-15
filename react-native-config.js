module.exports = {
    dependencies: {
      'react-native-vector-icons': {
        platforms: {
          android: {
            packageImportPath: 'import com.oblador.vectoricons.VectorIconsPackage;',
            packageInstance: 'new VectorIconsPackage()',
          },
        },
      },
    },
  };
  