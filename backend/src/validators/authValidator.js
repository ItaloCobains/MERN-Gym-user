const {checkSchema} = require('express-validator');

module.exports = {
  signup: checkSchema({
    nome: {
      trim: true,
      isLength: {
        options: {min: 10},
      },
      errorMessage: 'Nome precisa ter pelo menos 10 caracteres.',
    },
    email: {
      isEmail: true,
      normalizeEmail: true,
      errorMessage: 'Email invalido.',
    },
    password: {
      isLength: {
        options: {min: 10},
      },
      errorMessage: 'Password precisa ter pelo menos 10 caracteres.',
    },
    biotipo: {
      trim: true,
      isLength: {
        options: {min: 9},
      },
      errorMessage: 'Biotipo invalido.',
    },
    peso: {
      trim: true,
      isDecimal: true,
      errorMessage: 'Peso invalido.',
    },
  }),
  signin: checkSchema({
    email: {
      isEmail: true,
      normalizeEmail: true,
      errorMessage: 'Email invalido.',
    },
    password: {
      isLength: {
        options: { min: 10 },
      },
      errorMessage: 'Password precisa ter pelo menos 10 caracteres.',
    },
  }),
};
