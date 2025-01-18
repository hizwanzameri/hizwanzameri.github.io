/** @type {import('next').NextConfig} */
const nextConfig = {
    // Specify static export
    output: 'export',
    // Optional: Enable additional configuration as needed
    trailingSlash: true, // Ensure paths have trailing slashes for static hosting
};

export default nextConfig;
