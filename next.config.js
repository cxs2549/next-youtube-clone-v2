/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/watch",
        destination: "/",
        permanent: true,
      },
    ]
  },
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig
