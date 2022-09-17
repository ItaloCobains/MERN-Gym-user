const {checkSchema} = require('express-validator');

module.exports = {
  signup: checkSchema({
    nome: {
      trim: true,
      isLength: {
        options: {min: 20},
      },
      errorMessage: 'Nome precisa ter pelo menos 20 caracteres.',
    },
    email: {
      isEmail: true,
      normalizeEmail: true,
      errorMessage: 'Email invalido.',
    },
    password: {
      isLength: {
        options: {min: 15},
      },
      errorMessage: 'Password precisa ter pelo menos 15 caracteres.',
    },
  }),
};
