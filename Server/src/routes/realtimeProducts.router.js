import { Router } from 'express'
import ProductManager from '../ProductManager.js';

const router = Router()

const fileName = `./server/assets/Products.json`
const productManager = new ProductManager(fileName);

router.post('/', async (req, res) => {
    //falta try/catch
    // console.log('asdasdadlaksjfkahlsd', req.body);
    try {
        
        const product = req.body
        const prodCreado = await productManager.createProduct(product);
    
        // const products = await productManager.getProducts();
    
        //Opcion 2 emit para ael cliente con el producto creado
        req.app.get('ws').emit('newProduct', prodCreado)
    
        res.status(201).json(prodCreado)

    } catch (error) {
        console.log(error);
    }

})

router.delete('/:id', async (req, res) => {

    try {
        await productManager.deleteProduct(+req.params.id);

        const products = await productManager.getProducts();
        // console.log('ggggggggggggggggggggggggggggg', products);

        req.app.get('ws').emit('deleteProduct', products)

        // req.app.get('ws').on('usr:deleteProduct', () => {
        //     console.log('rrrrrrrrrrrrrrrrrr');
        // })

        res.status(200)

    } catch (error) {
        console.log(error);
    }
})

// router.get('/', async (req, res) => {
//     let limit = +req.query.limit
//     const products = await productManager.getProducts();
//     if (limit > 0) return res.json(products.slice(0, limit))

//     res.status(200).json(products)

//     // console.log('get products');

// });

export default router