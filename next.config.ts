import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],

    dangerouslyAllowSVG: true,
  },

  allowedDevOrigins: [
    "192.168.6.110",
    "192.168.1.74",
    "localhost",
  ],
};

export default nextConfig;