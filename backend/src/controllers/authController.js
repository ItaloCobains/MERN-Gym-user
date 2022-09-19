const { validationResult, matchedData } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = {
  signin: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ error: errors.mapped() });
      return;
    }
    const data = matchedData(req);

    const user = await User.findOne({
      email: data.email,
    });

    // validando email

    if (!user) {
      res.json({ error: 'E-mail e/ou senha invalidos' });
      return;
    }

    // validando password

    const match = await bcrypt.compare(data.password, user.passwordHash);

    if (!match) {
      res.json({ error: 'E-mail e/ou senha invalidos' });
      return;
    }

    const payload = (Date.now() + Math.floor()).toString();
    const token = await bcrypt.hash(payload, 10);

    user.token = token;
    await user.save();

    res.json({ token, email: data.email });
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
      data.biotipo !== 'endomorfo') {
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
