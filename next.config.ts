import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  logging: {
    serverFunctions: false,
  },
  cacheComponents: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
            },
          },
        ],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
