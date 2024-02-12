/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placeholder.jpg",
        port: "",
        pathname: "/30/d3d3d3/ffffff/300x150.png?text=event",
      },
      {
        protocol: "http",
        hostname: "10.129.23.206",
        port: "8080",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "jentedecamps.ikdoeict.be",
        port: "",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: "",
        pathname: "/staging-bucket-routeyou/**",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: "",
        pathname: "/production-bucket-routeyou/**",
      },
    ],
  },
  output: "standalone",
};

module.exports = withPWA(nextConfig);
