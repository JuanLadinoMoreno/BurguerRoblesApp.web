import mongoose, { Schema, model } from "mongoose";

const productSchema = new Schema({
    pid: { 
        type: mongoose.Types.ObjectId,
        ref: 'Poduct', 
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true 
    }
})

const cartsSchema = new Schema({

    cid: {
        type: String,
        // required: true
    },
    products:{
        type: [productSchema],
        default: []
    }
    // products: [productSchema],

    
    
})

// cartsSchema.virtual('id').get(function () {
//     return this._id.toString();
// })

const cartsModel = model('Carts', cartsSchema, 'carts')
export default cartsModel




// products: {
//     type: [
//         {
//             pid:{
//                 type: mongoose.Types.ObjectId,
//                 ref: 'Poduct'
//             }
//         }
//     ],
//     default: [productSchema],
// },