import {Router} from 'express'
import ProductManager from '../ProductManager.js';

const router = Router()

const fileName = `./server/assets/Products.json`
const productManager = new ProductManager(fileName);

router.post('/', async (req, res) => {
    //falta try/catch
    // console.log('asdasdadlaksjfkahlsd', req.body);

    
    const product = req.body
    const prodCreado = await productManager.createProduct(product);

    // const products = await productManager.getProducts();

    //Opcion 2 emit para ael server con el producto creado
    req.app.get('ws').emit('newProduct', prodCreado)

    res.status(201).json(prodCreado)
}) 

export default router