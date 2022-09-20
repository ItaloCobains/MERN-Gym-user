const { v4: uuid } = require('uuid');
const jimp = require('jimp');

const User = require('../models/User');
const Refeicao = require('../models/Refeicao');

/**
 * It takes a buffer, creates a new name for the image, reads the buffer,
 * resizes
 * the image, and writes the image to the public/media folder
 * @param buffer - the image buffer
 * @returns The name of the image file.
 */
const addImage = async (buffer) => {
  let newName = `${uuid()}.jpg`;
  let tmpImg = await jimp.read(buffer);
  tmpImg.cover(500, 500).quality(80).write(`./public/media/${newName}`);
  return newName;
};

module.exports = {
  /* A function that is called when a user adds a new meal. */
  addRefeicao: async (req, res) => {
    let { token, nome, cal, descricao } = req.body;

    const user = await User.findOne({ token }).exec();

    if (!nome || !cal || !descricao) {
      res.json({ error: 'Todos os campos tem que ser preenchidos!' });
      return;
    }

    const newRefeicao = new Refeicao();
    newRefeicao.nome = nome;
    newRefeicao.cal = cal;
    newRefeicao.idUser = user._id;
    newRefeicao.descricao = descricao;
    newRefeicao.dateCreated = new Date();

    if (req.files && req.files.img) {
      if (req.files.img.length == undefined) {
        if (
          ['image/jpeg', 'image/png', 'image/png']
              .includes(req.files.img.mimetype)) {
          let url = await addImage(req.files.img.data);
          newRefeicao.image.push({
            url,
            default: false,
          });
        }
      } else {
        for (let i = 0; i < req.files.img.length; i++) {
          if (
            ['image/jpeg', 'image/png', 'image/png']
                .includes(req.files.img[i].mimetype)) {
            let url = await addImage(req.files.img[i].data);
            newRefeicao.image.push({
              url,
              default: false,
            });
          }
        }
      }
    }

    if (newRefeicao.image.length > 0) {
      newRefeicao.image[0].default = true;
    }

    const info = await newRefeicao.save();
    res.json({ id: info._id });
  },
  getRefeicao: async (req, res) => {

  },
  getItem: async (req, res) => {

  },
  editAction: async (req, res) => {

  },
  deleteItem: async (req, res) => {

  },
};
