module.exports = {
  webpack: (config, { webpack }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      child_process: false,
      readline: false,
      jsconfigPaths: true,
    };
    config.plugins.push(
      new webpack.IgnorePlugin({ resourceRegExp: /^electron$/ })
    );
    config.resolve.alias[package.name] = path.resolve(__dirname, "src");
    return config;
  },
};
