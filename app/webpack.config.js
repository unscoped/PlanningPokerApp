const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async (env, argv) => {
  const config = await createExpoWebpackConfigAsync(env, argv);
  // Customize the config before returning it.

  config.performance = {
    ...config.performance,
    // Hide webpack performance warnings on deploy
    hints: false,
  };

  return config;
};
