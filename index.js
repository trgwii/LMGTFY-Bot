'use strict';

const R = require('ramda');

const Telegraf = require('telegraf');

const { hash, uri, useTemplate } = require('./utils');

const config = require('./loadconfig');

const bot = new Telegraf(config.token);

R.mapObjIndexed(
	(text, name) =>
		bot.command(name, ctx =>
			ctx.reply(useTemplate(text))),
	config.commands);

const requireSubFiles = prop => R.compose(
	R.fromPairs,
	R.map(R.converge(
		R.pair, [
			R.prop('name'),
			R.compose(
				require,
				R.concat('./'),
				R.prop(prop))
		])),
	R.filter(R.has(prop)));

const urlTransformers =
	requireSubFiles('urlTransformer')(config.sources);

const makeURL = (base, query) => query.length > 0
	? base + uri(query)
	: base + uri(config.emptyMessage);

const createArticle = async (name, base, query, transformer) => ({
	description: query,
	id: hash(name + ':' + query),
	input_message_content: {
		disable_web_page_preview: !config.preview,
		message_text: transformer
			? await transformer(makeURL(base, query))
			: makeURL(base, query)
	},
	title: name,
	type: 'article'
});

bot.on('inline_query', async ctx => {

	const query = ctx.inlineQuery.query.trim();

	const articles = await Promise.all(config.sources
		.map(source =>
			createArticle(
				source.name,
				source.baseURL,
				query,
				urlTransformers[source.name])));

	return ctx.answerInlineQuery(articles, {
		cache_time: config.cacheTime
	});
});

bot.catch(console.error);

bot.startPolling();
