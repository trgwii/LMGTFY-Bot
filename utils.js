'use strict';

const config = require('./config');

const { createHash } = require('crypto');

const hash = str => {
	const hash = createHash(config.hashAlgorithm);
	hash.update(str);
	return hash.digest('hex');
};

const uri = str =>
	encodeURIComponent(str).replace(/%20/g, '+');

const useTemplate = str =>
	str.replace(/{(\w+)}/g, (_, name) => config.data[name]);

module.exports = {
	hash,
	uri,
	useTemplate
};

