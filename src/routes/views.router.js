import { Router } from 'express';
import { productModels } from '../dao/models/productModels.js';
// DEBO CAMBIARLO A productManagerDB.js . Pero por el momento no me anda asi que lo dejamos así.
import productRouter from './products.router.js';

const auth = (req, res, next) => {
  if (!req.session.usuario) return res.redirect('/login')    //return res.sendStatus(401);
  next();
}

const auth2 = (req, res, next) => {
  if (req.session.usuario) return res.redirect('/')    //return res.sendStatus(401);
  next();
}

const router = Router();
// const pm = new productManager();

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
    estilos: 'stylesHome.css'                               ,
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

export default router; 