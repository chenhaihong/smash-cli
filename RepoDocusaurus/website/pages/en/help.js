/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

function Help(props) {
  const { config: siteConfig, language = '' } = props;
  const { baseUrl, docsUrl } = siteConfig;
  const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
  const langPart = `${language ? `${language}/` : ''}`;
  // const docUrl = (doc) => `${baseUrl}${docsPart}${langPart}${doc}`;
  const docUrl = (doc) => `${baseUrl}${docsPart}${doc}`;

  const documentationLink = docUrl('documentation/getting-started/what-is-smash-cli.html');
  const examplesLink = docUrl('examples/usage/using-a-template.html');

  const yuqueLink = 'https://www.yuque.com/smash-cli';
  const repoLink = 'https://github.com/chenhaihong/smash-cli';
  const issuesLink = 'https://github.com/chenhaihong/smash-cli/issues';
  const pullsLink = 'https://github.com/chenhaihong/smash-cli/pulls';
  const supportLinks = [
    {
      content: `Learn more using the [documentation on this site](${documentationLink}).`,
      title: 'Browse Documentation',
    },
    {
      content: `Learn more using the [examples on this site](${examplesLink}).`,
      title: 'Browse Examples',
    },
    {
      content: `You can follow and contact us on [Yuque](${yuqueLink}).`,
      title: 'Yuque',
    },
    {
      content: `At our [GitHub repo](${repoLink}) Browse and submit [issues](${issuesLink}) or [pull requests](${pullsLink}) for bugs you find or any new features you may want implemented.`,
      title: 'GitHub',
    },
  ];

  return (
    <div className='docMainWrapper wrapper'>
      <Container className='mainContainer documentContainer postContainer'>
        <div className='post'>
          <header className='postHeader'>
            <h1>Need help?</h1>
          </header>
          <p>If you need help with smash-cli, you can try one of the mechanisms below.</p>
          <GridBlock contents={supportLinks} layout='fourColumn' />
        </div>
      </Container>
    </div>
  );
}

Help.title = 'Help';

module.exports = Help;
