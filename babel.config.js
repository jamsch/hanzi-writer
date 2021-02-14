module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: ['last 2 versions'],
      },
    ],
    '@babel/preset-typescript',
  ],
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current',
            },
          },
        ],
      ],
    },
  },
};
