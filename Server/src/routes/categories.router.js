import {Router} from 'express'
import ProductManager from '../dao/dbManager/ProductManager.js';



const router = Router()

const productManager = new ProductManager();

router.get('/', async (req, res) => {
    const products = await productManager.getCategories();
    // console.log('get products', products);
    // if (limit > 0) return res.json(products.slice(0, limit))

    res.status(200).json(products)


});


// router.get('/:ids', async (req, res) => {
//     // let limit = +req.query.limit
//     const ids = req.params.id
//     const products = await productManager.getProductsByCategory(ids);
//     // console.log('get products', products);
//     // if (limit > 0) return res.json(products.slice(0, limit))

//     res.status(200).json(products)


// });

export default router