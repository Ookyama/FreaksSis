const { spawn } = require("child_process");
const { Client, Message } = require("discord.js");

/**
 * 
 * @param {Client} bot
 */
module.exports = {
    /**
     * 
     * @param {Client} bot 
     */
    async execute(bot) {
        console.log("bot is online")

        bot.commands.forEach(command => {
            if (command.type == "slash") {
                bot.application.commands.create({
                    name: command.name,
                    description: command.description
                })

                // bot.guilds.cache.forEach(guild => {
                //     guild.commands.create({
                //         name: command.name,
                //         description: command.description
                //     })
                // })
            }
        })
    }
}