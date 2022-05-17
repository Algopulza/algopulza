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
      '/index.html': { page: '/' },
      '/recommendation/index.html': { page: '/recommendation' },
      '/random/index.html': { page: '/random' },
      '/search/index.html': { page: '/search' },
      '/mypage/index.html': { page: '/mypage' }
    }
  }
}

module.exports = nextConfig
