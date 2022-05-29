const { Interaction } = require('discord.js');
const child_process = require('child_process');
const { escapeMarkdown } = require('../util.js'); 

const meta = {
    name: 'server',
    description: 'Gets server info.'
}

/**
 * @param {Interaction} interaction
 */
async function entry_point(interaction) {
    const nf = child_process.spawnSync('neofetch -L && neofetch --off --no_config --color_blocks off', [], { shell: true }).stdout;
    await interaction.reply(`Server Info:\n\`\`\`ansi\n${
        nf.toString()
        .replace(/[`]/g, "​`")
        .replace(/(\[\?25[lh]\[\?7[lh])|(\[19A\[9999999D[\n]{20})/g, '')
    }\n\`\`\``);
}

module.exports = {
    meta,
    entry_point
}

