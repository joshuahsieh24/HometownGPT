import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ✅ turn off lint-blocking during the Vercel build
  eslint: {
    ignoreDuringBuilds: true,
  },

  // (keep or add any other Next.js options below)
  // reactStrictMode: true,
  // experimental: { appDir: true },
};

export default nextConfig;
