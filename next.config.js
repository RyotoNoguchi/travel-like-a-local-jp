/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "travel-like-a-local-jp.com",
      "secure.gravatar.com",
      "upload.wikimedia.org",
      "travellikealocaljp.local",
      "1.gravatar.com",
      "www.gravatar.com",
      "travel-like-a-local.jp"
    ],
    minimumCacheTTL: 60 * 60 * 24
  },
  swcMinify: true
}

module.exports = nextConfig
