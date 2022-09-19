const { checkSchema } = require('express-validator');

module.exports = {
  editAction: checkSchema({
    token: {
      notEmpty: true,
    },
    nome: {
      optional: true,
      trim: true,
      isLength: {
        options: { min: 10 },
      },
      errorMessage: 'Nome precisa ter pelo menos 10 caracteres.',
    },
    email: {
      optional: true,
      isEmail: true,
      normalizeEmail: true,
      errorMessage: 'Email invalido.',
    },
    password: {
      optional: true,
      isLength: {
        options: { min: 10 },
      },
      errorMessage: 'Password precisa ter pelo menos 10 caracteres.',
    },
    biotipo: {
      optional: true,
      trim: true,
      isLength: {
        options: { min: 9 },
      },
      errorMessage: 'Biotipo invalido.',
    },
    peso: {
      optional: true,
      trim: true,
      isDecimal: true,
      errorMessage: 'Peso invalido.',
    },
  }),
};
