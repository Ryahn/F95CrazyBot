const { SlashCommandBuilder } = require('@discordjs/builders');
const { color } = require('../../data/config.json');
const { EmbedBuilder } = require('discord.js');
const { fetchRandom } = require('nekos-best.js');

module.exports = {
    enable: true,
    data: new SlashCommandBuilder()
        .setName('baka')
        .setDescription("stupid")
        .addStringOption(option => option.setName('extra').setDescription('learn2read'))
		.setDMPermission(false),

    async execute(interaction) {
        async function fetchImage() {
            const response = await fetchRandom('baka');
            return response.results[0].url;
        }

        const img = await fetchImage();
        const embed = new EmbedBuilder()
            .setTitle('stupid!')
            .setDescription(`${interaction.user} went tsundere`)
            .setColor(color)
            .setImage(img);

        await interaction.reply({ embeds: [embed] });

    },
};