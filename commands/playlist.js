const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("playlist")
    .setDescription("현재 플레이리스트를 보여줍니다")
    .addNumberOption(option => 
      option.setName('page')
        .setDescription('페이지 번호')
        .setMinValue(1)
    ),
  async execute(interaction) {
    const queue = interaction.client.player.getQueue(interaction.guild.id);
    if (!queue || !queue.playing)
      return await interaction.editReply("플레이리스트가 없습니다!");

    const totalPage = Math.ceil(queue.tracks.length / 10) || 1;
    const page = (interaction.options.getNumber('page') || 1) - 1

    if(page >= totalPage)
      return await interaction.editReply(`마지막 페이지는 ${totalPage}입니다!`);

    const playList = queue.tracks.slice(page * 10, page * 10 + 10).map((song, idx) => {
      return `**${page * 10 + idx + 1}.** \`[${song.duration}]\`  ${song.title} -- by <@${song.requestedBy.id}>`
    }).join('\n');

    const currentSong = queue.current;

    const embed = new EmbedBuilder()
      .setTitle('playList')
      .setDescription(`**현재 곡**\n` + 
      (currentSong ? `\`[${currentSong.duration}]\`  ${currentSong.title} -- by <@${currentSong.requestedBy.id}>` : "None") +
      `\n\n**playlist**\n${playList}`
      )
      .setThumbnail(currentSong.thumbnail)
      .setFooter({ text: `Page ${page + 1} of ${totalPage}` });

    await interaction.editReply({ embeds: [embed] });
  }
};
