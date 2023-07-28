const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('채팅을 청소해줍니다!')
    .addNumberOption(option =>
      option.setName('cnt')
      .setDescription('청소할 채팅의 개수 ( 100 미만')
      .setMinValue(1)
      .setRequired(true)
    ),
  async execute(interaction) {
    const cnt = interaction.options.getNumber('cnt');

    if(cnt > 99) return interaction.editReply("알맞지 않은 수입니다!");
    
    if(interaction.guild.id === '1055014349518929991') {
      if(!interaction.member.roles.cache.has('1058692584454758471'))
        return await interaction.editReply('이 명령어를 사용할 권한이 없습니다!');
    }

    interaction.channel.bulkDelete(cnt + 1, true).catch();
  } 
}