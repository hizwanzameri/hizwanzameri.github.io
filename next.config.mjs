/** @type {import('next').NextConfig} */
const nextConfig = {
    // Omit output: 'export' so API routes (e.g. /api/spotify) work. Deploy to Vercel for full app.
    images: { unoptimized: true }
};

export default nextConfig;
