/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
<<<<<<< HEAD
        destination: "http://localhost:8080/api/:path*",
=======
        destination: "https://career-school.co.in/api/:path*",
>>>>>>> cfc2b7ba891dfc718acb5863b2d1065bcf60a096
      },
    ];
  },
};

module.exports = nextConfig;
