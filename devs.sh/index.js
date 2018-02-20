'use strict';

const axios = require('axios');

const shorten = url =>
	axios.post('https://devs.sh/', url)
		.then(res =>
			'https://devs.sh/' + res.data);

module.exports = shorten;
