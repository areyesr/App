const Discord = require("discord.js");
const Report = require("../models/reports.js");
const mongoose = require("mongoose");
//mongoose.connect('mongodb://localhost/Reports');

module.exports.run = async (client, message, args) => {
  await message.delete();
  if(message.author.id != '393561088756809729') return;
  mongoose.connect('mongodb://localhost/Reports');
  let rUser = message.mentions.members.first();
  if (!rUser) return message.reply("No se encuentra el usuario");
  let rreason = args.slice(1).join(" ");
  if (!rreason) return message.reply("Favor incluya las razones");

  const report = new Report({
    _id: mongoose.Types.ObjectId(),
    username: rUser.user.username,
    userID: rUser.Id,
    reason: rreason,
    rUsername: message.author.username,
    rID: message.author.id,
    time: message.createdAt
  });
  report.save()
    .then(result => console.log(result))
    .catch(err => console.log(err));

    message.reply("El reporte ha sido enviado a la base de datos!")
  .then(sent => console.log(`Enviar respuesta a ${sent.author.username}`))
  .catch(console.error);


}
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

module.exports.help = {
  name: 'testreport',
  description: 'Reporte a la base de datos',
  usage: 'testreport'
};
