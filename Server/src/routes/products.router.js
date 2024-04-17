import {Router} from 'express'
// import ProductManager from '../dao/fileManager/ProductManager.js';
import ProductManager from '../dao/dbManager/ProductManager.js';

// import ProductManager from  'src/ProductManager.js'


const router = Router()

const fileName = `./server/assets/Products.json`
// const fileName = `${_dirname}/../../assets/Products.json`
const productManager = new ProductManager();



router.get('/', async (req, res) => {
    let limit = +req.query.limit
    const products = await productManager.getProducts();
    // console.log('get products', products);
    if (limit > 0) return res.json(products.slice(0, limit))

    res.status(200).json(products)


});
router.get('/:id', async (req, res) => {
    const id = req.params.id
    const product = await productManager.findProductById(id)
    res.json(product)
});

// router.post('/', async (req, res) => {

//     // const wsServer = req.app.get('ws')

//     const product = req.body
//     const prodCreado = await productManager.createProduct(product);
//     res.status(201).json(prodCreado)
// })

router.put('/:id', async (req, res) => {
    const productId = +req.params.id
    const product = req.body
    const prodUpd = await productManager.updateProduct(productId, product);
    res.status(201).json(prodUpd)
})

router.delete('/:id', async (req, res) => {
    await productManager.deleteProduct(+req.params.id);
    res.status(200)
})

router.get('/category/:ids', async (req, res) => {
    // let limit = +req.query.limit
    const ids = req.params.ids
    const products = await productManager.getProductsByCategory(ids);
    // console.log('get products', products);
    // if (limit > 0) return res.json(products.slice(0, limit))

    res.status(200).json(products)


});


export default router
// module.exports = router
