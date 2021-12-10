module.exports = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
    };
    return config;
  },
  target: "experimental-serverless-trace",
};
