/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "akamai",
    path: "/",
  },

  trailingSlash: true,
  
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/recommendation/': { page: '/recommendation' },
      '/random/': { page: '/random' },
      '/search/': { page: '/search' },
      '/mypage/': { page: '/mypage' }
    }
  }
}

module.exports = nextConfig
