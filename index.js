require("dotenv").config();

// const cluster = require("cluster");
// const numCpus = require("os").cpus().length;

const express = require("express");
const productos = require("./routes/productos");
const authRouter = require("./routes/authRouter");
const infoRouter = require("./routes/info");
const randomsRouter = require("./routes/randoms");
// const { Server: SocketServer } = require("socket.io");
// const { Server: HttpServer } = require("http");
const http = require("http");
// const cors = require('cors');

const parseArgs = require("minimist");

const session = require("express-session");
const auth = require("./utils/auth");
const passport = require("passport");

/**
 * Contenedores
 */
const Productos = require("./models/Product");
const Mensajes = require("./models/Messages");

const { normalizeMessages } = require("./utils/normalizador");
const MongoStore = require("connect-mongo");

/**
 *
 */
// const app = express();
// const httpServer = new HttpServer(app);
// const io = new SocketServer(httpServer);
const app = express();
const httpServer = http.createServer(app);
const io = require("socket.io")(httpServer);

/**
 * Middleware
 */
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ encoded: false }));
app.use(express.static("public"));
app.use(
  session({
    store: new MongoStore({
      mongoUrl: `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.foboz.mongodb.net/${process.env.SESSION_DB}?retryWrites=true&w=majority`,
      MongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
    secret: "qwertyuiop",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 10,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

/**
 * Iniciar el servidor
 */
options = {
  default: {
    port: 8080,
    mode: "fork",
  },
  alias: {
    p: "port",
    m: "mode",
  },
};
const argv = parseArgs(process.argv.slice(2), options);
const PORT = process.env.PORT || argv.port;
const connectedServer = httpServer.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
connectedServer.on("error", (error) =>
  console.log(`Error en servidor ${error}`)
);

/**
 * Socket.io
 */
io.on("connection", async (socket) => {
  console.log("Un cliente se ha conectado", socket.id);
  // Emitir mensajes y prouctos al nuevo socket
  socket.emit("productos", await Productos.collection.find());

  socket.emit("messages", await Mensajes.collection.find());

  // Añadir nuevo mensaje y emitir nueva lista
  socket.on("new-message", async (data) => {
    console.log("Nuevo mensaje", data);
    await Mensajes.collection.create(data, async (err, message) => {
      if (err) {
        console.log("Error al crear mensaje: ", err);
      }
      socket.emit("messages", await Mensajes.collection.find());
    });
  });

  // Añadir nuevo producto y emitir nueva lista
  socket.on("new-product", async (data) => {
    await Productos.collection.create(data, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Producto añadido");
    });
    socket.emit("productos", await Productos.collection.find());
  });
});

// Rutas
app.use("/", productos);
app.use("/", authRouter);
app.use("/", infoRouter);
app.use("/", randomsRouter);

/**
 * Aplicación con autenticación
 */
app.get("/", (req, res) => {
  res.redirect("/tienda");
});

app.get("/tienda", auth, (req, res) => {
  res.render("index.ejs", { nombre: req.user?.username });
});
