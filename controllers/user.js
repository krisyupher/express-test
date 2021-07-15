const { response } = require("express");

const userGet = (req, res = response) => {
  /* 	localhost:8081/user/?q=hola&edad=22 */
  const params = req.query;
  res.status(403).json({
    ok: true,
    msg: "get API - controlador",
    params,
  });
};
const userPost = (req, res = response) => {
  const { nombre, edad } = req.body;
  res.status(403).json({
    ok: true,
    msg: "userPost API - controlador",
    nombre,
    edad,
  });
};
const userPut = (req, res = response) => {
  const id = req.params.id;
  res.status(403).json({
    ok: true,
    msg: "userPut API - controlador",
    id,
  });
};
module.exports = {
  userGet,
  userPost,
  userPut,
};
