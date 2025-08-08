const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('El bot repite un mensaje.')
    .addStringOption(opt => opt.setName('mensaje').setDescription('Mensaje a decir').setRequired(true)),
  async execute(interaction) {
    const mensaje = interaction.options.getString('mensaje');
    await interaction.reply({ content: mensaje });
  }
};
