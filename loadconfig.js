'use strict';

const mergeDeepRight = require('ramda/src/mergeDeepRight');

const defaults = require('./defaults.config');

const config = require('./config');

module.exports = mergeDeepRight(defaults, config);
