const { SlashCommandBuilder } = require('@discordjs/builders');
const { color } = require('../../data/config.json');
const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    enable: true,
    data: new SlashCommandBuilder()
        .setName('waifu')
        .setDescription('Returns a random waifu pic')
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
            const amount = interaction.options.getString('amount');

            async function fetchImage() {
                const response = await fetch('https://api.waifu.pics/sfw/waifu');
                const data = await response.json();
                const img_url = data.url;
                return img_url;
            }

            const real_amount = amount - 1;
            const embed = new EmbedBuilder()
                .setColor(color)
                .setTitle('Random waifu pic?')
                .setFooter({ text: 'From waifu.pics' })
                .setImage(await fetchImage());


            await interaction.reply({ embeds: [embed] });
            for (let i = 0; i < real_amount; i++){
                embed.setImage(await fetchImage());
                await interaction.followUp({ embeds: [embed] });
        }
    },
};