const { SlashCommandBuilder } = require('@discordjs/builders');
const { color } = require('../../data/config.json');
const { EmbedBuilder } = require('discord.js');
const { fetchRandom } = require ('nekos-best.js');

module.exports = {
    enable: true,
    data: new SlashCommandBuilder()
        .setName('neko')
        .setDescription('Returns a random neko')
        .addStringOption(option =>
            option.setName('amount')
                .setDescription('Defines how many images the bot should send')
                .setRequired(true)
                .addChoices(
                    {
                        name: 'One',
                        value: '1',
                    },
                    {
                        name: 'Five',
                        value: '5',
                    },
                    {
                        name: 'Ten',
                        value: '10',
                    },
                ))
		.setDMPermission(false),

        async execute(interaction) {
            await interaction.deferReply();
            let amount = interaction.options.getString('amount');
            amount = parseInt(amount);

            async function fetchImage() {
                const response = await fetchRandom('neko');
                return response.results[0];
            }

            const real_amount = amount - 1;
            const nekos = [];

			for (let i = 0; i <= real_amount; i++) {
				const neko = await fetchImage();
				nekos.push(neko);
			}

            const embeds = [];
            for (let i = 0; i <= real_amount; i++) {
                const embed = new EmbedBuilder()
                    .setColor(color)
                    .setTitle('Meow')
					.setDescription(`[${nekos[i].artist_name}](${nekos[i].source_url})`)
                    .setFooter({ text: 'From nekos.best' })
                    .setImage(nekos[i].url);
                embeds.push(embed);
            }

            await interaction.editReply({ embeds: embeds });
    },
};
