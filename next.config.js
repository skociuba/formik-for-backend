/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate-plugin');

const nextConfig = {
  reactStrictMode: true, // włącza tryb Strict Mode w React
  output: 'standalone', // dla builda standalone (łatwe deploye)
  webpack: (config) => config, // nic nie zmieniamy w webpack
  // rewrites nie są potrzebne, bo FE używa NEXT_PUBLIC_API_URL
};

module.exports = nextTranslate(nextConfig);
