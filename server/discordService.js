const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.login(process.env.DISCORD_BOT_TOKEN);
async function sendToDiscordChannel(channelId, message) {
  try {
    const channel = client.channels.cache.get(channelId);
    if (channel) {
      await channel.send(message);
    } else {
      console.error("Channel not found");
    }
  } catch (err) {
    console.error("Error sending message to Discord:", err);
  }
}

module.exports = { sendToDiscordChannel };
