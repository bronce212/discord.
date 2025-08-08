const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('embed')
    .setDescription('Envía un mensaje embebido.')
    .addStringOption(opt => opt.setName('titulo').setDescription('Título').setRequired(true))
    .addStringOption(opt => opt.setName('descripcion').setDescription('Descripción').setRequired(true)),
  async execute(interaction) {
    const titulo = interaction.options.getString('titulo');
    const descripcion = interaction.options.getString('descripcion');

    const embed = new EmbedBuilder().setTitle(titulo).setDescription(descripcion).setColor('Blue');
    await interaction.reply({ embeds: [embed] });
  }
};
