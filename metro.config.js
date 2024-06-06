const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.blockList = [/(.*.test.tsx?)$/];

module.exports = config;
