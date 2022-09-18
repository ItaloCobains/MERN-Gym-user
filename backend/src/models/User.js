const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
  nome: String,
  email: String,
  passwordHash: String,
  token: String,
  biotipo: String,
  peso: mongoose.Types.Decimal128,
});

const modelName = 'User';

if (mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[modelName];
} else {
  module.exports = mongoose.model(modelName, modelSchema);
}
