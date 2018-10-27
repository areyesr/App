module.exports = member => {
  let guild = member.guild;
  guild.defaultChannel.sendMessage(`Diganle adios a ${member.user.username}, lo extrañaremos!`);
};
