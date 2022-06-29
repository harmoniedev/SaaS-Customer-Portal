/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CLIENT_ID: process.env.CLIENT_ID,
    APP_TENANT_ID: process.env.APP_TENANT_ID,
    LOGIN_REDIRECT_URI: process.env.LOGIN_REDIRECT_URI,
    LOGOUT_REDIRECT_URI: process.env.LOGOUT_REDIRECT_URI,
    API_URL: process.env.API_URL,
    BASE_IFRAME_API: process.env.BASE_IFRAME_API,
    IFRAME_KEY: process.env.IFRAME_KEY,
    TEMP_TOKEN: process.env.TEMP_TOKEN
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  // reactStrictMode: true,
};

module.exports = nextConfig;
