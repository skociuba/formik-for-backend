/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate-plugin');

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  webpack: (config) => config,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://85.215.128.5:8000/api/:path*',
      },
    ];
  },
};

module.exports = nextTranslate(nextConfig);