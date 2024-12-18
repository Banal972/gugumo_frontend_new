import withPWA from 'next-pwa';

const prod = process.env.NODE_ENV === 'production';

const pwa = withPWA({
  dest: 'public', // 서비스 워커
  register: true, // 서비스 워커 자동 등록
  disable: prod,
  skipWaiting: true, // 새로운 서비스 워커가 즉시 활성화
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default pwa(nextConfig);
