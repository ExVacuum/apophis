const { Interaction } = require('discord.js')

const meta = {
    name: 'ping',
    description: 'Replies with Pong!'
}

/**
 * @param {Interaction} interaction
 */
async function entry_point(interaction) {
   await interaction.reply('Pong!');
}

module.exports = {
    meta,
    entry_point
}
