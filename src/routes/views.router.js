import { Router } from 'express';
import { productModels } from '../dao/models/productModels.js';
// DEBO CAMBIARLO A productManagerDB.js . Pero por el momento no me anda asi que lo dejamos así.
import productRouter from './products.router.js';

const router = Router();
// const pm = new productManager();

router.get('/', async (req, res) => {


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
    estilos: 'stylesHome.css'
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

router.get('/chat', async (req, res) => {
  let paginaActual = 1;
  if (req.query.pagina) {
    paginaActual = req.query.pagina;
  }

  // let usuarios=await usuariosModelo.find();
  let products = await productModels.paginate({ title: { $sort: 1 } }, { page: paginaActual, limit: 30, sort: { title: 1, price: -1 } });
  console.log(products)

  let { totalPages, hasPrevPage, hasNextPage, prevPage, nextPage } = products;


  res.setHeader('Content-Type', 'text/html');
  res.status(200).render('products', {
    products: products.docs,
    totalPages, hasPrevPage, hasNextPage, prevPage, nextPage
  });

});

export default router; 