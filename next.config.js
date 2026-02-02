/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://careerschool.co.in/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
