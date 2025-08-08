const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('unlock').setDescription('Desbloquea este canal.'),
  async execute(interaction) {
    const channel = interaction.channel;
    await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
      SendMessages: true,
    });
    await interaction.reply('🔓 Canal desbloqueado.');
  }
};
