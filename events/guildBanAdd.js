module.exports = (guild, user) => {
  guild.defaultChannel.sendMessage(`${user.username} ha sido banneado!`);
};
