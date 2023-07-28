const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { botName, embedColor } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
      .setName('help')
      .setDescription(`${botName}의 명령어를 알려줍니다!`),
    async execute(interaction) {
      const embed = new EmbedBuilder()
        .setColor(embedColor)
        .addFields(
            { name: '/help', value: `${botName}의 명령어를 알려줍니다` },
            { name: '/play [노래 제목]', value: '노래를 재생하거나 플레이리스트에 추가합니다' },
            { name: '/skip', value: '재생 중인 노래를 건너뜁니다.' },
            { name: '/playlist', value: '플레이리스트를 보여줍니다' },
            { name: '/clear [개수]', value: '개수만큼 메시지를 삭제합니다' },
        );

        interaction.editReply({embeds: [embed], ephemeral: true})
    } 
}