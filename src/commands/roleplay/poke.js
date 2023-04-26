const { SlashCommandBuilder } = require('@discordjs/builders');
const { color } = require('../../data/config.json');
const { EmbedBuilder } = require('discord.js');
const { fetchRandom } = require('nekos-best.js');

module.exports = {
    enable: true,
    data: new SlashCommandBuilder()
        .setName('poke')
        .setDescription("poke poke poke poke poke")
        .addStringOption(option => option.setName('extra').setDescription('learn2read'))
		.setDMPermission(false),

    async execute(interaction) {
        let extra = interaction.options.getString('extra');

        async function fetchImage() {
            const response = await fetchRandom('poke');
            return response.results[0].url;
        }

        const img = await fetchImage();

        if (!extra) {
            extra = '';
        }
        const embed = new EmbedBuilder()
            .setDescription(`${interaction.user} pokes ${extra}`)
            .setColor(color)
            .setImage(img);

        await interaction.reply({ embeds: [embed] });

    },
};