const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const userGet = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  /*   const listUsers = await User.find({ state: true })
    .skip(Number(desde))
    .limit(Number(limite));
  const total = await User.countDocuments({ state: true }); */
  /* Para mandar las peticiones al mismo tiempo usamos Promise.all */
  const [listUsers, total] = await Promise.all([
    User.find({ state: true }).skip(Number(desde)).limit(Number(limite)),
    User.countDocuments({ state: true }),
  ]);
  /* 	localhost:8081/user/?q=hola&edad=22 */
  const params = req.query;
  res.json({ total, listUsers });
};
const userPost = async (req, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  //Guardar en BD
  await user.save();
  res.status(403).json({
    ok: true,
    msg: "userPost API - controlador",
    user,
  });
};
const userPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...resto } = req.body;
  if (password) {
    //Encriptar la contraseña
    resto.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync());
  }
  const user = await User.findByIdAndUpdate(id, resto);

  res.json(user);
};
const userDelete = async (req, res = response) => {
  const { id } = req.params;

  /* Eliminacion total - No recomendable*/
  /* const userToDelete = await User.findByIdAndDelete(id); */

  const userToDelete = await User.findByIdAndUpdate(id, { state: false });
  res.json({
    userToDelete,
  });
};
module.exports = {
  userGet,
  userPost,
  userPut,
  userDelete,
};
