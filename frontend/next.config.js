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
      'https://k6a408.p.ssafy.io/': { page: '/' },
      'https://k6a408.p.ssafy.io/recommendation': { page: '/recommendation' },
      'https://k6a408.p.ssafy.io/random': { page: '/random' },
      'https://k6a408.p.ssafy.io/search': { page: '/search' },
      'https://k6a408.p.ssafy.io/mypage': { page: '/mypage' },
    }
  },
}
