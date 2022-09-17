const { validationResult, matchedData } = require('express-validator');
const User = require('../models/user');

module.exports = {
  signin: async (req, res) => {

  },
  signup: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.mapped() });
      return;
    }
    const data = matchedData(req);

    const user = await User.findOne({
      email: data.email,
    });

    if (user) {
      res.json({
        error: {
          email: { msg: 'Email já existe.' },
        },
      });
    }

    res.json({ Success: true, data });
  },
};
