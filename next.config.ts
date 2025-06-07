import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        formats: ["image/webp", "image/avif"],
        minimumCacheTTL: 60,
        dangerouslyAllowSVG: true,
    },
    experimental: {
        optimizeServerReact: false,
    },
    turbopack: {
        rules: {
            "*.svg": {
                loaders: ["@svgr/webpack"],
                as: "*.js",
            },
        },
    },
    productionBrowserSourceMaps: false,
};

export default nextConfig;
