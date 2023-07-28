const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("현재 재생중인 노래를 건너뜁니다"),
  async execute(interaction) {
    const queue = interaction.client.player.getQueue(interaction.guild.id);
    if (!queue || !queue.playing)
      return await interaction.editReply("건너뛸 노래가 없습니다!");

    await queue.skip();

    interaction.editReply('성공적으로 노래를 건너뛰었습니다!');
  }
};
