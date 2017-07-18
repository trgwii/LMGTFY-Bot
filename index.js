'use strict';

const Telegraf = require('telegraf');

const { hash, uri, useTemplate } = require('./utils');

const config = require('./config');

const bot = new Telegraf(config.token);

for (const command in config.commands) {
	bot.command(command, ctx =>
		ctx.reply(useTemplate(config.commands[command])));
}

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

