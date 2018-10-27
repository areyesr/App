
const servidor='tx2';
const dominio='cl';
const urlServidor='https://' + {servidor} + '.travian.' + {dominio} + '/';



const msgAtaque = new Discord.RichEmbed()
  .setTitle('<a:att1v2:496880335045263370> Ataque')
  .setColor('0xfd1c00')
  .setAuthor(message.author.username,message.author.displayAvatarURL)
  .setDescription(`ataque desde la aldea ${jAteC}`)
  .addField('Ataque del jugador ' + ataque[1],true)
  .addField('Envía defensas',`[${ataque[2]}](${urlServidor}build.php?gid=16&tt=2&x=${jAteX}&y=${jAteY})`)
  .setThumbnail(`https://www.gettertools.com/tx2.travian.fr.8/12-Alliances&plotter&aid=30`)
  .addField('Mensaje en Markdown','```css\n[Usando Markdown rojo]\nTexto normal\n```', true)
  .setFooter(`Enviado por ${message.author.username}`,client.user.displayAvatarURL)
  .setTimestamp()
  //message.channel.sendEmbed(msgAtaque)
  client.channels.get('499433894618202127').sendEmbed(msgAtaque)


  const filter = (reaction, user) => reaction.emoji.name === '👌' && user.id === 'someID'
    message.awaitReactions(filter, { time: 15000 })
    .then(collected => console.log(`Collected ${collected.size} reactions`))
    .catch(console.error);



  const reactions = await msg.awaitReactions(reaction =>
    reaction.emoji.name === confirmar ||
    reaction.emoji.name === cancelar,
    {time: 2000});

  client.on('messageReactionAdd', (reaction, user) => {
    if(reaction.emoji.name === confirmar && user.id === message.author.id){
      //confirmar que están correctos los datos.
      message.channel.send("reaccion");
      console.log(reaction.users);
    }
  });




  reaction.emoji.name === confirmar && user.id === message.author.id &&
  if(2 === 2){
    //confirmar que están correctos los datos.
    client.channels.get('499433894618202127').send(msgAtaque);
    message.delete(1000);
    message.channel.send(`El ataque se ha registrado completamente. Podrá ver éste informe en el canal #reg-ataq-recib`);
    //message.channel.send('argumento ' + ataque[5])
  }



  .then((reaction.emoji.name === "✅") =>  {
    client.channels.get('499433894618202127').send(msgAtaque)
    //message.channel.send('argumento ' + ataque[5])
    .then(() => {
      message.channel.awaitMessages(response => response.content === 'test', {
        max: 1,
        time: 30000,
        errors: ['time'],
      })
        .then((collected) => {
            //msg.delete(10000)
            //message.delete(1000);
            message.channel.send(reaction.emoji.users[0].id);
            message.channel.send(`The collected message was: ${collected.first().content}`);
          })
          .catch(() => {
            message.channel.send("Se ha pasado el limite de tiempo para verificar el ingreso del ataque, si desea ingresar el ataque, puede reintentar nuevamente.");
          });
      });
  })
  .catch((reaction.emoji.name === "❎" => {
    message.channel.send(`The collected message was:`);
    message.delete(1000);
  });



.meAtaca s00a; (-25,10); uruguay; (-100,10); 23:10:12; 3



client.on('messageReactionAdd', (reaction, user) => {
  if(reaction.emoji.name === confirmar && user.id === message.author.id){
    //confirmar que están correctos los datos.
    message.channel.send("reaccion");
    console.log(reaction.users);
  } else
  if(reaction.emoji.name === cancelar && user.id === message.author.id){
    message.channel.send('Se ha cancelado el envío del reporte.');
    //message.delete(1000);
  };
});


//client.channels.get('499433894618202127').sendMessage('envío del mensaje');
//ver aldea enemiga
//https://tx2.travian.fr/position_details.php?x=27&y=72
//enviar refuerzos rápidos.
//https://tx3.travian.cl/build.php?gid=16&tt=2&x=10&y=10
//Buscar usuario
//https://tx3.travian.cl/statistiken.php?id=0&name=Gansada


https://discordapp.com/oauth2/authorize?client_id=235088799074484224&permissions=8&scope=bot&response_type=code&redirect_uri=https%3A%2F%2Frythmbot.co%2Fthanks
https://discordapp.com/api/oauth2/authorize?client_id=497834304840269844&permissions=8&scope=bot


//El bot guarda en la base de datos el ataque.
//El registro en el canal #Reg-Ataq-Recib se escribe un mensaje con await
//Este await del mensaje de ataque tendra un retraso hasta que se cumpla el tiempo del ataque.
// cuando se cumpla el tiempo en el que llega el ataque, se activará un evento de eliminación del registro. y traslado a eventos pasados.


const filter = (reaction, user) => (reaction.emoji.name === confirmar ||
reaction.emoji.name === cancelar) && user.id === message.author.id;
const reactions = await msg.awaitReactions(filter, {time: 7000})
  .then((collected) =>  {
    message.channel.send("hola mundo");
  })
  .catch(() => {
    message.channel.send(`Se ha pasado el limite de tiempo para verificar el ingreso del ataque, si desea ingresar el ataque, puede reintentar nuevamente.`);
    //message.delete(1000);
  });
