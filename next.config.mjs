/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        "**/node_modules/**",
        "**/.git/**",
        "**/.next/**",
        "D:/DumpStack.log.tmp",
        "D:/System Volume Information",
        "D:/pagefile.sys",
      ],
    };
    return config;
  },
};
