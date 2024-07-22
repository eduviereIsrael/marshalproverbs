/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        workerThreads: false,
        cpus: 1,
        scrollRestoration: false,
      }
};

export default nextConfig;
