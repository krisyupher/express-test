const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const userGet = (req, res = response) => {
  /* 	localhost:8081/user/?q=hola&edad=22 */
  const params = req.query;
  res.status(403).json({
    ok: true,
    msg: "get API - controlador",
    params,
  });
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

  res.json({
    ok: true,
    user,
  });
};
module.exports = {
  userGet,
  userPost,
  userPut,
};
