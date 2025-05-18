/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // For client-side, exclude undici
      config.resolve.fallback = {
        ...config.resolve.fallback,
        "undici": false,
      };
    } else {
      // For server-side, use a different loader for undici
      config.module.rules.push({
        test: /node_modules\/undici\/.*\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-transform-private-methods',
              '@babel/plugin-transform-class-properties'
            ]
          }
        }
      });
    }
    return config;
  },
};

export default nextConfig; 