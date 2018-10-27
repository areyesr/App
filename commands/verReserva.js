const Discord = require("discord.js");
const Funda = require("../models/fundaciones.js");
const funciones = require("../function/funciones.js");
const mongoose = require("mongoose");
const settings = require('../settings.json');
const confTravian = require('../confTravian.json');
//mongoose.connect('mongodb://localhost/Reports');

module.exports.run = async (client, message, args) => {
  mongoose.connect("mongodb+srv://s00a:Fraktalg2g.1@cluster0-delfw.mongodb.net/Funda", {
    useNewUrlParser: true
  });

  //await message.delete();
  var estaAlly = funciones.buscarNombreAlly(client, message);
  //console.log(estaAlly);
  if (estaAlly===''){

  }else if (estaAlly != '') {
    //const mensaje = message.content.slice(settings.prefix.length + 8).trim();
    const mensaje = message.content.split(" ");
    if(mensaje.length<1){console.log(mensaje.length);console.log("Faltan parametros");}
    const mensaje2 = 10000;
    const c1 = mensaje[1].replace('(', '').replace(')', '').split(",");
    const x1=c1[0].replace(' ','');
    const y1=c1[1].replace(' ','');

    if(mensaje.length>=1){
      Funda.findOne({
        'x': x1,
        'y': y1
      }, (err, reporte) => {
        if(err){
          console.log(err);
        } else {
          try {
              console.log(reporte.x);
              message.reply(`La aldea de coordenadas (${x1},${y1}) está reservada y su estado es ${reporte.estadoSolicitud}.`);

            } catch(e) {
              message.reply(`La aldea de coordenada (${x1},${y1}) está libre para ser reservada.\nPara reservarla solo tienes que escribir en el chat: \n${settings.prefix}reservar (${x1},${y1}) nº_duales oros tipoAldea_ej:_9c`);
            }
        }
        return true;
      });

    } else
    { message.reply(`No se ingresó correctamente los parametros`);}
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
  name: 'verReserva',
  description: 'Reporte a la base de datos',
  usage: 'verReserva'
};
