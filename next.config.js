/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/watch',
            destination: '/',
            permanent: true,
          },
        ];
      },
}

module.exports = nextConfig
