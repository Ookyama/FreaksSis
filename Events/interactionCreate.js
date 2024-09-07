const { Client, BaseInteraction } = require("discord.js");

module.exports = {
    /**
     * 
     * @param {Client} bot
     * @param {BaseInteraction} interaction 
     */
    async execute(bot, interaction) {
        console.log(interaction)

        const command = bot.commands.get(interaction.commandName)
        if (command) {
            command.execute(bot, interaction)
        }
    }
}