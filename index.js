'use strict';

const Telegraf = require('telegraf');

const { hash, uri, useTemplate } = require('./utils');

const config = require('./config');

const bot = new Telegraf(config.token);

for (const command in config.commands) {
	bot.command(command, ctx =>
		ctx.reply(useTemplate(config.commands[command])));
}

const articleTransformers = config.sources
	.filter(sources => sources.articleTransformer)
	.reduce((result, source) =>
		Object.assign({}, result, {
			[source.name]: require('./' + source.articleTransformer)
		}), {});

const makeURL = (base, query) => query.length > 0
	? base + uri(query)
	: base + uri(config.emptyMessage);

const createArticle = (name, base, query) => ({
	type: 'article',
	id: hash(name + ':' + query),
	title: name,
	input_message_content: {
		message_text: makeURL(base, query),
		disable_web_page_preview: !config.preview
	},
	description: query
});

bot.on('inline_query', ctx => {

	const query = ctx.inlineQuery.query.trim();

	return Promise.all(config.sources
		.map(source =>
			createArticle(source.name, source.baseURL, query))
		.map(article => articleTransformers[article.title]
			? articleTransformers[article.title](article)
			: article))
		.then(articles =>
			ctx.answerInlineQuery(articles, {
				cache_time: config.cacheTime
			}));
});

bot.catch(console.error);

bot.startPolling();
