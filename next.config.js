const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['placeholder.com', 'via.placeholder.com'],
  },
  webpack: (config) => {
    config.module = config.module || { rules: [] }
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })
    return config
  },
}

module.exports = nextConfig

