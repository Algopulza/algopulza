/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // images: {
  //   loader: "akamai",
  //   path: "/",
  // }
}

module.exports = {
  nextConfig,
  images: {
    loader: 'imgix',
    path: 'https://k6a408.p.ssafy.io/',
  },
  trailingSlash: true,
}
