module.exports = {
  webpack: (config, { webpack }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      child_process: false,
      readline: false,
    };
    config.plugins.push(
      new webpack.IgnorePlugin({ resourceRegExp: /^electron$/ })
    );
    return config;
  },
  extends: ["plugin:@next/next/recommended"],
};
