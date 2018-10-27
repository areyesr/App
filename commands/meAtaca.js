const Discord = require("discord.js");
const client = new Discord.Client();
const settings = require('../settings.json');
const confTravian = require('../confTravian.json');

module.exports.run = async (client, message, args) => {
  const idMensaje = message;
  const confirmar = "✅";
  const cancelar = "❎";

  //const mensaje = message;
  const servidor=confTravian.servidorTravian;
  const dominio=confTravian.dominioServTravian;
  const urlServidor=`https://${servidor}.travian.${dominio}/`;
  const ataque0 = ';' + message.content.slice(settings.prefix.length + 8).trim();
  //const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const ataque = ataque0.split(";");
  const tiempoAtaque = 172800000;
  //const ataque2 = ataque.split(";").shift().toLowerCase();
  const jAteC = ataque[2].replace('(', '').replace(')', '').split(",");
  //const jAte = ataque[1].slice('(').replace(')', '').split(",");
  //ataque[1]: <jugador atacante>
  //ataque[2]: <aldea atacante ej: (-1,10)>
    //-> jAteC = ataque2[2].replace('(', '').replace(')', '').split(",");
  const jAteX=jAteC[0].replace(' ','');
  const jAteY=jAteC[1].replace(' ','');
  //ataque[3]: <jugador atacado>
  //ataque[4]: <aldea atacada ej:ej: (-1,10)>
  const jAdoC = ataque[4].replace('(', '').replace(')', '').split(",");
  const jAdoX=jAdoC[0].replace(' ','');
  const jAdoY=jAdoC[1].replace(' ','');
  //ataque[5]: <hora llegada servidor ej: 14:00:02>
  //ataque[6]: <numero trenes>
  //await message.channel.send("Aviso de ataque registrado!")
//primero se registra el ataque.
//se envía el registro al canal #Reg-Ataq-Recib
const msgAtaque = new Discord.RichEmbed()
  //.setTitle('<a:att1v2:496880335045263370> Ataque - Envía defensas')
  .setColor('0xfd1c00')
  //.setAuthor(message.author.username,message.author.displayAvatarURL)
  //.setDescription(`idMensaje ${message.id}`)
  //.addField('Ataque del jugador ' + ataque[1],true)
  .addField(`<a:att1v2:496880335045263370> Ataque de ${ataque[6]} tren(es) - Los ataques llegan a las __${ataque[5]}__ hrs del servidor.`,
  `Ataque del jugador ${ataque[1]} [${ataque[2]}](${urlServidor}position_details.php?x=${jAteX}&y=${jAteY}), Defiende el jugador ${ataque[3]} [${ataque[4]}](${urlServidor}build.php?gid=16&tt=2&x=${jAdoX}&y=${jAdoY})`)
  //.addField('Envía defensas',`Ataque del jugador ${ataque[1]} [${ataque[2]}](${urlServidor}build.php?gid=16&tt=2&x=${jAteX}&y=${jAteY})`)
  //.setThumbnail(`https://www.gettertools.com/tx2.travian.fr.8/12-Alliances&plotter&aid=30`)
  //.addField('lk','```css\n[El jugar ' + ataque[1] + ' ' + `[${ataque[2]}](${urlServidor}build.php?gid=16&tt=2&x=${jAteX}&y=${jAteY})` + ' está atacando.]```', true)
  .setFooter(`Enviado por ${message.author.username}`,message.author.displayAvatarURL)
  .setTimestamp()
//  const msg2 = await message.channel.send(msgAtaque);
  const msg2 = await message.author.send(msgAtaque);
// const msg = await message.channel.send("Está bien la informacion?");//, {time: 7000}
  const msg = await message.author.send("Está bien la informacion?");//, {time: 7000}
  const filter1 = (reaction, user) => user.id === message.author.id;
  var confirma = 1;
  var cancela = 1;
//channel.fetchMessage('99539446449315840')
  await msg.react(confirmar, {max: 1, maxEmojis:1, maxUsers:1});
  await msg.react(cancelar, {max: 1, maxEmojis:1, maxUsers:1});
  client.on('messageReactionAdd', async (reaction, user) => {
      if(reaction.emoji.name === confirmar && user.id === idMensaje.author.id && reaction.message.id === msg.id){
        confirma = confirma + 1;
        if(confirma >= 2) {
          confirma=0;
          msg2.delete();
          msg.delete();
          idMensaje.delete();
          const msg3 = await client.channels.get(confTravian.canalReporteAtaquesID).send(msgAtaque);
          //tiempo para eliminar
          message.author.send(`El ataque se ha registrado correctamente. Podrá ver éste informe en el canal <#${confTravian.canalReporteAtaquesID}>`);
          message.channel.send(`Un jugador ha reportado que recibe un ataque. Pueden revisar el detalle del ataque en el canal <#${confTravian.canalReporteAtaquesID}>`);

          await msg3.delete(tiempoAtaque,
          {
            time: tiempoAtaque,
          })
            .then((collected) => {
                //msg.delete(10000)
                //message.delete(1000);
                client.channels.get(confTravian.canalReportelogAtaquesID).send(msgAtaque);
              })
              .catch(() => {
                console.log("mensaje enviado2");
              });
        }
      } else
      if(reaction.emoji.name === cancelar && user.id === idMensaje.author.id && reaction.message.id === msg.id){
        cancela = cancela + 1;
        if(cancela >= 2) {
          cancela=0;
          msg2.delete();
          msg.delete();
          idMensaje.delete();
          //message.channel.send('Se ha cancelado el envío del reporte.');
          }
        }
    });
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'meAtaca',
  description: 'comando para registrar algun ataque que se recibe. Se registrará dentro del canal <#ataques-en-camino>',
  usage: 'meAtaca <jugador atacante>; <aldea atacante ej: (-1,10)>; <jugador atacado>; <aldea atacada ej:ej: (-1,10)>; <hora llegada servidor ej: 14:00:02>; <numero trenes>'
};
