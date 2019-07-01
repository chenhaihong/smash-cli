const smash = require('.');

describe('smash-cli/index.js', () => {
    test('mese should have expected properties', () => {
        expect(smash).toHaveProperty('init');
        expect(smash).toHaveProperty('install');
        expect(smash).toHaveProperty('run');
    });
});
