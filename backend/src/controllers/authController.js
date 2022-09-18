const { validationResult, matchedData } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = {
  signin: async (req, res) => {

  },
  signup: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ error: errors.mapped() });
      return;
    }
    const data = matchedData(req);

    const userByEmail = await User.findOne({
      email: data.email,
    });

    // verify email

    if (userByEmail) {
      res.status(400).json({
        error: {
          email: { msg: 'Email já existe.' },
        },
      });
      return;
    }

    const userByNome = await User.findOne({
      nome: data.nome,
    });

    if (userByNome) {
      res.status(400).json({
        error: {
          email: { msg: 'Nome já existe.' },
        },
      });
    }

    if (
      data.biotipo !== 'ectomorfo' &&
      data.biotipo !== 'mesomorfo' &&
      data.biotipo !== 'endoformo') {
      res.status(400).json({
        error: {
          biotipo: {
            msg: 'Biotipo invalido.',
          },
        },
      });
      return;
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
    const payload = (Date.now() + Math.random()).toString();
    const token = await bcrypt.hash(payload, 10);

    const newUser = new User({
      nome: data.nome,
      email: data.email,
      passwordHash,
      biotipo: data.biotipo,
      peso: data.peso,
      token,
    });
    await newUser.save();

    res.status(200).json({ token });
  },
};
