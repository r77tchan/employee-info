import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // ビルド時のLintエラーを無視
  },
}

export default nextConfig
