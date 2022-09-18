const express = require('express');
const router = express.Router();

const Auth = require('./middlewares/Auth');

const AuthValidator = require('./validators/authValidator');

const AuthController = require('./controllers/authController');
const RefeicaoController = require('./controllers/refeicaoController');
const TreinoController = require('./controllers/treinoController');
const UserController = require('./controllers/userController');

router.get('/ping', (req, res) => {
  res.json({pong: true});
});

// AuthController
router.post('/user/signin', AuthController.signin);

router.post('/user/signup', AuthValidator.signup, AuthController.signup);

// UserController
router.post('/user', UserController.addUser); // CREATE
router.get('/user/me', Auth.private, UserController.info); // READ
router.put('/user/me', Auth.private, UserController.editAction); // UPDATE
router.delete('/user/:id', Auth.private, UserController.deleteUser); // DELETE

// TreinoController

router.post('/treino/add', Auth.private, TreinoController.addTreino); // CREATE
router.get('/treino/list', TreinoController.getTreino); // READ
router.get('/treino/item', Auth.private, TreinoController.getItem); // READ
router.post('/treino/:id', Auth.private, TreinoController.editAction); // UPDATE
router.delete(
    '/treino/:id',
    Auth.private,
    TreinoController.deleteItem,
); // DELETE

// RefeicaoController
router.post(
    '/refeicao/add',
    Auth.private,
    RefeicaoController.addRefeicao,
); // CREATE
router.get('/refeicao/list', RefeicaoController.getRefeicao); // READ
router.get('/refeicao/item', RefeicaoController.getItem); // READ
router.post(
    '/refeicao/:id',
    Auth.private,
    RefeicaoController.editAction,
); // UPDATE
router.delete(
    '/refeicao/:id',
    Auth.private,
    RefeicaoController.deleteItem,
); // DELETE

module.exports = router;
