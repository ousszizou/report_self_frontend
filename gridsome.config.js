// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "خَبَّـرْنَا",
  icon: {
    favicon: "./src/assets/favicon.png",
    touchicon: "./src/assets/favicon.png",
  },
  siteUrl: process.env.SITE_URL ? process.env.SITE_URL : "",
  settings: {
    twitter: process.env.URL_TWITTER || false,
    linkedin: process.env.URL_LINKEDIN || false,
  },
  plugins: [
    {
      use: "@gridsome/source-filesystem",
      options: {
        baseDir: "./content",
        path: "**/cities.json",
        typeName: "cities",
      },
    },

    {
      use: "@gridsome/source-filesystem",
      options: {
        baseDir: "./content",
        path: "**/wilayas.json",
        typeName: "wilayas",
      },
    },

    {
      use: "gridsome-plugin-tailwindcss",
      options: {
        tailwindConfig: "./tailwind.config.js",
        purgeConfig: {
          // Prevent purging of prism classes.
          whitelistPatternsChildren: [/token$/],
        },
      },
    },

    {
      use: "@gridsome/plugin-google-analytics",
      options: {
        id: process.env.GA_ID ? process.env.GA_ID : "XX-999999999-9",
      },
    },

    {
      use: "@gridsome/plugin-sitemap",
      options: {},
    },
  ],
}
