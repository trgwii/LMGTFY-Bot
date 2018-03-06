'use strict';

const R = require('ramda');

const config = require('./loadconfig');

const { createHash } = require('crypto');

const hash = str => {
	const h = createHash(config.hashAlgorithm);
	h.update(str);
	return h.digest('hex');
};

const uri = R.compose(
	R.replace(/%20/g, '+'),
	encodeURIComponent);

const useTemplate = str =>
	str.replace(/\{(\w+)\}/g, (_, name) => config.data[name]);

module.exports = {
	hash,
	uri,
	useTemplate
};
