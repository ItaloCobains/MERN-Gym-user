const User = require('../models/User');
const Treino = require('../models/Treino');
const { default: mongoose } = require('mongoose');

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

    if (!diaDaSemana && !nome && !repetiçoes && !carga) {
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
    res.json({ id: info._id, error: '' });
  },
  getTreino: async (req, res) => {
    const { token } = req.query;

    const user = await User.findOne({ token }).exec();

    const treino = await Treino.find({ idUser: user._id }).exec();

    if (!treino) {
      res.status(404).json({error: 'Not Found'});
      return;
    }

    res.json({ treino, error: '' });
  },
  getItem: async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: 'Id invalido' });
      return;
    }

    const treino = await Treino.findById(id);

    if (!treino) {
      res.json({ error: 'Not Found' });
      return;
    }

    const resposta = {
      nome: treino.nome,
      diaDaSemana: treino.diaDaSemana,
      repetiçoes: treino.repetiçoes,
      carga: treino.carga,
    };

    res.json({ resposta, error: '' });
  },
  editAction: async (req, res) => {
    let { id } = req.params;
    let { token, nome, diaDaSemana, repetiçoes, carga } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.json({ error: 'id invalido' });
      return;
    }
    const treino = await Treino.findById(id).exec();
    if (!treino) {
      res.json({ error: 'Not Found' });
      return;
    }

    const user = await User.findOne({token}).exec();

    if (user._id.toString() !== treino.idUser) {
      res.json({ error: 'Essa treino não e seu.' });
      return;
    }

    let updates = {};

    if (nome) {
      updates.nome = nome;
    }

    if (diaDaSemana) {
      updates.diaDaSemana = diaDaSemana;
    }

    if (repetiçoes) {
      updates.repetiçoes = repetiçoes;
    }

    if (carga) {
      updates.carga = carga;
    }

    await Treino.findByIdAndUpdate(id, {
      $set: updates,
    });

    res.json({error: ''});
  },
  deleteItem: async (req, res) => {
    const { id } = req.params;
    const { token } = req.query;

    const user = await User.findOne({ token }).exec();

    if (!user) {
      res.status(400).json({ error: 'Not Found' });
      return;
    }

    const treino = await Treino.findById(id).exec();

    if (!treino) {
      res.json({ error: 'treino not found' });
      return;
    }

    await Treino.findByIdAndDelete(id);

    res.status(200).json({ status: true, error: '' });
  },
};
