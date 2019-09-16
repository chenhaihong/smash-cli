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
    image: '/img/smash-cli.svg',
    infoLink: 'https://www.smash-cli.com',
    pinned: true,
  },
];

const siteConfig = {
  title: 'smash-cli', // Title for your website.
  tagline: 'A tiny task manager for modern JavaScript projects.',
  url: 'https://www.smash-cli.com', // Your website URL
  // baseUrl: '/smash-cli/', // Base URL for your project */
  baseUrl: '/', // Base URL for your project */
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
    // { page: 'index', label: 'Home' },
    {
      doc: 'documentation/getting-started/what-is-smash-cli',
      label: 'Documentation',
    },
    { doc: 'examples/usage/using-a-template', label: 'Examples' },
    // { page: 'help', label: 'Help' },
    { blog: true, label: 'Blog' },
    {
      external: true,
      href: 'https://github.com/chenhaihong/smash-cli',
      label: 'GitHub',
    },
    // { search: true },
    // { languages: true },
  ],
  // algolia: {},

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: 'img/favicon-white.ico',
  footerIcon: 'img/favicon-white.ico',
  favicon: 'img/favicon-black.ico',

  /* Colors for website */
  colors: {
    primaryColor: '#20232a',
    secondaryColor: '#282c34',
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
  cleanUrl: false,

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

  // disableTitleTagline: true,
  docsSideNavCollapsible: true,
  editUrl:
    'https://github.com/chenhaihong/smash-cli/edit/master/docusaurus/docs/',
  scrollToTop: true,
  useEnglishUrl: false,
};

module.exports = siteConfig;
