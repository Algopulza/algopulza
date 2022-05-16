/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  images: {
    loader: 'imgix',
    path: 'https://k6a408.p.ssafy.io/',
  },
  trailingSlash: true,
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/recommendation': { page: '/recommendation/' },
      '/random': { page: '/random/' },
      '/search': { page: '/search/' },
      '/mypage': { page: '/mypage/' },
    }
  },
}
