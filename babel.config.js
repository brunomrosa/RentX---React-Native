module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          alias: {
            assets: './src/assets/',
            components: './src/components',
            screens: './src/screens',
            dtos: './src/dtos/',
            routes: './src/routes/',
            utils: './src/utils/',
            styles: './src/styles/',
            services: './src/services/',
          },
        },
      ],
    ],
  };
};
