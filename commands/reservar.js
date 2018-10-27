const Discord = require("discord.js");
const client = new Discord.Client();
const Funda = require("../models/fundaciones.js");
const funciones = require("../function/funciones.js");
const mongoose = require("mongoose");
const settings = require('../settings.json');
const confTravian = require('../confTravian.json');
//mongoose.connect('mongodb://localhost/Reports');

module.exports.run = async (client, message, args) => {
  mongoose.connect("mongodb+srv://s00a:Fraktalg2g.1@cluster0-delfw.mongodb.net/admin/Funda", {
    useNewUrlParser: true
  });
  const idMensajeReserva = message;
  const confirmar = "✅";
  const cancelar = "❎";
  var noEsta = false;
  //await message.delete();
  var estaAlly = funciones.buscarNombreAlly(client, message);
  //console.log(estaAlly);
  if (estaAlly===''){

  }else if (estaAlly != '') {


    //const mensaje = message.content.slice(settings.prefix.length + 8).trim();
    const mensaje = message.content.split(" ");
    if(mensaje.length<5){console.log(mensaje.length);console.log("Faltan parametros");}
    const mensaje2 = 10000;
    const c1 = mensaje[1].replace('(', '').replace(')', '').split(",");
    const x1=c1[0].replace(' ','');
    const y1=c1[1].replace(' ','');
    const vReserva = funciones.verificarReserva(estaAlly,x1,y1);
    const vDuales=mensaje[2];
    const vOro=mensaje[3];
    const vTipoAldea=mensaje[4];

    var imagenAldea;
    //https://gpack.travian.com/a4511576/mainPage/img_ltr/g/f1-ltr.png 9c
    //https://gpack.travian.com/a4511576/mainPage/img_ltr/g/f3-ltr.png 6c
    //https://gpack.travian.com/a4511576/mainPage/img_ltr/g/f6-ltr.png 15c
    if (vTipoAldea === "6c"){
      imagenAldea='https://gpack.travian.com/a4511576/mainPage/img_ltr/g/f3-ltr.png';
    }else
    if(vTipoAldea === "9c"){
      imagenAldea='https://gpack.travian.com/a4511576/mainPage/img_ltr/g/f1-ltr.png';
    } else
    if(vTipoAldea === "15c"){
      imagenAldea='https://gpack.travian.com/a4511576/mainPage/img_ltr/g/f6-ltr.png';
    }

    //const vBonoAldea=mensaje[5];

    console.log(mensaje[4]);
    if(vReserva && mensaje.length>=5){
      Funda.findOne({
        'x': x1,
        'y': y1
      }, (err, reporte) => {
        if(err){
          console.log(err);
          //return yaReservada;
        } else {
           try {
             //no sacar la siguiente linea, para que se pueda generar el error
              console.log(reporte.x);
              //yaReservada=4;
              console.log("Encontró");
              //yaReservada = 1;
              //console.log(yaReservada);
              //return yaReservada;
              message.reply(`La aldea (${x1},${y1}) que quiere reservar ya ha sido reservada.\nPuedes ver rápidamente si una aldea está reservada escribiendo: ${settings.prefix}verReserva (${x1},${y1})`);
            }
             catch(e) {
              //console.log(e.stack);
              console.log("No encontró");
              noEsta=true;
              doSomething();
                  }

                   // <--
                  async function doSomething() {
                          if (noEsta) {
                            const report = new Funda({
                              _id: mongoose.Types.ObjectId(),
                              userID: message.author.id,
                              username: message.author.username,
                              messageID:message.id,
                              x:x1,
                              y:y1,
                              allyRole:estaAlly,
                              estadoSolicitud:"Pendiente",
                              vUsername: "",
                              vID: "",
                              fechaSolicitud: message.createdAt,
                              fechaRespuesta: message.editedTimestamp,
                              duales: vDuales,
                              oro: vOro,
                              tipoAldea: vTipoAldea,
                              bonoAldea: ""
                            });
                            report.save()
                              //.then(result => console.log(result))
                              .catch(err => console.log(err));

                            message.reply(`La solicitud de reserva de la aldea (${x1},${y1}), ha sido ingresada exitosamente.\nPuedes ver la solicitud y si ha sido aceptada por los líderes en el canal <#${confTravian.canalReservasAldeas}>.\nSi quieres cancelar la solicitud solo tienes que escribir:\n${settings.prefix}cancelarReserva (${x1},${y1})`)
                            .then(sent => console.log(`Enviar respuesta a ${message.author.username}`))
                            .catch(console.error);

                            const msgReserva = new Discord.RichEmbed()
                            .setTitle(`<a:g26ltr:496880338677792769> Información reserva aldea - ${message.author.username}`)
                            .setColor('0xe8b548')
                            .addField(`${vOro}<:goldInnerltr:496880335037005824> Duales: ${("<:t_teu:496880334768570414>").repeat(vDuales)}`,`Coordenada: (${x1},${y1}) | Alianza: ${estaAlly} | Solicitante: ${message.author.username}\n`,true)
                            .setThumbnail(imagenAldea)
                            .setFooter(`Enviado por ${message.author.username}`,message.author.displayAvatarURL)
                            .setTimestamp()
                            const quienLoReserva =  message.author.id;

                            const msg2 = await client.channels.get(confTravian.canalReservasAldeasPendientes).send(msgReserva);
                            const msg0 = await client.channels.get(confTravian.canalReservasAldeasPendientes).send("¿Confirma la reserva?");//, {time: 7000}

                              var confirma = 1;
                              var cancela = 1;

                              await msg0.react(confirmar, {max: 1, maxEmojis:1, maxUsers:1});
                              await msg0.react(cancelar, {max: 1, maxEmojis:1, maxUsers:1});


                            client.on('messageReactionAdd', async (reaction, user) => {
                                if(reaction.emoji.name === confirmar && user.id === idMensajeReserva.author.id && reaction.message.id === msg0.id){
                                  confirma = confirma + 1;
                                  if(confirma >= 2) {
                                    confirma=0;
                                    msg2.delete();
                                    msg0.delete();
                                    idMensajeReserva.delete();
                                    const msg3 = await client.channels.get(confTravian.canalReservasAldeas).send(msgReserva);
                                    //tiempo para eliminar

                                    Funda.findOne({
                                      'x': x1,
                                      'y': y1
                                    },(err, reporte) => {
                                      if(err){
                                        console.log(err);
                                      } else {
                                        try {
                                            console.log(reporte.x);
                                            //client.channels.get(confTravian.canalReservasAldeas).send(`La reserva de la aldea (${x1},${y1}) ha sido cancelada con éxido.`);
                                            Funda.findByIdAndUpdate(reporte._id, {estadoSolicitud: 'aceptada', fechaRespuesta: Date.now(), vUsername : reaction.message.author.username,
                                            vID : reaction.message.author.id}, function(err, res){if (err) console.log(err);});

                                            client.channels.get(confTravian.canalReservasAldeas).fetchMessage(reporte.messageID).then(msg => msg.delete());
                                          }
                                          catch(e) {
                                            client.channels.get(confTravian.canalReservasAldeas).send(`No hay una aldea de coordenada (${x1},${y1}) que esté asociada a tus reservas.`);
                                          }
                                          }
                                          return true;
                                    });


                                    message.author.send(`La reserva ha sido aceptada exitosamente, se incluirá en la  <#${confTravian.canalReservasAldeas}>`);



                                    //message.channel.send(`Un jugador ha reportado que recibe un ataque. Pueden revisar el detalle del ataque en el canal <#${confTravian.canalReporteAtaquesID}>`);

                                  }
                                } else
                                if(reaction.emoji.name === cancelar && user.id === idMensajeReserva.author.id && reaction.message.id === msg0.id){
                                  cancela = cancela + 1;
                                  if(cancela >= 2) {
                                    cancela=0;
                                    msg2.delete();
                                    msg0.delete();
                                    //idMensajeReserva.delete();
                                    funciones.cancelarReserva(client,x1,y1);
                                    message.channel.send('En base a los datos enviados para la reserva de su aldea, se sugiere considerar otra aldea para reservar.');
                                    }
                                  }
                              });


                       }
                  }





        }
        return true;
      });


//mongod

//console.log(yaReservada);

    } else
    { message.reply(`La aldea que desea reservar no se encuentra en el perímetro de su alianza.
      Puedes ver rápidamente cuál es el perímetro para tú alianza escribiendo:
      ${settings.prefix}alianza`);}
  };
  //if(message.author.id != '393561088756809729') return;


}
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

module.exports.help = {
  name: 'reservar',
  description: 'Reporte a la base de datos',
  usage: 'reservar'
};
