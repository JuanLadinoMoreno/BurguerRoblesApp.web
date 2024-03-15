import {Router} from 'express'
import ProductManager from '../ProductManager.js';

const router = Router()

const fileName = `./server/assets/Products.json`
const productManager = new ProductManager(fileName);

router.post('/', async (req, res) => {

    console.log('asdasdadlaksjfkahlsd', req.body);

    // const wsServer = req.app.get('ws')

    // const product = req.body
    // const prodCreado = await productManager.createProduct(product);
    // res.status(201).json(prodCreado)
})

export default router