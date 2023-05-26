import express from "express";
import handlebars from "express-handlebars";
import { routerViewProducts } from "./routes/products.view.router.js";
import { routerViewProductsSocket } from "./routes/products-socket.view.router.js";

import { __dirname } from "./utils.js";
import { Server } from "socket.io";

const app = express();
const port = 8080;

//CONFIGURACION DEL MOTOR DE HANDLEBARS
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// Middleware para parsear el body de las requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Montamos los routers en sus respectivos paths
app.use("/view/products", routerViewProducts);

//VISTA Sockets
app.use("/view/products-socket", routerViewProductsSocket);

app.get("*", (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "error esa ruta no existe",
    data: {},
  });
});

// Iniciamos el servidor
const httpServer = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const socketServer = new Server(httpServer);
let msgs = [];
socketServer.on("connection", (socket) => {
  socket.on("msg_front_to_back", (msg) => {
    msgs.push(msg);
    console.log(msgs);
    socketServer.emit("todos_los_msgs", msgs);
  });

});
