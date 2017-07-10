'use strict';

const { createHash } = require('crypto');

const Telegraf = require('telegraf');

const config = require('./config');

const hash = str => {
	const hash = createHash('sha256');
	hash.update(str);
	return hash.digest('hex');
};

const bot = new Telegraf(config.token);

const uri = str =>
	encodeURIComponent(str).replace(/%20/g, '+');

bot.on('inline_query', ctx => {

	const query = ctx.inlineQuery.query.trim();

	const url = query.length > 0
		? config.baseURL + uri(query)
		: config.baseURL + uri(config.emptyMessage);

	ctx.answerInlineQuery([ {
		type: 'article',
		id: hash(query),
		title: config.messageTitle,
		input_message_content: {
			message_text: url
		},
		description: query
	} ], {
		cache_time: config.cacheTime
	});
});

bot.startPolling();
