import withPWA from "next-pwa";

const pwa = withPWA({
    dest : "public", // 서비스 워커
    register : true, // 서비스 워커 자동 등록
    skipWaiting : true, // 새로운 서비스 워커가 즉시 활성화
    disable: process.env.NODE_ENV === "production" ? false : true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode : true,
    webpack(config){
        config.module.rules.push({
            test : /\.svg$/,
            use : ["@svgr/webpack"]
        })
        return config;
    },
    async rewrites(){
        return [
            {
                source: '/back/:path*',
                destination: `${process.env.API_URL}/:path*`,
            },
        ]
    }
};

export default pwa(nextConfig);
