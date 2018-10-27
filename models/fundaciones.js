const mongoose = require("mongoose");

const reportSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userID: String,
  username: String,
  messageID:String,
  x:Number,
  y:Number,
  allyRole:String,
  estadoSolicitud:String,
  vUsername: String,
  vID: String,
  fechaSolicitud:String,
  fechaRespuesta: String,
  duales: Number,
  oro: Number,
  tipoAldea: String,
  bonoAldea: String
});

module.exports = mongoose.model("Funda", reportSchema);
