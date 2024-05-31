import cartModel from '../mongo/models/carts.model.js'
import products from '../mongo/models/products.model.js'


export default class CartsManager{


    async getCarts() {
        try {
            const productos = await cartModel.find().populate('products.pid');
            // console.log('datos', productos)
            // return datos
            return productos.map(p => p.toObject({ virtuals: true }))
    
        } catch (error) {
            console.log(error);
        }
    }

    async createCart(cart) {
        console.log('cartCreate', cart );
        try {
            // this.validaDatos(cart);
            await cartModel.create(cart)
        } catch (e) {
            console.log('Error al crear crearrito', e);
        }
    }


}