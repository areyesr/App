
bot.on("ready", async() => {
  console.log("I am online!");
  bot.user.serActivity("to QSmally.", {type: "LISTENING"});

  let actvNum =0;

  setInterval(function() {
    if(activNum === 0) {
      bot.user.setActivity("with QSmally.");
      activNum = 1;
    } else if(activNum === 1) {
      bot.user.setActivity("with Code.");
      activNum = 0;
    }
  })
})
