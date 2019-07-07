module.exports = function(api) {
  api.cache(true);
  const presets = [
    "@babel/preset-react",
    [
      "@babel/preset-env",
      {
        useBuiltIns: "entry",
        targets: {
          browsers: ["last 2 versions", "safari >= 7"]
        },
        modules: false
      }
    ]
  ];
  const plugins = [
    "@babel/plugin-proposal-class-properties",
    [
      "@babel/plugin-transform-runtime",
      { runtimeHelpers: true, regenerator: true }
    ]
  ];
  return { presets, plugins };
};
