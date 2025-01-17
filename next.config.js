/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: false,
  i18n,
  images: {
    domains: ["avatars.mds.yandex.net", "www.avatars.mds.yandex.net"],
  },
  env: {
    SERVER_HOST: "https://gachibass.online:3002",
  },
};

module.exports = nextConfig;
