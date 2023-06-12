import { Router } from 'express';
// DEBO CAMBIARLO A productManagerDB.js . Pero por el momento no me anda asi que lo dejamos así.
import { productModels } from '../dao/models/productModels.js';
// import { passportCall } from '../utils/utils.js'
// import { MiRouter } from './layout/router.js'
import session from 'express-session';



const router = Router();
// const pm = new productManager();

<<<<<<< Updated upstream
//Autorizacion
//A todo esto lo debo de incluir en router.js
const auth = (req, res, next) => {
  if (!req.session.usuario) return res.redirect('/login')    //return res.sendStatus(401);
  next();
}

const auth2 = (req, res, next) => {
  if (req.session.usuario) return res.redirect('/')    //return res.sendStatus(401);
  next();
}

// const autorizacion = (rol) => {
//   return (req, res, next) => {
//     console.log(req.user)

//     if (req.user.rol == 'ADMIN') return next();
//     if (req.user.rol != rol) return res.status(403).send('No tiene privilegios suficientes para acceder al recurso');
//     next();
//   }
// }


//RUTAS
router.get('/', auth, async (req, res) => {

  let stock = await productModels.find()
  console.log(stock);
  for (const stokk of stock) {
    console.log(stokk.price);
  }
  let products = stock;
  stock ? (stock = true) : (stock = false);

  res.status(200).render('home', {
    title: 'Estufas San Juan',
    existenciaDeStock: stock,
    productos: products,
    allowProtoMethodsByDefault: true, // Opción para permitir el acceso a las propiedades del prototipo de forma segura
    estilos: 'stylesHome.css',
    nombreCompleto: req.session.usuario.nombre + ' ' + req.session.usuario.apellido,
    edad: req.session.usuario.edad,
    correo: req.session.usuario.email
  });
});

router.get('/realtimeproducts', async (req, res) => {
  let stock = await productModels.find()
  let products = stock;
  stock ? (stock = true) : (stock = false);

  res.status(200).render('realTimeProducts', {
    title: 'Estufas San Juan',
    existenciaDeStock: stock,
    productos: products,
    estilos: 'stylesReal.css'
  });
});


router.get('/chat', async (req, res) => {
  let stock = await productModels.find()
  let products = stock;
  stock ? (stock = true) : (stock = false);

  res.status(200).render('chat', {
    title: 'Chat',
    estilos: 'styles.css'
  });
});

router.get('/products', async (req, res) => {
  let paginaActual = 1;
  if (req.query.pagina) {
    paginaActual = req.query.pagina;
  }

  // let products=await productModels.find();
  let products = await productModels.paginate({ category: { $in: ['comida'] } }, { page: paginaActual, limit: 2, sort: { title: 1, price: -1 } });
  console.log(products)

  let { totalPages, hasPrevPage, hasNextPage, prevPage, nextPage } = products;


  res.setHeader('Content-Type', 'text/html');
  res.status(200).render('products', {
    title: 'Products Paginados',
    estilos: 'productsStyles.css',
    products: products.docs,
    totalPages, hasPrevPage, hasNextPage, prevPage, nextPage
  });
});

router.get('/carts/:cid', async (req, res) => {
  let cid = req.query.cid
  let paginaActual = 1;
  if (req.query.pagina) {
    paginaActual = req.query.pagina;
  }

  // let products=await productModels.find();
  let products = await productModels.paginate({ category: { $in: ['comida'] } }, { page: paginaActual, limit: 2, sort: { title: 1, price: -1 } });
  console.log(products)

  let { totalPages, hasPrevPage, hasNextPage, prevPage, nextPage } = products;


  res.setHeader('Content-Type', 'text/html');
  res.status(200).render('carts', {
    title: 'Carritos',
    estilos: 'productsStyles.css',
    cid: cid,
    products: products.docs,
    totalPages, hasPrevPage, hasNextPage, prevPage, nextPage
  });

});

router.get('/registro', auth2, (req, res) => {

  res.setHeader('Content-Type', 'text/html');
  res.status(200).render('registro')
})

router.get('/login', auth2, (req, res) => {

  res.setHeader('Content-Type', 'text/html');
  res.status(200).render('login')
})

router.get('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.sendStatus(500);
    } else {
      res.send('Logout OK...!!!')
    }
  })
})
=======
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

