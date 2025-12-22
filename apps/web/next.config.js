/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/application', '@repo/domain', '@repo/graphql', '@repo/ui'],
};

export default nextConfig;
