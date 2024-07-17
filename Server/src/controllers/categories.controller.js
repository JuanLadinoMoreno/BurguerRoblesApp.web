// import productsDAO from "../dao/mongo/products.dao";

import ProductManager from "../dao/mongo/products.dao.js";

// import ProductManager from "../dao/dbManager/ProductManager.js";


const productManager = new ProductManager ()

export const getCatProducts = async (req, res) => {
    const products = await productManager.getCategories();
    // console.log('get products', products);
    // if (limit > 0) return res.json(products.slice(0, limit))

    res.status(200).json(products)


}