module.exports = (guild, user) => {
  guild.defaultChannel.sendMessage(`${user.username} se ha quitado el ban sobre él!`);
};
