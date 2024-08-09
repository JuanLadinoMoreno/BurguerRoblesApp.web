import ProductsDAO from "../dao/mongo/products.dao.js";
import { ProductsCategoriesDTO } from "../dto/productsCategories.dto.js";

const productsDAO = new ProductsDAO ()
// const prodDTO = new ProductsCategoriesDTO()

export default class ProductsCategoriesService {
    
    async getCategories(){
        try {
            const categories = await  productsDAO.getCategories()

            const products = categories.map(category => new ProductsCategoriesDTO(category));
            
            return products
        } catch (error) {
            console.log(error);
        }
    }

}