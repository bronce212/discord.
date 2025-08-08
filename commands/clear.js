const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Elimina mensajes del canal.')
    .addIntegerOption(opt => opt.setName('cantidad').setDescription('Cantidad a borrar').setRequired(true)),
  async execute(interaction) {
    const amount = interaction.options.getInteger('cantidad');
    await interaction.channel.bulkDelete(amount, true);
    await interaction.reply({ content: `🧹 ${amount} mensajes eliminados.`, ephemeral: true });
  }
};
