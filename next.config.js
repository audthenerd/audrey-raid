/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/api/add-transaction',
                destination: '/summary',
                permanent: true,
            },
        ]
    }
}

module.exports = nextConfig
