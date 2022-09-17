const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
  idUser: String,
  diaDaSemana: String,
  nome: String,
  repetiçoes: String,
  carga: Number,
});

const modelName = 'Treino';

if (mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[modelName];
} else {
  module.exports = mongoose.model(modelName, modelSchema);
}
