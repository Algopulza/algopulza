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
      '/index/': { page: '/' },
      '/recommendation/': { page: '/recommendatio/' },
      '/random/': { page: '/random/' },
      '/search/': { page: '/search/' },
      '/mypage/': { page: '/mypage/' }
    }
  }
}

module.exports = nextConfig
