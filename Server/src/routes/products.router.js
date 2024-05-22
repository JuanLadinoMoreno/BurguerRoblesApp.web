import { Router } from 'express'
// import ProductManager from '../dao/fileManager/ProductManager.js';
import ProductManager from '../dao/dbManager/ProductManager.js';
import { authMdw } from '../middlewares/auth.middleware.js';



// import ProductManager from  'src/ProductManager.js'


const router = Router()

// const fileName = `./server/assets/Products.json`
// const fileName = `${_dirname}/../../assets/Products.json`
const productManager = new ProductManager();



router.get('/', authMdw,  async (req, res) => {
    try {
        let limit = +req.query.limit

        // este id se puede pasar a la funcion para que solo traiga productos creaos por ese usuario
        // const id = req.user.id

        const products = await productManager.getProducts();
        // console.log('get products', products);
        if (limit > 0) return res.json(products.slice(0, limit))

        res.status(200).json(products)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }



});
router.get('/:id', authMdw, async (req, res) => {
    try {
        const id = req.params.id
        const product = await productManager.findProductById(id)
        res.status(200).json(product)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

});

//ESTO DE MODIFICO  ---OJO  en createProduct----
router.post('/', authMdw, async (req, res) => {

    try {
        // const wsServer = req.app.get('ws')
    console.log('req.user   req.user', req.user);
    const id = req.user.id //poner para usuario
    const product = {...req.body, user: id}  //poner para usuario
    // const product = {...req.body} 
    const prodCreado = await productManager.createProduct(product);
    res.status(201).json(prodCreado)
    } catch (error) {
        return res.status(500).json({ message: error })
    }
    
})

router.put('/:id', authMdw, async (req, res) => {
    const productId = +req.params.id
    const product = req.body
    const prodUpd = await productManager.updateProduct(productId, product);
    res.status(201).json(prodUpd)
})

router.delete('/:id', authMdw, async (req, res) => {
    try {
        const prodDel = await productManager.deleteProduct(req.params.id)
        if (!prodDel) {
            return res.status(400).json({ message: 'Product not found' })
        }
        //204 todo bien pero no retorna nada
        res.json(204)

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    // try {
    //     await productManager.deleteProduct(+req.params.id);
    //     res.status(200)        
    // } catch (error) {        
    // }
})

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
