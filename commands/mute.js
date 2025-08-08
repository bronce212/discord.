const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Silencia a un usuario por un tiempo determinado.')
    .addUserOption(opt => 
      opt.setName('usuario')
         .setDescription('Usuario a silenciar')
         .setRequired(true))
    .addIntegerOption(opt =>
      opt.setName('tiempo')
         .setDescription('Duración del mute en minutos (opcional)')
         .setRequired(false))
    .addStringOption(opt =>
      opt.setName('razon')
         .setDescription('Razón del mute (opcional)')
         .setRequired(false)),
  async execute(interaction) {
    const user = interaction.options.getUser('usuario');
    const member = await interaction.guild.members.fetch(user.id);
    const role = interaction.guild.roles.cache.find(r => r.name === 'Muted');
    if (!role) return interaction.reply('❌ No existe el rol "Muted".');

    // Añadir el rol mute
    await member.roles.add(role);

    const tiempo = interaction.options.getInteger('tiempo');
    const razon = interaction.options.getString('razon') || 'No especificada';

    await interaction.reply(`🔇 ${user.tag} fue silenciado.${tiempo ? ` Duración: ${tiempo} minutos.` : ''} Razón: ${razon}`);

    // Si hay tiempo, programar quitar el mute
    if (tiempo) {
      setTimeout(async () => {
        if (member.roles.cache.has(role.id)) {
          await member.roles.remove(role);
          // Opcional: enviar mensaje al canal avisando que se terminó el mute
          interaction.channel.send(`🔈 ${user.tag} ya no está silenciado.`);
        }
      }, tiempo * 60 * 1000); // Convertir minutos a milisegundos
    }
  }
};
