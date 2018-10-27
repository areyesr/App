const Discord = require("discord.js");
const Funda = require("../models/fundaciones.js");
const funciones = require("../function/funciones.js");
const mongoose = require("mongoose");
const settings = require('../settings.json');
const confTravian = require('../confTravian.json');
//mongoose.connect('mongodb://localhost/Reports');

module.exports.run = (client, message, args) => {
  mongoose.connect("mongodb+srv://s00a:Fraktalg2g.1@cluster0-delfw.mongodb.net/admin/Funda", {
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
        'y': y1,
        'userID': message.author.id
      }, (err, reporte) => {
        if(err){
          console.log(err);
        } else {
          try {
              console.log(reporte.x);
              //yaReservada=4;
              //console.log("Encontró");
              message.reply(`La reserva de la aldea (${x1},${y1}) ha sido cancelada con éxido.`);

              Funda.findByIdAndDelete({_id: reporte._id}, (err, res) => {
                if (err) console.log(err);
              });

              client.channels.get(confTravian.canalReservasAldeas).fetchMessage(reporte.messageID).then(msg => msg.delete());
            } catch(e) {
              //console.log(e.stack);
              //console.log("No encontró");
              message.reply(`No hay una aldea de coordenada (${x1},${y1}) que esté asociada a tus reservas.`);
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
  name: 'cancelarReserva',
  description: 'Reporte a la base de datos',
  usage: 'cancelarReserva'
};
