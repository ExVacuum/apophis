const { CommandInteraction, MessageAttachment } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');
const gm = require('gm');
const bent = require('bent');

const getBuffer = bent('buffer');

const meta = new SlashCommandBuilder()
    .setName('how')
    .setDescription('Generates a demotivational poster meme')
    .addAttachmentOption(option => option
        .setName('source')
        .setDescription('To be framed inside poster, images only (for now)')
        .setRequired(true))
    .addStringOption(option => option
        .setName('caption')
        .setDescription('Your best motivational statement'))
    .addBooleanOption(option => option
        .setName('secret')
        .setDescription('Should we keep this between us?'))
    .toJSON();

/**
 * @param {CommandInteraction} interaction
 */
async function entry_point(interaction) {
    await interaction.deferReply({ ephemeral: interaction.options.getBoolean('secret') });
    const source = interaction.options.getAttachment('source');
    if (!source.contentType.includes('image/')) {
        await interaction.editReply('Provided attachment was not a supported image file.');
        return;
    }
    const caption = interaction.options.getString('caption') ?? 'How';

    let bigdim = Math.max(source.width, source.height);
    const scale = Math.max(Math.min(1, 1280/bigdim), 640/bigdim);
    bigdim = bigdim * scale;
    gm(await getBuffer(source.url))
        .resize(source.width * scale, source.height * scale)
        .borderColor('black').border(bigdim/32, bigdim/32)
        .borderColor('white').border(bigdim/256, bigdim/256)
        .borderColor('black').border(bigdim/8, bigdim/8)
        .fill('white')
        .fontSize(bigdim/8*0.75)
        .font('Times')
        .drawText(0, bigdim/32, caption, 'South')
        .compress('JPEG')
        .toBuffer('JPG', async (err, buf) => {
            if (err) {
                console.log(source.url);
                console.error(err);
                await interaction.editReply('Sorry, there was an error processing the image. Please try again or use a different image.');
                return;
            }
            await interaction.editReply({ files: [new MessageAttachment(buf, `${caption}.png`)] });
        });
}

module.exports = {
    meta,
    entry_point
}
