import { Router } from "express";
import ProductManager from "../managers/productManager.js";

// Manager y router
const productManager = new ProductManager();
export const routerViewProductsSocket = Router();

routerViewProductsSocket.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts(); // No está claro de dónde proviene la variable "limit". Asegúrate de definirla antes de usarla.

    return res.render("realTimeProducts", {
      titulo: "TITULO: PRODUCTOS",
      products: products,
    });
  } catch (error) {
    console.error(`Error al obtener los productos: ${error}`);
    return res.status(500).json({ error: "Error al obtener los productos" });
  }
});
