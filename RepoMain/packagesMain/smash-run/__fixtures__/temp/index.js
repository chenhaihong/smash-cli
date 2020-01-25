const pacote = require('pacote');

// get a package manifest
pacote.manifest('@babel/core').then((manifest) => console.log('got it', manifest));
