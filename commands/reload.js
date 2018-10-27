exports.run = (client, message, args) => {
  let command;
  if (client.commands.has(args[0])) {
    command = args[0];
  } else if (client.aliases.has(args[0])) {
    command = client.aliases.get(args[0]);
  }
  if (!command) {
    return message.channel.sendMessage(`No se encuentra el comando: ${args[0]}`);
  } else {
    message.channel.sendMessage(`Reconectando: ${command}`)
      .then(m => {
        client.reload(command)
          .then(() => {
            m.edit(`Reconeccion satisfactoria: ${command}`);
          })
          .catch(e => {
            m.edit(`La recarga del comando ha fallado: ${command}\n\`\`\`${e.stack}\`\`\``);
          });
      });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['r'],
  permLevel: 4
};

exports.help = {
  name: 'reload',
  description: 'Si ha sido actualizado o modificado, vuelve a cargar el archivo de comandos.',
  usage: 'reload <comando>'
};
