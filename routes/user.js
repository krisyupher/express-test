const { Router } = require("express");
const { check } = require("express-validator");
const Role = require("../models/role");
const {
  roleValid,
  emailValid,
  existeUserByIdValid,
} = require("../helpers/validations");
const {
  userGet,
  userPost,
  userPut,
  userDelete,
} = require("../controllers/user");
const { validarCampos } = require("../middleware/validate-fields");
const router = Router();

router.get(
  "/",

  userGet
);
router.post(
  "/",
  [
    check("name", "EL nombre es obligatorio").not().isEmpty(),
    check("password", "La contraseña debe tener min 6 caracteres").isLength({
      min: 6,
    }),
    check("role").custom(roleValid),
    check("email", "El correo no es valido").isEmail(),
    check("email").custom(emailValid),
    validarCampos,
  ],
  userPost
);
router.put(
  "/:id",
  [
    check("id", "no es un ID valido").isMongoId(),
    check("id").custom(existeUserByIdValid),
    check("role").custom(roleValid),
    validarCampos,
  ],
  userPut
);
router.delete(
  "/:id",
  [
    check("id", "no es un ID valido").isMongoId(),
    check("id").custom(existeUserByIdValid),
    validarCampos,
  ],
  userDelete
);

module.exports = router;
