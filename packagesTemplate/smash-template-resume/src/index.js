import './style/index.module';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Nav from './component/Nav';
import Hero from './component/Hero';
import AboutMe from './component/AboutMe';
import Experience from './component/Experience';
import Projects from './component/Projects';
import Education from './component/Education';
import Contact from './component/Contact';

class App extends Component {
  state = {};
  render() {
    return (
      <>
        <Nav />
        <Hero />
        <AboutMe />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </>
    );
  }
}

function render() {
  ReactDOM.render(<App />, document.getElementById('root'));
}
render();

// Re-render on Webpack HMR update:
if (module.hot) module.hot.accept(render);
