const User = require('../models/user');
const Refeicao = require('../models/refeicao');
const Treino = require('../models/Treino');

module.exports = {
  info: async (req, res) => {
    const { token } = req.query;

    const user = await User.findOne({ token });
    const refeicao = await Refeicao.find({
      idUser: user.id.toString(),
    });
    const treino = await Treino.find({
      idUser: user.id.toString(),
    });

    let refeicaoList = [];

    // eslint-disable-next-line guard-for-in, prefer-const
    for (let i in refeicao) {
      refeicaoList.push({...refeicao[i]});
    }

    res.json({
      nome: user.nome,
      email: user.email,
      biotipo: user.biotipo,
      peso: user.peso,
      refeicoes: refeicaoList,
    });
  },
  editAction: async (req, res) => {
  },
};
