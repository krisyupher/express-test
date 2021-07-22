const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
		console.log("Connection ok")
  } catch (error) {
    throw new Error("error en conexion", error);
  }
};
module.exports = {
  dbConnection,
};
