import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['127.0.0.1'],
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
  outputFileTracingIncludes: {
    '/': ['./src/features/experiment/**/content/*.md'],
    '/**/*': ['./src/features/experiment/**/content/*.md'],
  },
};

export default nextConfig;
