const express = require('express');
const router = express.Router();

const AuthController = require('./controllers/authController');
const RefeicaoController = require('./controllers/refeicaoController');
const TreinoController = require('./controllers/treinoController');
const UserController = require('./controllers/userController');

router.get('/ping', (req, res) => {
  res.json({pong: true});
});

// AuthController
router.post('/user/signin', AuthController.signin);

router.post('/user/signup', AuthController.signup);

// UserController
router.post('/user', UserController.addUser); // CREATE
router.get('/user/me', UserController.info); // READ
router.put('/user/me', AuthController.editAction); // UPDATE
router.delete('/user/:id', AuthController.deleteUser); // DELETE

// TreinoController

router.post('/treino/add', TreinoController.addTreino); // CREATE
router.get('/treino/list', TreinoController.getTreino); // READ
router.get('/treino/item', TreinoController.getItem); // READ
router.post('/treino/:id', TreinoController.editAction); // UPDATE
router.delete('/treino/:id', TreinoController.deleteItem); // DELETE

// RefeicaoController
router.post('/refeicao/add', RefeicaoController.addRefeicao); // CREATE
router.get('/refeicao/list', RefeicaoController.getRefeicao); // READ
router.get('/refeicao/item', RefeicaoController.getItem); // READ
router.post('/refeicao/:id', RefeicaoController.editAction); // UPDATE
router.delete('/refeicao/:id', RefeicaoController.deleteItem); // DELETE

module.exports = router;
