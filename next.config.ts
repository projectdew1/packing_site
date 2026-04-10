import type { NextConfig } from "next";

if (process.env.NODE_ENV !== "production" || process.env.SKIP_SSL_VALIDATION === "true") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}


const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
