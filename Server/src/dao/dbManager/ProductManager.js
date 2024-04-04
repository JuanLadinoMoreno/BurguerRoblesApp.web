import fs from 'fs';
import proMod from '../models/products.model.js'


export default class ProductManager {


    // constructor(paths) {
    //     this.#path = paths;
    // }

    async initialize() {
        // this.#products = await this.getProductsFile();
    }
 

    async getProducts(){
        try {
            const datos = await  proMod.find();
            console.log('datos', datos)
            return datos
            
        } catch (error) {
            console.log(error);
        }
    }
    


    validaDatos(produc){
        if((produc.ingrePrep === "" || !produc.ingrePrep) ||
            (produc.nombre === "" || !produc.nombre)  ||
            (produc.pan === "" || !produc.pan) ||
            (isNaN(produc.precio) || produc.precio < 0) ||
            (produc.preparacion === "" || !produc.preparacion) ||
            (!produc.tipo || produc.tipo === "") ||
            (!produc.status || (produc.status != true && produc.status != false) ) || 
            (isNaN(produc.stock) ||  produc.stock < 0) 
            )
        {
            // console.log("Verifique que los campos esten coorectos o llenos");
            throw new Error(`Verifique que los campos esten coorectos o llenos`)
        }
    }


}
