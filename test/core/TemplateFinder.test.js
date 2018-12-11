#!/usr/bin/env node

const assert = require('assert');
const path = require('path');
const Config = require('../../src/config');
const TemplateFinder = require('../../src/core/TemplateFinder')(Config.TemplatesYmlUrl);

const actual = TemplateFinder.getTemplateList();
const expected = [
    {
        "title": "front-end",
        "list": [
            {
                "name": "smash-template-fe"
            },
            {
                "name": "smash-template-react"
            },
            {
                "name": "smash-template-vue"
            }
        ]
    },
    {
        "title": "node",
        "list": [
            {
                "name": "smash-template-node"
            },
            {
                "name": "smash-template-express"
            }
        ]
    },
    {
        "title": "middleware",
        "list": [
            {
                "name": "smash-template-helloworld"
            }
        ]
    }
];
assert.deepEqual(actual, expected);

console.log(`Testing finished.`);