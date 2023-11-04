/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/datasets",
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
