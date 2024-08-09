
import ProductsCategoriesService from "../services/productsCategories.services.js";


const categoriesManager = new ProductsCategoriesService ()

export const getCatProducts = async (req, res) => {
    const products = await categoriesManager.getCategories();
    console.log('products', products);
    
    // console.log('get products', products);
    // if (limit > 0) return res.json(products.slice(0, limit))

    res.status(200).json(products)


}