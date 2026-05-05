/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['uncounselled-braylen-seelily.ngrok-free.dev'],
}

export default nextConfig
