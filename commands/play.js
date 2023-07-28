const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { QueryType } = require('discord-player');
const youtubeCralwer = require('../utils/YoutubeCralwer');
const { embedColor } = require('../config.json');

const isAdd = {

}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('노래를 재생하거나 플레이리스트에 추가합니다')
    .addStringOption(option =>
      option.setName('title')
        .setDescription('노래 제목')
        .setRequired(true)  
    ),
  async execute (interaction) {
    if(!interaction.member.voice.channel)
      return interaction.editReply('채널에 먼저 참가해주세요!');

    if(isAdd[interaction.guild.id]) return interaction.editReply('다른 노래가 추가 중입니다! 기다려주세요!');
    isAdd[interaction.guild.id] = true;
    
    const player = interaction.client.player;

    let queue = await player.getQueue(interaction.guild.id);
    if(!queue) queue = await player.createQueue(interaction.guild);
    
    try {
      if(!queue.connection) await queue.connect(interaction.member.voice.channel);
    } catch {
      queue.destroy();
      isAdd[interaction.guild.id] = false;
      return await interaction.editReply({ content: '채널에 들어갈 수 없습니다!', ephemeral: true });
    }

    const title = interaction.options.getString('title');
    const res = await youtubeCralwer.getYoutubeURL(title); // 유튜브에 title로 검색한 첫 번째 영상의 정보

    const song = await player.search(res.url, {
      requestedBy: interaction.user,
      searchEngine: QueryType.YOUTUBE_VIDEO
    }).then(x => x.tracks[0]);
    if(!song) {
      isAdd[interaction.guild.id] = false;
      return interaction.editReply('검색결과가 없습니다');
    }
      
    await queue.addTrack(song);

    const embed = new EmbedBuilder()
      .setColor(embedColor)
      .setTitle(res.title)
      .setURL(res.url)
      .setDescription(res.time)
      .setImage(res.imgURL)

    interaction.editReply({ embeds: [embed] });

    if(!queue.playing) await queue.play();
    isAdd[interaction.guild.id] = false;
  }

}