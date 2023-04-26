const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { createCanvas, GlobalFonts, loadImage } = require('@napi-rs/canvas');
const moment = require('moment');
const crypto = require('crypto');
const { mongodbUri } = require('../../data/config.json');
const { MongoClient } = require('mongodb');


const dbClient = new MongoClient(String(mongodbUri));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lolilicense')
        .setDescription('get a qualified loli license')
        .setDMPermission(false),
    enable: true,

    async execute(interaction) {
        await interaction.deferReply();
        const filter = {
            _id: 'loli',
        };
        await dbClient.connect();
        const db = dbClient.db("cyberpunkxxx");
        const collection = db.collection("cooldowns");
        const result = await collection.findOne(filter)
        const expires = Date.now() + 30 * 1000;
        const document = {
            "_id": 'loli',
            "expires": expires
        };
        const user = interaction.user;
        let avatar = '';
        if (!user.avatar) {
            avatar = 'https://cdn.discordapp.com/embed/avatars/0.png';
        } else {
            avatar = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=1024`;
        }

        const canvas = createCanvas(853, 512);
        const context = canvas.getContext('2d');
        context.font = '20pt "Arial"';

        const dem = {
            agent_name: {
                x: 192,
                y: 155,
            },
            agent_num: {
                x: 192,
                y: 222,
                num: [2, 8].map(n => crypto.randomBytes(n / 2).toString("hex")).join("-").toUpperCase()
            },
            sex: {
                x: 417,
                y: 152,
            },
            birth: {
                x: 417,
                y: 222,
                date: moment().subtract(Math.floor(Math.random() * (40 - 18 + 1) + 18), 'y').format('MMM/DD/YYYY')
            },
            limit: {
                x: 417,
                y: 291,
            },
            expires: {
                x: 319,
                y: 415,
                date: moment().add(20, 'y').format('MMM/DD/YYYY')
            },
            avatar: {
                x: 654,
                y: 46,
                width: 152,
                height: 218,
                path: avatar
            },
            base: 'src/data/media/images/lolilicense.png',
        };

        let sex = ['Male', 'Female', 'Binary', 'Souleater'];
        sex = sex[Math.floor(Math.random() * sex.length)];

        let limit = ['One time only', 'Unlimited', 'Siblings only', 'UwU', 'Souleater'];
        limit = limit[Math.floor(Math.random() * limit.length)];

        loadImage(dem.base).then(async (data) => {
            loadImage(dem.avatar.path).then(async (avatar) => {
                context.drawImage(data, 0, 0, canvas.width, canvas.height);
                context.drawImage(avatar, dem.avatar.x, dem.avatar.y, dem.avatar.width, dem.avatar.height)
                context.fillStyle = '#000000';
                context.fillText(user.username, dem.agent_name.x, dem.agent_name.y);
                context.fillText(dem.agent_num.num, dem.agent_num.x, dem.agent_num.y);
                context.fillText(sex, dem.sex.x, dem.sex.y);
                context.fillText(limit, dem.limit.x, dem.limit.y);
                context.fillText(dem.birth.date, dem.birth.x, dem.birth.y);
                context.fillText(dem.expires.date, dem.expires.x, dem.expires.y);

                const imgBuffer = canvas.toBuffer('image/png')
                const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'lolilicense.jpg' });
                if (!result) {
                    await collection.insertOne(document);
                    return interaction.editReply({ files: [attachment] });
                }
                if (result.expires > Date.now()) {
                    return interaction.editReply('Please try again in 30 seconds!')
                }
                const updateDocument = {
					$set: {
						"expires": expires
					},
				};
                await collection.updateOne(filter, updateDocument);
                return interaction.editReply({ files: [attachment] });

            });
        });
    },
};