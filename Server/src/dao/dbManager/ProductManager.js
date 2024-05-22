// import fs from 'fs';
import categoriesModel from '../../models/categories.models.js';
import productModel from '../../models/products.model.js'
import { ObjectId } from 'mongodb'


export default class ProductManager {


    // constructor(paths) {
    //     this.#path = paths;
    // }

    async initialize() {
        // this.#products = await this.getProductsFile();
    }

    validaDatos(produc) {
        if ((produc.ingrePrep === "" || !produc.ingrePrep) ||
            (produc.nombre === "" || !produc.nombre) ||
            (produc.pan === "" || !produc.pan) ||
            (isNaN(produc.precio) || produc.precio < 0) ||
            (produc.preparacion === "" || !produc.preparacion) ||
            (!produc.tipo || produc.tipo === "") ||
            ((produc.status != true && produc.status != false)) ||
            (isNaN(produc.stock) || produc.stock < 0)
        ) {
            // console.log("Verifique que los campos esten coorectos o llenos");
            throw new Error(`Verifique que los campos esten coorectos o llenos`)
        }
    }

    async getProducts() {
        try {
            const productos = await productModel.find();

            // Para traer productos creados por el usuario            
            // const productos = await productModel.find({ user: id}).populate('user');

            return productos.map(p => p.toObject({ virtuals: true }))

        } catch (error) {
            console.log(error);
        }
    }

    async findProductById(id) {
        try {
            const product = await productModel.findOne({ _id: id });
            return product.toObject({ virtuals: true });
        } catch (error) {
            console.log(error);
        }
    }



    // falata agregar los campos de producto    ojo aca esta mal
    async createProduct(produc) {
        console.log(produc);
        try {
            this.validaDatos(produc);
            
            await productModel.create(produc)
        } catch (e) {
            console.log('Error al crear producto', e);
        }
    }
    // 

    // async deleteProduct(id = '6619a998eacc45356e34ea2c') {
    async deleteProduct(id) {
        try {
            console.log(id);
            // console.log('id deleteProduct', id);
            // await productModel.deleteOne({ _id: id })
            const prod = await productModel.findByIdAndDelete(id)
            console.log(prod);
           

            return prod

        } catch (exp) {
            console.log(exp);
            // return [];
        }
    }

    async getProductsByCategory(ids){
        try {
            const productosByCategory = await  productModel.find({tipo: ids});
            // console.log('datos', datos)
            // return datos
            return productosByCategory.map(p => p.toObject())
            
        } catch (error) {
            console.log(error);
        }
    }


    // llena menu de categorias
    async getCategories(){
        try {
            const categories = await  categoriesModel.find();
            return categories.map(p => p.toObject())
            
        } catch (error) {
            console.log(error);
        }
    }


}
