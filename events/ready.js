const { Events } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`bot logged in as - ${client.user.tag} || participated in - ${client.guilds.cache.size}`)
    client.user.setActivity("🎶 | Music Time", {
      type: 'LISTENING'
    });
  }
} 