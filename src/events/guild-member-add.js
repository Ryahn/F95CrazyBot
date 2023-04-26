const { EmbedBuilder } = require('discord.js');
const { MongoClient } = require('mongodb');
const logger = require('silly-logger');
const { mongodbUri } = require('../data/config.json');

const dbClient = new MongoClient(String(mongodbUri));

module.exports = {
	name: 'guildMemberAdd',
	once: false,
	async execute(member) {
		if (member.user.bot) return;
		const guildId = member.guild.id;
		const filter = {
			_id: guildId,
			userid: member.user.id
		};
		try {
			await dbClient.connect();
			const db = dbClient.db("cyberpunkxxx");
			const collection = db.collection("users");
			const result = await collection.findOne(filter);
			if (!result) {
				let avatar = '';
				if (!member.user.avatar) {
					avatar = 'https://cdn.discordapp.com/embed/avatars/0.png';
				} else {
					avatar = `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png?size=1024`;
				}
				const document = {
					"_id": member.user.id,
					"username": member.user.username,
					"tag": member.user.tag,
					"avatar": avatar,
				};
				await collection.insertOne(document);
				let findResult = await collection.findOne({
					"_id": member.user.id
				});
				logger.custom('DB', '#b080ff', '#F5A9F2','Added user in DB')
				logger.info(findResult)
				
			} else {
				const filter1 = {
					"_id": member.user.id
				};
				
				let avatar = '';
				if (!member.user.avatar) {
					avatar = 'https://cdn.discordapp.com/embed/avatars/0.png';
				} else {
					avatar = `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png?size=1024`;
				}
				
				const updateDocument = {
					$set: {
						"username": member.user.username,
						"tag": member.user.tag,
						"avatar": avatar
					},
				};

				await collection.updateOne(filter1, updateDocument);
				
				logger.custom('DB', '#b080ff', '#F5A9F2','Updated user in DB')

			}
			
		}
		catch (err) {
			logger.error(err);
		}
	},
};