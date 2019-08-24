/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    const docsUrl = this.props.config.docsUrl;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    // return `${baseUrl}${docsPart}${langPart}${doc}`;
    return `${baseUrl}${docsPart}${doc}`;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    // return baseUrl + (language ? `${language}/` : '') + doc;
    return baseUrl + doc;
  }

  renderDocumentation() {
    return (
      <div>
        <h5>Documentation</h5>
        <a
          href={this.docUrl(
            'documentation/getting-started/what-is-smash-cli.html',
            this.props.language
          )}
        >
          Getting Started
        </a>
        <a
          href={this.docUrl(
            'documentation/middlewares/smash-middleware-helloworld.html',
            this.props.language
          )}
        >
          Middlewares
        </a>
        <a
          href={this.docUrl(
            'documentation/templates/smash-template-react.html',
            this.props.language
          )}
        >
          Templates
        </a>
        <a
          href={this.docUrl(
            'documentation/apis/smash-cli.html',
            this.props.language
          )}
        >
          Programmatic APIs
        </a>
      </div>
    );
  }

  renderExamples() {
    return (
      <div>
        <h5>Examples</h5>
        <a
          href={this.docUrl(
            'examples/usage/using-a-template.html',
            this.props.language
          )}
        >
          Usage
        </a>
        <a
          href={this.docUrl(
            'examples/contribute/writing-a-template.html',
            this.props.language
          )}
        >
          Contribute
        </a>
      </div>
    );
  }

  renderCommunity() {
    return (
      <div>
        <h5>Community</h5>
        <a href={this.pageUrl('help.html', this.props.language)}>Help</a>
        <a href={this.pageUrl('users.html', this.props.language)}>
          User Showcase
        </a>
        <a
          rel='noreferrer noopener'
          href={`https://github.com/chenhaihong/smash-cli/issues`}
          target='_blank'
        >
          Issues
        </a>
        <a
          rel='noreferrer noopener'
          href={'https://www.yuque.com/smash-cli'}
          target='_blank'
        >
          Yuque
        </a>
      </div>
    );
  }

  renderMore() {
    return (
      <div>
        <h5>More</h5>
        <a href={`${this.props.config.baseUrl}blog`}>Blog</a>
        <a
          className='github-button'
          href={this.props.config.repoUrl}
          data-icon='octicon-star'
          data-count-href='/facebook/docusaurus/stargazers'
          data-show-count='true'
          data-count-aria-label='# stargazers on GitHub'
          aria-label='Star this project on GitHub'
        >
          Star
        </a>
        {this.props.config.twitterUsername && (
          <div className='social'>
            <a
              href={`https://twitter.com/${this.props.config.twitterUsername}`}
              className='twitter-follow-button'
            >
              Follow @{this.props.config.twitterUsername}
            </a>
          </div>
        )}
        {this.props.config.facebookAppId && (
          <div className='social'>
            <div
              className='fb-like'
              data-href={this.props.config.url}
              data-colorscheme='dark'
              data-layout='standard'
              data-share='true'
              data-width='225'
              data-show-faces='false'
            />
          </div>
        )}
      </div>
    );
  }

  render() {
    return (
      <footer className='nav-footer' id='footer'>
        <section className='sitemap'>
          <a href={this.props.config.baseUrl} className='nav-home'>
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width='66'
                height='58'
              />
            )}
          </a>
          {this.renderDocumentation()}
          {this.renderExamples()}
          {this.renderCommunity()}
          {this.renderMore()}
        </section>

        <a target='_blank' rel='noreferrer noopener' className='fbOpenSource'>
          <img
            src={`${this.props.config.baseUrl}img/favicon-white.ico`}
            alt='Facebook Open Source'
            width='100'
            height='100'
          />
        </a>
        <section className='copyright'>{this.props.config.copyright}</section>
      </footer>
    );
  }
}

module.exports = Footer;
