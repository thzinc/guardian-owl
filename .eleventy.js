module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets/**");
  eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
};
