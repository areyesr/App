const confTravian = require('../confTravian.json');
const Funda = require("../models/fundaciones.js");
const mongoose = require("mongoose");
const settings = require('../settings.json');


function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
var PI=3.14;
function sumar(x1,x2){
  return x1+x2;
}
function restar(x1,x2){
  return x1-x2;
}
function dividir(x1,x2){
   if (x2 == 0) {
       mostrarErrorDivision();
   }else{return x1/x2;}
}
function mostrarErrorDivision() {
   console.log('No se puede dividir por cero');
}
// only include items with even id's





function buscarNombreAlly(client, message){
  //let myRole = message.guild.roles.find("name", "Moderators");
  var allyArray = confTravian.alianzas;
  var ally = "";
  //var myRole;

  for(var nombresAlly in allyArray) {
    let miRole = message.guild.roles.find(val => val.name === allyArray[nombresAlly].nombre);
    //console.log(miRole.id);
    if(message.member.roles.has(miRole.id)) {
      ally = miRole.name;
    } else {
      //no tiene el role
    }
  }
  return ally;
};

function cancelarReserva(client,x1,y1) {
  Funda.findOne({
    'x': x1,
    'y': y1
  },(err, reporte) => {
    if(err){
      console.log(err);
    } else {
      try {
          console.log(reporte.x);
          client.channels.get(confTravian.canalReservasAldeas).send(`La reserva de la aldea (${x1},${y1}) ha sido cancelada con éxido.`);
          Funda.findByIdAndDelete({_id: reporte._id}, (err, res) => {
            if (err) console.log(err);
          });
          client.channels.get(confTravian.canalReservasAldeas).fetchMessage(reporte.messageID).then(msg => msg.delete());
        }
        catch(e) {
          client.channels.get(confTravian.canalReservasAldeas).send(`No hay una aldea de coordenada (${x1},${y1}) que esté asociada a tus reservas.`);
        }
        }
        return true;
  });

}

function verificarReserva(allyV,x1,y1){
let allyAux;
  allyAux = confTravian.alianzas.filter(ally =>
    ally.nombre === allyV &&
    ally.limIzq <= x1 && ally.limDer >= x1 &&
    ally.limInf <= y1 && ally.limSup >= y1
  );
  if(allyAux.length>0){
    return true;
  }
  //var cadena="";
  return false;
};


function verLimitesAlly(ally){
  let allyAux;
  allyAux = confTravian.alianzas.filter(function(allyV){
    return (allyV.nombre == ally);
  });
  //var a1 = `la allianza:\"${allyAux[0].nombre}\", tiene los siguientes límites: `;
  var cadena="";

  var l1=`**(${allyAux[0].limIzq},${allyAux[0].limSup})**`;
  var l4=`**(${allyAux[0].limIzq},${allyAux[0].limInf})**`;
  var b1 = `**(${allyAux[0].limIzq},${allyAux[0].limSup})**${"▄".repeat(10)}**(${allyAux[0].limDer},${allyAux[0].limSup})**`;
  var b2 = `${"▄▀".repeat(10)}`;
  var b3 = `${"█".repeat(10)}`;
  var b4 = `**(${allyAux[0].limIzq},${allyAux[0].limInf})**${"▀".repeat(10)}**(${allyAux[0].limDer},${allyAux[0].limInf})**`;
  if(l1.length<=l4.length){
    cadena = `\n${".".repeat(l4.length-l1.length+1)}${b1}\n${b4}\n`;
  }else {
    cadena = `\n${b1}\n${".".repeat(l1.length-l4.length+1)}${b4}\n`;
  };

  return cadena;
};
//  "nombre": "ally1", "limIzq": 0, "limInf":0, "limDer":10, "limSup":10


exports.sumar=sumar; exports.restar=restar; exports.dividir=dividir;
exports.PI=PI; exports.clean=clean; exports.verLimitesAlly=verLimitesAlly;exports.buscarNombreAlly=buscarNombreAlly;
exports.verificarReserva=verificarReserva; exports.cancelarReserva=cancelarReserva;
