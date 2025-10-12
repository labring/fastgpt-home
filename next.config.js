/** @type {import('next').NextConfig} */

const nextConfig = {
  // Only use static export for production builds
  // Dev mode uses dynamic server rendering for better DX
  ...(process.env.NODE_ENV === 'production' && { output: "export" }),
  images: { unoptimized: true }
}

module.exports = nextConfig