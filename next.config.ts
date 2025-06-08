import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        optimizeServerReact: false,
    },
    // Let Next.js handle CSS Modules automatically
    // Remove custom webpack/turbopack configurations
};

export default nextConfig;
