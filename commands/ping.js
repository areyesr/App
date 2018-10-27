exports.run = (client, message) => {
  message.channel.sendMessage('Ping?')
    .then(msg => {
      msg.edit(`Pong! (took: ${msg.createdTimestamp - message.createdTimestamp}ms)`);
    });
};

exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ping',
  description: 'Comando Ping/Pong. Me pregunto qué hace exactamente éste comando? /sarcasmo',
  usage: 'ping'
};
