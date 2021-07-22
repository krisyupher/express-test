const Role = require("../models/role");
const User = require("../models/user");

const roleValid = async (rol = "") => {
  if (!(await Role.findOne({ rol }))) {
    throw new Error(`El rol ${rol} no está registrado en la BD`);
  }
};
const emailValid = async (email = "") => {
  //verificar si el correo existe en BD
  if (await User.findOne({ email })) {
    throw new Error(`El correo: ${email}, ya está registrado`);
  }
};
const existeUserByIdValid = async (id = "") => {
  //verificar si el id existe en BD
  if (!(await User.findById(id))) {
    throw new Error(`El id: ${id}, no existe`);
  }
};
module.exports = {
  roleValid,
  emailValid,
  existeUserByIdValid,
};
