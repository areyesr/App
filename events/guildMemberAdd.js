module.exports = member => {
  let guild = member.guild;
  guild.defaultChannel.send(`${member.user.username} gracias por conectarte al servidor!`);
};
