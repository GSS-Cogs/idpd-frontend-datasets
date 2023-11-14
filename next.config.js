/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/datasets",
  experimental: {
    serverActions: true,
  },
  async headers() {
    return [
      {
        source: "/robots.txt",
        headers: [
          {
            key: "Content-Type",
            value: "text/plain",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
