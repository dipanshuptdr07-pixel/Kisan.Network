import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ...(process.env.NODE_ENV === "production" ? { output: "export" as const } : {}),
  allowedDevOrigins: ["127.0.0.1", "*.sisko.replit.dev"],
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
