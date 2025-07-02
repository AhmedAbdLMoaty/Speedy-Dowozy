import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export",
    trailingSlash: true,
    experimental: {
        optimizeServerReact: false,
        optimizeCss: true,
    },
    turbopack: {
        rules: {
            "*.svg": {
                loaders: ["@svgr/webpack"],
                as: "*.js",
            },
        },
    },
    images: {
        unoptimized: true,
        formats: ["image/webp", "image/avif"],
        minimumCacheTTL: 3600,
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    compress: true,
    poweredByHeader: false,
    generateEtags: false,
    compiler: {
        removeConsole: process.env.NODE_ENV === "production",
    },
    logging: {
        fetches: {
            fullUrl: false,
        },
    },
    // Redirects removed as they don't work with static exports
    // For static sites, you'll need to use client-side redirects or configure them in your hosting platform

    typescript: {
        ignoreBuildErrors: false,
    },
    eslint: {
        ignoreDuringBuilds: false,
    },
};

export default nextConfig;
