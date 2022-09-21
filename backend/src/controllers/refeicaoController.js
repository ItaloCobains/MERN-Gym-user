const { v4: uuid } = require('uuid');
const jimp = require('jimp');

const User = require('../models/User');
const Refeicao = require('../models/Refeicao');
const { default: mongoose } = require('mongoose');


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
  /* A function that is called when a user wants to get all the meals that
* he has
  added. */
  getRefeicao: async (req, res) => {
    const { token } = req.query;

    const user = await User.findOne({ token }).exec();


    const refeicaoData = await Refeicao.find({ idUser: user._id }).exec();

    let refeicao = [];

    // eslint-disable-next-line guard-for-in
    for (let i in refeicaoData) {
      let image;

      let defaultImg = refeicaoData[i].image.find((e) => e.default);

      if (defaultImg) {
        image = `${process.env.BASE_URL}/media/${defaultImg.url}`;
      } else {
        image = `${process.env.BASE_URL}/media/default.jpg`;
      }

      refeicao.push({
        id: refeicaoData._id,
        nome: refeicaoData.nome,
        cal: refeicaoData.cal,
        descricao: refeicaoData.descricao,
        dateCreated: refeicaoData.dateCreated,
        image,
      });
    };

    res.json({ refeicao });
  },
  /* Getting the id from the params and checking if it is valid.
  If it is valid, it is getting the meal from the database and returning it. */
  getItem: async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: 'Id invalido' });
      return;
    }

    const refeicao = await Refeicao.findById({ _id: id });

    if (!refeicao) {
      res.json({ error: 'Not Found' });
      return;
    }

    let images = [];
    for (const img of refeicao.image) {
      images.push(`${process.env.BASE_URL}/media/${img.url}`);
    }

    const resposta = {
      nome: refeicao.nome,
      cal: refeicao.cal,
      images,
      descricao: refeicao.descricao,
      dateCreated: refeicao.dateCreated,
    };

    res.status(200).json({
      resposta,
    });
  },
  editAction: async (req, res) => {
    let { id } = req.params;
    let { token, nome, cal, images, descricao } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.json({ error: 'id invalido' });
      return;
    }

    const refeicao = await Refeicao.findById(id).exec();

    if (!refeicao) {
      res.json({ error: 'Not Found' });
      return;
    }

    const user = await User.findOne({ token }).exec();
    if (user._id.toString() !== refeicao.idUser) {
      res.json({ error: 'Essa refeição nãp e sua.' });
      return;
    }

    let updates = {};

    if (nome) {
      updates.nome = nome;
    }

    if (cal) {
      cal = parseFloat(cal);
      updates.cal = cal;
    }

    if (descricao) {
      updates.descricao = descricao;
    }

    if (images) {
      updates.images = images;
    }

    await Refeicao.findByIdAndUpdate(id, {
      $set: updates,
    });

    // todo novas images

    const RefI = await Refeicao.findById(id);
    if (req.files && req.files.img) {
      if (req.files.img.length == undefined) {
        if (['image/jpeg', 'image/jpg', 'image/png']
            .includes(req.files.img.mimetype)) {
          let url = await addImage(req.files.img.data);
          RefI.image.push({
            url,
            default: false,
          });
        }
      } else {
        for (let i = 0; i < req.files.img.length; i++) {
          if (['image/jpeg', 'image/jpg', 'image/png']
              .includes(req.files.img[i].mimetype)) {
            let url = await addImage(req.files.img[i].data);
            RefI.images.push({
              url,
              default: false,
            });
          }
        }
      }
    }

    RefI.image = [...RefI.image];
    await RefI.save();
    res.json({ error: '' });
  },
  deleteItem: async (req, res) => {

  },
};
