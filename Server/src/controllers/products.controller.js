// import ProductManager from "../dao/dbManager/ProductManager.js";
import ProductManager from "../dao/mongo/products.dao.js";


const productManager = new ProductManager();

export const getProducts = async (req, res) => {
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
}

export const getProductById = async (req, res) => {
    try {
        const id = req.params.id
        const product = await productManager.findProductById(id)
        res.status(200).json(product)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

export const createProduct = async (req, res) => {

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
    
}

export const editProduct = async (req, res) => {
    const productId = +req.params.id
    const product = req.body
    const prodUpd = await productManager.updateProduct(productId, product);
    res.status(201).json(prodUpd)
}

export const deleteProduct = async (req, res) => {
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
}

export const getProductsByCat = async (req, res) => {
    // let limit = +req.query.limit
    const ids = req.params.ids
    const products = await productManager.getProductsByCategory(ids);
    // console.log('get products', products);
    // if (limit > 0) return res.json(products.slice(0, limit))

    res.status(200).json(products)


}