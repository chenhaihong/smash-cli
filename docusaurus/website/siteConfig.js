/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
const users = [
  {
    caption: 'smash-cli',
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/image.jpg'.
    image: '/smash-cli/img/undraw_code_review.svg',
    infoLink: 'https://www.smash-cli.com',
    pinned: true,
  },
];

const siteConfig = {
  title: 'smash-cli@0.0.9', // Title for your website.
  tagline: 'A tiny task manager for JavaScript projects.',
  url: 'https://chenhaihong.github.io', // Your website URL
  baseUrl: '/smash-cli/', // Base URL for your project */
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // Used for publishing and more
  projectName: 'smash-cli',
  organizationName: 'chenhaihong',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    { doc: 'getting-started/what-is-smash-cli', label: 'Docs' },
    { doc: 'apis/helper-packages/smash-helper-logger', label: 'API' },
    { page: 'help', label: 'Help' },
    { blog: true, label: 'Blog' },
    {
      href: 'https://github.com/chenhaihong/smash-cli',
      label: 'GitHub',
    },
    // { search: true },
    { languages: true },
  ],
  // algolia: {},

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: 'img/favicon.ico',
  footerIcon: 'img/favicon.ico',
  favicon: 'img/favicon.ico',

  /* Colors for website */
  colors: {
    primaryColor: '#0099FF', //'#13316b',
    secondaryColor: '#0099FF',
  },

  /* Custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} www.smash-cli.com`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
    theme: 'atom-one-dark',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ['https://buttons.github.io/buttons.js'],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/undraw_online.svg',
  twitterImage: 'img/undraw_tweetstorm.svg',

  // For sites with a sizable amount of content, set collapsible to true.
  // Expand/collapse the links and subcategories under categories.
  // docsSideNavCollapsible: true,

  // Show documentation's last contributor's name.
  // enableUpdateBy: true,

  // Show documentation's last update time.
  // enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  repoUrl: 'https://github.com/chenhaihong/smash-cli',
};

module.exports = siteConfig;
