const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Expulsa a un miembro.')
    .addUserOption(opt => opt.setName('usuario').setDescription('Usuario a expulsar').setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('usuario');
    const member = await interaction.guild.members.fetch(user.id);
    if (!interaction.member.permissions.has(PermissionFlagsBits.KickMembers))
      return interaction.reply({ content: '❌ No tienes permiso.', ephemeral: true });

    await member.kick();
    await interaction.reply(`✅ ${user.tag} fue expulsado.`);
  }
};
