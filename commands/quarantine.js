const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('quarantine')
    .setDescription('Restringe al usuario.')
    .addUserOption(opt => opt.setName('usuario').setDescription('Usuario').setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('usuario');
    const member = await interaction.guild.members.fetch(user.id);
    const role = interaction.guild.roles.cache.find(r => r.name === 'Quarantine');

    await member.roles.add(role);
    await interaction.reply(`🚨 ${user.tag} fue puesto en cuarentena.`);
  }
};
