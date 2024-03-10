/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "static.staff-clothes.com" },
    ],
  },
};

export default nextConfig;
