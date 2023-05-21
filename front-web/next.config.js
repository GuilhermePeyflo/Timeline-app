/** @type {import('next').NextConfig} */
// exemplo de dados no images.domains: ["avatars.githubusercontent.com","localhost"]
const nextConfig = {
    images: {
        domains: JSON.parse(process.env.DOMAINS)
    }
}

module.exports = nextConfig
