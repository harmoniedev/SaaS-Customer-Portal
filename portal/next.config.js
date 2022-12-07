/** @type {import('next').NextConfig} */
var serverHost = process.env.API_URL
if (serverHost === "") {
  serverHost = "http://localhost:8080"
}
var redirectUri = process.env.LOGIN_REDIRECT_URI
if (redirectUri === "") {
  redirectUri = "http://localhost:8080/login_with_microsoft"
}
const nextConfig = {
  env: {
    CLIENT_ID: process.env.CLIENT_ID,
    APP_TENANT_ID: process.env.APP_TENANT_ID,
    LOGIN_REDIRECT_URI: redirectUri,
    LOGOUT_REDIRECT_URI: process.env.LOGOUT_REDIRECT_URI,
    API_URL: serverHost,
    BASE_IFRAME_API: process.env.BASE_IFRAME_API,
    IFRAME_KEY: process.env.IFRAME_KEY,
    TEMP_TOKEN: process.env.TEMP_TOKEN
  },
  webpack(config)
  {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  // reactStrictMode: true,
};

module.exports = nextConfig;
