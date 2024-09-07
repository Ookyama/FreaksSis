const { Client, GatewayIntentBits, Partials, Collection, Options } = require('discord.js')

const http = require("http")
const dotenv = require('dotenv');
const fs = require("fs")

dotenv.config();

const bot = new Client({
    allowedMentions: { repliedUser: true, parse: ['roles', 'users', 'everyone'] },
    intents: [GatewayIntentBits.GuildModeration, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildEmojisAndStickers], 
    partials: [Partials.Channel, Partials.GuildMember, Partials.Message, Partials.Reaction, Partials.User],
    sweepers: {
        ...Options.DefaultSweeperSettings,
    }
})

process.bot = bot
bot.commands = new Collection()
bot.chats = new Collection()
bot.cooldowns = new Map()
bot.debug = true

const commands = fs.readdirSync('./Commands').filter((file) => file.endsWith('.js'))
for (const command of commands) {
    const file = require(`./Commands/${command}`)
    bot.commands.set(file.name.toLowerCase(), file)
}

const events = fs.readdirSync('./Events')
for (const event of events) {
    const file = require(`./Events/${event}`)
    const name = event.split('.')[0]

    bot.on(name, file.execute.bind(null, bot))
}

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

process.on('uncaughtException', error => {
    console.error("Uncaught exception: ", error)
})

bot.login(process.env.Token)