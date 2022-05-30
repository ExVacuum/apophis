const { Interaction } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const child_process = require('child_process');

const meta = new SlashCommandBuilder()
    .setName('server')
    .setDescription('Gets server info')
    .toJSON();

/**
 * @param {CommandInteraction} interaction
 */
async function entry_point(interaction) {
    const nf = child_process.spawnSync('neofetch -L && neofetch --off --no_config --color_blocks off', [], { shell: true }).stdout;
    await interaction.reply(`Server Info:\n\`\`\`ansi\n${
        nf.toString()
        .replace(/[`]/g, "​`")
        .replace(/(\[\?25[lh]\[\?7[lh])|(\[1[0-9]A\[9999999D[\n]+)/g, '')
    }\n\`\`\``);
}

module.exports = {
    meta,
    entry_point
}

