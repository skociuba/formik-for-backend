/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
};
module.exports = nextConfig;

const nextTranslate = require('next-translate-plugin');
module.exports = nextTranslate({
  webpack: (config) => config,
});
