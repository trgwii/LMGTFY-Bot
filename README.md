# LMGTFY bot

Hello! This bot will enable quick inline use of the [LMGTFY](https://lmgtfy.com/) service in the Telegram chat platform.

## Installation:

You'll need [NodeJS](https://nodejs.org/) to run this bot.

After you've installed that, open a terminal and type (or copy) the following:

	git clone https://github.com/trgwii/LMGTFY-Bot.git
	cd LMGTFY-Bot
	npm install
	cp example.config.json config.json


Now you need to speak to [BotFather](https://t.me/BotFather) within the Telegram application.

You'll need to create a bot if you didn't already, and get the token, then enable inline mode (use /setinline).

Next open config.json in your favorite text editor, and replace "BOT TOKEN HERE" with the token you got (Remember to surround it in "quotes").

Now you just have to run the following to start the bot:

	node .
