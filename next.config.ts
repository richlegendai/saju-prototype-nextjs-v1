import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env["FATEBATTLE_DIST_DIR"] ?? ".next",
  reactStrictMode: true,
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
