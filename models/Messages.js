const { Schema } = require("mongoose");
const ContenedorMongo = require("./ContenedorMongo");

// const messageUserSchema = new Schema(
//   {
//     nombre: String,
//     apellido: String,
//     edad: String,
//     alias: String,
//     avatar: String,
//   },
//   {
//     writeConcern: {
//       w: "majority",
//       j: true,
//       wtimeout: 1000,
//     },
//   }
// );

const messagesSchema = new Schema(
  {
    author: String,
    text: String,
    timestamp: String,
  },
  {
    writeConcern: {
      w: "majority",
      j: true,
      wtimeout: 1000,
    },
  }
);

const Messages = new ContenedorMongo("messages", messagesSchema);

module.exports = Messages;
