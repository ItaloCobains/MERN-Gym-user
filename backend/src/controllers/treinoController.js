const User = require('../models/User');
const Treino = require('../models/Treino');

module.exports = {
  addTreino: async (req, res) => {
    let {
      token,
      diaDaSemana,
      nome,
      repetiçoes,
      carga,
    } = req.body;

    const user = await User.findOne({ token }).exec();

    if (!diaDaSemana || !nome || !repetiçoes || !carga) {
      res.json({ error: 'Todos os campos tem que ser preenchidos!' });
      return;
    }

    if (carga) {
      carga = parseFloat(carga);
    }

    const newtreino = new Treino();
    newtreino.idUser = user._id;
    newtreino.diaDaSemana = diaDaSemana;
    newtreino.nome = nome;
    newtreino.repetiçoes = repetiçoes;
    newtreino.carga = carga;

    const info = await newtreino.save();
    res.json({ id: info._id });
  },
  getTreino: async (req, res) => {

  },
  getItem: async (req, res) => {

  },
  editAction: async (req, res) => {

  },
  deleteItem: async (req, res) => {
  },
};
