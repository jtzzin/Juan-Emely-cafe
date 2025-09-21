module.exports = {
  presets: ["babel-preset-expo"],
  plugins: [
    "nativewind/babel", 
    [
      "module-resolver",
      {
        alias: {
          "@": "./src",
        },
      },
    ],
  ],
};
