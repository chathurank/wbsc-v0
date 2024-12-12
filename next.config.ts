import type { NextConfig } from 'next'
import { Configuration as WebpackConfig } from 'webpack'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['placeholder.com'],
  },
  webpack: (config: WebpackConfig) => {
    config.module = config.module || { rules: [] }
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })
    return config
  },
}

export default nextConfig

