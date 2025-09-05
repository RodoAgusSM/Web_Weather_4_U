module.exports = function override(config, env) {
  // Override the Webpack configuration.
  config.resolve.fallback = {
    ...config.resolve.fallback,
    path: require.resolve('path-browserify'),
    fs: false,
  };

  return config;
};
