'use strict';

const axios = require('axios');

const shortenArticleLink = article =>
	axios.post('https://devs.rest/',
		article.input_message_content.message_text).then(res =>
		Object.assign({}, article, {
			input_message_content: Object.assign({}, article.input_message_content, {
				message_text: 'https://devs.rest/' + res.data
			})
		}));

module.exports = shortenArticleLink;
