'use strict';

const Telegraf = require('telegraf');

const { hash, uri, useTemplate } = require('./utils');

const config = require('./config');

const bot = new Telegraf(config.token);

for (const command in config.commands) {
	bot.command(command, ctx =>
		ctx.reply(useTemplate(config.commands[command])));
}

const makeURL = (source, query) => query.length > 0
	? source.baseURL + uri(query)
	: source.baseURL + uri(config.emptyMessage);

bot.on('inline_query', ctx => {

	const query = ctx.inlineQuery.query.trim();

	ctx.answerInlineQuery(config.sources.map(source => ({
		type: 'article',
		id: hash(source.name + ':' + query),
		title: source.name,
		input_message_content: {
			message_text: makeURL(source, query)
		},
		description: query
	})), {
		cache_time: config.cacheTime
	});
});

bot.startPolling();

