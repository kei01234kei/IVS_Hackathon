const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'ja'], // 利用する言語を指定
    defaultLocale: 'en', // デフォルトの言語を指定
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  webpack(config, { isServer, dev }) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };

    return config;
  },
};

module.exports = nextConfig;
