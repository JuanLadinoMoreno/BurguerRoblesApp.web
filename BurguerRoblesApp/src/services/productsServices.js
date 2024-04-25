import axios from "axios";

export async function getProducts(){
    // return await axios.get('https://run.mocky.io/v3/407c83b9-74d8-4d7a-a2d5-9383309833fc');
    // return await axios.get('https://apimocha.com/burguerrobles/products');
    // return await axios.get('https://run.mocky.io/v3/d4883467-9de7-4fb4-97d6-9c985bcbaa5e');
    try {
        return await axios.get('http://localhost:8080/api/products');
        
    } catch (error) {
        console.log('url not found');
    }
}

export async function getProductById(id){
    // return await axios.get(`https://apimocha.com/burguerrobles/products/${id}`);
    // return await axios.get(`https://apimocha.com/burgrob/products/${id}`);

    try {
        return await axios.get(`http://localhost:8080/api/products/${id}`);
        
    } catch (error) {
        console.log('url not found');
    }
    
}

export async function getProductByCategory(id){
    try {
        // return await axios.get(`https://apimocha.com/burguerrobles/menu/category/${id}`);
        return await axios.get(`http://localhost:8080/api/products/category/${id}`);
        
    } catch (error) {
        console.log('url not found');
    }

}

export async function saveProduct(product){
    try{
        // console.log('ffffffffffffff', product);
        await axios({
            url: 'http://localhost:8080/api/realTimeProducts',
            method: 'POST',
            data: product
        })
        // console.log('true');
        return true
    }catch(e){
        // console.log('false');
        console.log('Erroro al conextarse al servidor paa guardar', e);
        return false
    }
}

export async function deleteProduct(id){

    // console.log('deleteProduc llamada axios', id);
    try {
         await axios.delete(`http://localhost:8080/api/realTimeProducts/${id}`);
         return true
        // return getProducts()
    } catch (error) {
        console.log('url not found for delete');
        return false
    }

    // try {
    //      await axios.delete(`http://localhost:8080/api/products/${id}`);
    //     // return getProducts()
    // } catch (error) {
    //     console.log('url not found for delete');
    // }

//     try {
//         await axios.delete(`http://localhost:8080/api/products/${id}`).then(resp => {
//            return getProducts()
//         })
//    } catch (error) {
//        console.log('url not found for delete');
//    }
}


export async function getCategories(){
    // return await axios.get('https://run.mocky.io/v3/51e38cd8-db77-42a0-b891-f4a98e36c770');
    // return await axios.get('https://apimocha.com/burgrob/menu/categories');
    // return await axios.get('https://run.mocky.io/v3/aa14650b-9ca7-4c98-871b-6933386f9de9');

    try {
        return await axios.get('http://localhost:8080/api/categories');
        
    } catch (error) {
        console.log('url not found');
    }
    
}

export async function getProductsInCart(){
    // return await axios.get('https://run.mocky.io/v3/407c83b9-74d8-4d7a-a2d5-9383309833fc');
    // return await axios.get('https://apimocha.com/burguerrobles/products');
    // return await axios.get('https://run.mocky.io/v3/d4883467-9de7-4fb4-97d6-9c985bcbaa5e');
    try {
        return await axios.get('http://localhost:8080/api/carts');
        
    } catch (error) {
        console.log('url not found');
    }
}

export async function saveCart(cart){
    try{
        console.log('cart', cart);
        await axios({
            url: 'http://localhost:8080/api/carts',
            method: 'POST',
            data: cart
        })
        // console.log('true');
        return true
    }catch(e){
        // console.log('false');
        console.log('Erroro al conextarse al servidor paa guardar', e);
        return false
    }
}