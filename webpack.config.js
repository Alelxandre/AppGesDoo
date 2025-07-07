const createExpoWebpackConfigAsync = require("@expo/webpack-config")

module.exports = async (env, argv) => {
  const config = await createExpoWebpackConfigAsync(env, argv)

  // Résoudre les problèmes TypeScript
  config.resolve.alias = {
    ...config.resolve.alias,
    "react-native$": "react-native-web",
  }

  return config
}
