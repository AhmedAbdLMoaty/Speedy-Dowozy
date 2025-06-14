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
    async redirects() {
        return [
            {
                source: "/restauracje",
                destination: "/",
                permanent: false,
            },
            {
                source: "/o-nas",
                destination: "/",
                permanent: false,
            },
            {
                source: "/kontakt",
                destination: "/",
                permanent: false,
            },
            {
                source: "/zamow-teraz",
                destination: "/",
                permanent: false,
            },
        ];
    },
    typescript: {
        ignoreBuildErrors: false,
    },
    eslint: {
        ignoreDuringBuilds: false,
    },
};

export default nextConfig;
