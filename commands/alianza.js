const Discord = require("discord.js");
//const settings = require('../settings.json');
const confTravian = require('../confTravian.json');
const funciones = require("../function/funciones.js");
//const Report = require("../models/reports.js");

module.exports.run = async (client, message, args) => {
//if(message.author.id != '393561088756809729') return;
    var estaAlly = funciones.buscarNombreAlly(client, message);
    console.log(estaAlly)
    if (estaAlly===""){

    }else if (estaAlly != '') {
      var resul = funciones.verLimitesAlly(estaAlly);
        const msgAlly = new Discord.RichEmbed()
        .setTitle(`<a:g18ltr:496525362780438550> Alianza - ${estaAlly}`)
        .setColor('0xe8b548')
        .addField(`La alianza a la que perteneces es a la ${estaAlly}`,`\n${resul}\n`,true)
        .setThumbnail(`https://gpack.travian.com/a4511576/mainPage/img_ltr/welcomeScreen/riseOfAlliances/senator-ltr.png`)
        .setFooter(`Enviado por ${message.author.username}`,message.author.displayAvatarURL)
        .setTimestamp()

        const msg = await message.channel.send(msgAlly);
        //const msg = await message.reply(msgAlly);
    };
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'alianza',
  description: 'Muestra informacion relevante sobre tú alianza.',
  usage: 'alianza'
};
