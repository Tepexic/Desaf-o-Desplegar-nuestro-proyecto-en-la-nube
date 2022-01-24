const mongoose = require("mongoose");
const uri = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.foboz.mongodb.net/${process.env.USERS_DB}?retryWrites=true&w=majority`;

class ContenedorMongo {
  constructor(model, schema) {
    this.collection = mongoose.model(model, schema);
    this.init();
  }

  async init() {
    if (this.connection) {
      return;
    }
    console.log("Conectando a la base de datos...");
    console.log(uri);
    this.connection = await mongoose.connect(uri);
  }
}

module.exports = ContenedorMongo;
