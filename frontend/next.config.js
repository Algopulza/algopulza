/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  images: {
    loader: 'imgix',
    path: 'https://k6a408.p.ssafy.io/',
  },
  trailingSlash: true,
}
