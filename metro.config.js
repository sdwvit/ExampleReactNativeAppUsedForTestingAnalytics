/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');
module.exports = {
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
  server: {
    enhanceMiddleware: middleware => {
      return (req, res, next) => {
        // Intercept the /bundle endpoint and save the bundle file
        if (req.url === '/bundle') {
          const bundleFilePath = path.join(__dirname, 'bundle', 'index.bundle');
          res.writeHead(200, {
            'Content-Type': 'application/javascript',
            'Content-Disposition': `attachment; filename="index.bundle"`,
          });
          middleware(req, res, next).then(() => {
            const bundle = res._content;
            // Write the bundle content to the file
            require('fs').writeFileSync(bundleFilePath, bundle, 'utf8');
          });
        } else {
          middleware(req, res, next);
        }
      };
    },
  },
};
