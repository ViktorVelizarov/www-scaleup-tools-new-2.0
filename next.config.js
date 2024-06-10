/** @type {import('next').NextConfig} */


const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Increase timeout to 1 minute (optional, adjust as needed)
    apiTimeout: 60000, // in milliseconds
  },
}

module.exports = nextConfig
