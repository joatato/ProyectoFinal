import { Router } from "express";
import productsViewController from "../controllers/productsView.controller.js";
import cartsViewController from "../controllers/cartsView.controller.js";
import messagesController from "../controllers/messages.controller.js";
import { authorizeUser, passportCall } from "../middlewares/sessions.middleware.js";

const router = Router();

router.get('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.sendStatus(500);
    } else {
      res.send('Logout OK...!!!')
    }
  })
})
router.get("/logup", (req, res) => {
  if (req.cookies.idToken) return res.redirect("/home");
  res.setHeader("Content-Type", "text/html");
  res.status(200).render("logup", { styles: "logup.css" });
});

router.get("/login", (req, res) => {
  if (req.cookies.idToken) return res.redirect("/home");
  res.setHeader("Content-Type", "text/html");
  res.status(200).render("login", {
    title: "Estufas San Juan | Miguel Agüero",
    styles: "login.css"
  });
});

router.get("/forgotPassword", (req, res) => {
  if (req.cookies.idToken) return res.redirect("/home");
  res.setHeader("Content-Type", "text/html");
  res.status(200).render("forgotPassword", { styles: "forgotPassword.css" });
})

router.get("/passwordreset/:email/:token", (req, res) => {
  if (req.cookies.idToken) return res.redirect("/home");
  let { email, token } = req.params;
  res.setHeader("Content-Type", "text/html");
  res.status(200).render("passwordReset", { email, token, styles: "passwordReset.css" });
})

router.get("/home", async(req, res) => {


  let products = await productsViewController.getProducts(req.query);
  let user = req.user;

  /* let stock = await productsViewController.getProducts()
  console.log(stock);
  for (const stokk of stock) {
    console.log(stokk.price);
  }
  let products = stock;
  stock ? (stock = true) : (stock = false); */
  res.setHeader("Content-Type", "text/html");
  res.status(200).render("home", {
    products, user,

    title: "Estufas San Juan",
    styles: "home.css",
    h1: "Estufas San Juan",
    existenciaDeStock: true,
    // productos: products,
    allowProtoMethodsByDefault: true, // Opción para permitir el acceso a las propiedades del prototipo de forma segura
    estilos: 'stylesHome.css',
    /* nombreCompleto: req.session.usuario.nombre + ' ' + req.session.usuario.apellido,
    edad: req.session.usuario.edad,
    correo: req.session.usuario.email */
  });
});

router.get("/products", passportCall("jwt") , authorizeUser(["user", "premium", "admin"]), async (req, res) => {
  let products = await productsViewController.getProducts(req.query);
  let user = req.user;
  res.setHeader("Content-Type", "text/html");
  res.render("products", { products, user, styles: "products.css" });
});

router.get("/carts/:cid", passportCall("jwt"), authorizeUser(["user", "premium", "admin"]), async (req, res) => {
  let cart = await cartsViewController.getCart(req.params.cid);
  res.setHeader("Content-Type", "text/html");
  res.render("cart", { cart, styles: "cart.css" });
});

router.get("/realtimeproducts", passportCall("jwt"), authorizeUser(["premium", "admin"]), async (req, res) => {
  let products = await productsViewController.getProducts(req.query);
  res.setHeader("Content-Type", "text/html");
  res.render("realTimeProducts", { products, styles: "realTimeProducts.css" });
});

router.get("/chat", passportCall("jwt"), authorizeUser(["user", "premium", "admin"]), async (req, res) => {
  let user = req.user;
  let messages = await messagesController.getMessages();
  res.setHeader("Content-Type", "text/html");
  res.render("chat", { user, messages, styles: "chat.css" });
});

export default router;
