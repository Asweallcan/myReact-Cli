module.exports = {
  plugins: [
    require("autoprefixer")({
      browsers: ["last 10 Chrome versions", "last 5 Firefox versions", "Safari >= 6", "ie> 8", "iOS >= 8", "Firefox >= 20", "Android > 4.4"]
    })
  ],
  minimize: true
};
