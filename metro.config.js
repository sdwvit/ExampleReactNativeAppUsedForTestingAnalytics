/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const config = {
  resetCache: true,
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    resolverMainFields: ['module', 'main'], // Also see https://github.com/facebook/metro/issues/670
    sourceExts: ['json', 'js', 'jsx', 'ts', 'tsx', 'cjs', 'mjs'],
    assetExts: ['glb', 'gltf', 'png', 'jpg'],
  },
};

module.exports = config;
