const { Client, BaseInteraction } = require("discord.js");

module.exports = {
    name: 'slashtest',
    type: "slash",
    aliases: [],
    cooldown: 30,
    description: 'Slash command.',

    /**
     * 
     * @param {Client} bot 
     * @param {BaseInteraction} interaction 
     */
    async execute(bot, interaction) {
        interaction.reply("Hello World!")
    }
}