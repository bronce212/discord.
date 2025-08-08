const keep_alive = require('./keep_alive.js');
const { Client, GatewayIntentBits, Partials, Collection, Events } = require('discord.js');
const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel]
});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, c => {
  console.log(`✅ Bot listo como ${c.user.tag}`);

  // Aquí configuramos el estado personalizado:
  client.user.setActivity('Dynasty space', { type: 'WATCHING' });
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  console.log(`Comando recibido: ${interaction.commandName}`);  // Log para ver comandos

  const command = client.commands.get(interaction.commandName);
  if (!command) {
    console.log(`No se encontró el comando: ${interaction.commandName}`);
    return;
  }
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: '❌ Error ejecutando el comando.', ephemeral: true });
  }
});

// Conectamos una sola vez a MongoDB y luego hacemos login del bot
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("✅ Conectado a MongoDB");
  client.login(process.env.BOT_TOKEN);
}).catch(err => {
  console.error("❌ Error conectando a MongoDB:", err);
});