router.get("/products", passportCall("jwt"), authorizeUser(["user", "premium", "admin"]), async (req, res) => {
  let products = await productsViewController.getProducts(req.query);
  let user = req.user;
  res.setHeader("Content-Type", "text/html");
  res.render("products", { products, user, styles: "products.css" });
});
>>>>>>> Stashed changes

// export default class ViewsRouter extends MiRouter {
//   init() {

//     this.get('/datos', ['ADMIN'], (req, res) => {

//       res.send(`Datos actualizados... hora actual: ${new Date().toUTCString()}`)
//     })

//     this.get('/', /* auth, */['USUARIO'], async (req, res) => {

//       let stock = await productModels.find()
//       console.log(stock);
//       for (const stokk of stock) {
//         console.log(stokk.price);
//       }
//       let products = stock;
//       stock ? (stock = true) : (stock = false);

//       res.status(200).render('home', {
//         title: 'Estufas San Juan',
//         existenciaDeStock: stock,
//         productos: products,
//         allowProtoMethodsByDefault: true, // Opción para permitir el acceso a las propiedades del prototipo de forma segura
//         estilos: 'stylesHome.css',
//         nombreCompleto: req.session.usuario.nombre + ' ' + req.session.usuario.apellido,
//         edad: req.session.usuario.edad,
//         correo: req.session.usuario.email
//       });
//     });

//     this.get('/realtimeproducts', async (req, res) => {
//       let stock = await productModels.find()
//       let products = stock;
//       stock ? (stock = true) : (stock = false);

//       res.status(200).render('realTimeProducts', {
//         title: 'Estufas San Juan',
//         existenciaDeStock: stock,
//         productos: products,
//         estilos: 'stylesReal.css'
//       });
//     });


//     this.get('/chat', async (req, res) => {
//       let stock = await productModels.find()
//       let products = stock;
//       stock ? (stock = true) : (stock = false);

//       res.status(200).render('chat', {
//         title: 'Chat',
//         estilos: 'styles.css'
//       });
//     });

//     this.get('/products', async (req, res) => {
//       let paginaActual = 1;
//       if (req.query.pagina) {
//         paginaActual = req.query.pagina;
//       }

//       // let products=await productModels.find();
//       let products = await productModels.paginate({ category: { $in: ['comida'] } }, { page: paginaActual, limit: 2, sort: { title: 1, price: -1 } });
//       console.log(products)

//       let { totalPages, hasPrevPage, hasNextPage, prevPage, nextPage } = products;


//       res.setHeader('Content-Type', 'text/html');
//       res.status(200).render('products', {
//         title: 'Products Paginados',
//         estilos: 'productsStyles.css',
//         products: products.docs,
//         totalPages, hasPrevPage, hasNextPage, prevPage, nextPage
//       });
//     });

//     this.get('/carts/:cid', async (req, res) => {
//       let cid = req.query.cid
//       let paginaActual = 1;
//       if (req.query.pagina) {
//         paginaActual = req.query.pagina;
//       }

//       // let products=await productModels.find();
//       let products = await productModels.paginate({ category: { $in: ['comida'] } }, { page: paginaActual, limit: 2, sort: { title: 1, price: -1 } });
//       console.log(products)

//       let { totalPages, hasPrevPage, hasNextPage, prevPage, nextPage } = products;


//       res.setHeader('Content-Type', 'text/html');
//       res.status(200).render('carts', {
//         title: 'Carritos',
//         estilos: 'productsStyles.css',
//         cid: cid,
//         products: products.docs,
//         totalPages, hasPrevPage, hasNextPage, prevPage, nextPage
//       });

//     });

//     this.get('/registro', /* auth2, */ (req, res) => {

//       res.setHeader('Content-Type', 'text/html');
//       res.status(200).render('registro')
//     })

//     this.get('/login', /* auth2, */ (req, res) => {

//       res.setHeader('Content-Type', 'text/html');
//       res.status(200).render('login')
//     })

//     this.get('/logout', (req, res) => {
//       req.session.destroy((error) => {
//         if (error) {
//           return res.sendStatus(500);
//         } else {
//           res.send('Logout OK...!!!')
//         }
//       })
//     })
//   }
// }


export default router; 