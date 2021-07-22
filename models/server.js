const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    //Coneccion a base de datos
    this.conectarDB();
    //middlewares
    this.middlewares();
    //rutas
    this.routes();
  }
  routes() {
    this.app.use("/user", require("../routes/user"));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Escuchando en el puerto http://localhost:${this.port}`);
    });
  }
  async conectarDB() {
    await dbConnection();
  }
  middlewares() {
    this.app.use(cors());
    this.app.use(express.json()); /* lectura del body */
    this.app.use(express.static("public"));
  }
}

module.exports = Server;
