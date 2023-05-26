import express from "express";

export const routerViewProductsSocket = express.Router();

routerViewProductsSocket.get("/", (req, res) => {
  return res.render("realTimeProducts", {});
});
//