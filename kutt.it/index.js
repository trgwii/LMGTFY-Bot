'use strict';

const config = require('../loadconfig');

const axios = require('axios');

const createShortener = url =>
	axios.post('https://kutt.it/api/url/submit', {
		...config['kutt.it'],
		target: url
	}).then(res =>
		res.data.shortUrl);

module.exports = createShortener;
