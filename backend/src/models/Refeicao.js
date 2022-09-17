const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
  nome: String,
  cal: String,
  image: [Object],
  idUser: String,
  descricao: String,
  dateCreated: Date,
});

const modelName = 'Refeicao';

if (mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[modelName];
} else {
  module.exports = mongoose.model(modelName, modelSchema);
}
