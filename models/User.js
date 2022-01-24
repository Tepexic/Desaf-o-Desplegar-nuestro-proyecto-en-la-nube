const { Schema } = require("mongoose");
const ContenedorMongo = require("./ContenedorMongo");

const usersSchema = new Schema(
  {
    email: String,
    username: String,
    password: String,
  },
  {
    writeConcern: {
      w: "majority",
      j: true,
      wtimeout: 1000,
    },
  }
);

const User = new ContenedorMongo("users", usersSchema);

module.exports = User;
