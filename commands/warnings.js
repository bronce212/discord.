const { SlashCommandBuilder } = require('discord.js');
const mongoose = require('mongoose');
const Warn = mongoose.model('Warn');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warnings')
    .setDescription('Muestra advertencias de un usuario.')
    .addUserOption(opt => opt.setName('usuario').setDescription('Usuario').setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('usuario');
    const data = await Warn.findOne({ guildId: interaction.guild.id, userId: user.id });

    if (!data || data.warnings.length === 0)
      return interaction.reply('✅ Este usuario no tiene advertencias.');

    const list = data.warnings.map((w, i) => `**${i + 1}.** ${w.reason} (${w.date.toLocaleDateString()})`).join('\n');
    await interaction.reply(`⚠️ Advertencias para ${user.tag}:\n${list}`);
  }
};
