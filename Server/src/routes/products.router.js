import { Router } from 'express'
// import ProductManager from '../dao/fileManager/ProductManager.js';
// import ProductManager from '../dao/dbManager/ProductManager.js';
import { authMdw } from '../middlewares/auth.middleware.js';
import { createProduct, deleteProduct, editProduct, getProductById, getProducts, getProductsByCat } from '../controllers/products.controller.js';



// import ProductManager from  'src/ProductManager.js'


const router = Router()

// const fileName = `./server/assets/Products.json`
// const fileName = `${_dirname}/../../assets/Products.json`




router.get('/', authMdw,  getProducts);

router.get('/:id', authMdw, getProductById);

//ESTO DE MODIFICO  ---OJO  en createProduct----
router.post('/', authMdw, createProduct)

router.put('/:id', authMdw, editProduct)

router.delete('/:id', authMdw, deleteProduct)

// router.delete('/:id', async (req, res) => {

//     try {
//         await productManager.deleteProduct(req.params.id);

//         // devuelce productos
//         const products = await productManager.getProducts();
//         // console.log('ggggggggggggggggggggggggggggg', products);

//         req.app.get('ws').emit('deleteProduct', products)

//         // req.app.get('ws').on('usr:deleteProduct', () => {
//         //     console.log('rrrrrrrrrrrrrrrrrr');
//         // })

//         res.status(200)

//     } catch (error) {
//         res.status(400)
//         console.log(error);
//     }
// })

router.get('/category/:ids', getProductsByCat);


export default router
// module.exports = router
