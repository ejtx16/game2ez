/** @type {import('next').NextConfig} */
const nextConfig = {
    // Server external packages (moved from experimental in Next.js 15)
    serverExternalPackages: [],
    // Enable TypeScript strict mode
    typescript: {
        ignoreBuildErrors: false,
    },
    // Enable ESLint during builds
    eslint: {
        ignoreDuringBuilds: false,
    },
    // Image optimization
    images: {
        domains: ['localhost'],
    },
}

module.exports = nextConfig
