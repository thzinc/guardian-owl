const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPassthroughCopy("assets/risk_calculator.js");
  eleventyConfig.addPassthroughCopy("assets/main.css");
  eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

  return {
    pathPrefix: "/guardian-owl/",
  };
};
