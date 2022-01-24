const { Schema } = require("mongoose");
const ContenedorMongo = require("./ContenedorMongo");

const productsSchema = new Schema(
  {
    title: String,
    price: Number,
    thumbnail: String,
    id: Number,
  },
  {
    writeConcern: {
      w: "majority",
      j: true,
      wtimeout: 1000,
    },
  }
);

const Product = new ContenedorMongo("products", productsSchema);

module.exports = Product;
