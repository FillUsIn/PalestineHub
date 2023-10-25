/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => [
    {
      source: "/",
      destination: "/resources",
      permanent: true,
    },
  ],
};

module.exports = nextConfig;
