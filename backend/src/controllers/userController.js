const User = require('../models/User');
const Refeicao = require('../models/Refeicao');
const Treino = require('../models/Treino');
const { validationResult, matchedData } = require('express-validator');
const bcrypt = require('bcrypt');


module.exports = {
  /* A function that is called when the user wants to see his profile. */
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

    let treinoList = [];
    // eslint-disable-next-line guard-for-in, prefer-const
    for (let i in treino) {
      treinoList.push({...treino[i]});
    }

    res.json({
      nome: user.nome,
      email: user.email,
      biotipo: user.biotipo,
      peso: user.peso,
      refeicoes: refeicaoList,
      treinos: treinoList,
    });
  },
  /* A function that is called when the user wants to edit his profile. */
  editAction: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.mapped() });
      return;
    }
    const data = matchedData(req);

    let updates = {};

    if (data.nome) {
      updates.nome = data.nome;
    }

    if (data.email) {
      const emailCheck = await User.findOne({ email: data.email });
      if (emailCheck) {
        res.json({ error: 'E-mail já existente!' });
        return;
      }
      updates.email = data.email;
    }

    if (data.password) {
      updates.passwordHash = await bcrypt.hash(data.password, 10);
    }

    if (data.biotipo) {
      if (
        data.biotipo === 'ectomorfo' ||
        data.biotipo === 'mesomorfo' ||
        data.biotipo === 'endomorfo') {
        updates.biotipo = data.biotipo;
      } else {
        res.json({ error: 'Biotipo invalido.' });
        return;
      }
    }

    if (data.peso) {
      updates.peso = data.peso;
    }

    await User.findOneAndUpdate({ token: data.token }, { $set: updates });

    res.json({});
  },
};
