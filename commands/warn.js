const { SlashCommandBuilder } = require('discord.js');
const mongoose = require('mongoose');

const warnSchema = new mongoose.Schema({
  guildId: String,
  userId: String,
  warnings: [{ reason: String, date: Date }]
});
const Warn = mongoose.model('Warn', warnSchema);

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Advierte a un usuario.')
    .addUserOption(opt => opt.setName('usuario').setDescription('Usuario').setRequired(true))
    .addStringOption(opt => opt.setName('razon').setDescription('Razón').setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('usuario');
    const reason = interaction.options.getString('razon');

    let warnData = await Warn.findOne({ guildId: interaction.guild.id, userId: user.id });
    if (!warnData) {
      warnData = new Warn({ guildId: interaction.guild.id, userId: user.id, warnings: [] });
    }

    warnData.warnings.push({ reason, date: new Date() });
    await warnData.save();

    await interaction.reply(`⚠️ ${user.tag} ha sido advertido. Razón: ${reason}`);
  }
};
