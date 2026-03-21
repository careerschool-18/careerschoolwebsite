/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://career-school.co.in/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
