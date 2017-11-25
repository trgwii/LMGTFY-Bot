'use strict';

const axios = require('axios');

const shortenArticleLink = article =>
	axios.post('https://devs.sh/',
		article.input_message_content.message_text).then(res =>
		Object.assign({}, article, {
			input_message_content: Object.assign({}, article.input_message_content, {
				message_text: 'https://devs.sh/' + res.data
			})
		}));

module.exports = shortenArticleLink;
