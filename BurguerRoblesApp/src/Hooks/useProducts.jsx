
import { useState, useEffect } from 'react';
import { collection, getDocs, doc, getDoc, getFirestore, query, where, orderBy } from 'firebase/firestore';
import { Logger } from 'sass';
import {getProducts} from '../services'


export const useGetProducts = (collectionName = 'products') => {
    const [productsData, setProductsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    

    useEffect(() => {
        setTimeout(() => {

            getProducts()
            .then((resp) => {
                setProductsData(resp.data)
            })
            .catch((err) => {
                console.log(err);
            })

            // setProductsData(getProducts.map((doc) => ({ id: doc.id, ...doc.data() })))

            //CON FIRESTORE
            // const db = getFirestore();
            // const productsCollection = collection(db, collectionName);
            // // const quer = id ? query(productsCollection, where("category", "==", 'burguerP')) : productsCollection;
            // const q = query(productsCollection, orderBy("category"));
            // getDocs(q).then((snapshot) => {
            //     setProductsData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
            // })

            setIsLoading(false);
        }, 2500);
        
    }, []);

    return { productsData, isLoading, setIsLoading }
}

export const useGetProductsCat = (id) => {
    const [productsData, setProductsData] = useState([]);
    // const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        
        // setTimeout(() => {

            const db = getFirestore();

            const productsCollection = collection(db, 'products');

            const quer = query(productsCollection, where("category", "==", id));

            getDocs(quer).then((snapshot) => {
                setProductsData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
            })
            // setIsLoading(false);
        // }, 3500);

    }, [id]);

    return { productsData }
}

export const useGetProductsCart = (carrito) => {
    // const [productsData, setProductsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [cart, setCart] = useState([])

    useEffect(() => {
        
        setTimeout(() => {

            const db = getFirestore();

            const productsCollection = collection(db, 'products');

            const arrCart = []

            getDocs(productsCollection).then((snapshot) => {


                snapshot.docs.map((doc) => {

                    for (let i = 0; i < carrito.length; i++) {
                        if (doc.id === carrito[i].id) {
                            arrCart.push({ ...doc.data(), id: doc.id, quantity: carrito[i].quantity })
                        }

                    }


                })


                setCart(arrCart);
                // setProductsData(arrCart);
                setIsLoading(false);

            })

        }, 1000);

    }, []);

    return { cart, setCart, isLoading }
}


export const useGetProductsById = (id, collectionName = "products") => {
    const [productData, setProductData] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {

            const db = getFirestore();
            const docRef = doc(db, collectionName, id)
            getDoc(docRef).then((doc) => {
                setProductData({ id: doc.id, ...doc.data() });
            })

            setIsLoading(false);
        }, .3500);

    }, []);

    return { productData, isLoading }
}


//LLENA EL MENU DE CATEGORIAS
export const useGetCategories = (collectionName = "categories") => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // setTimeout(() => {}, 3200);

        const db = getFirestore();
        const productsCollection = collection(db, collectionName);
        getDocs(productsCollection).then((snapshot) => {
            setCategories(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
        })

        setIsLoading(false);

    }, []);

    return { categories, isLoading }
}





export const useGetProductsByCategorys = (id) => {
    const [productsData, setProductsData] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            // ----API Refrerenciia----
            // getProductByCategory(id).then(response => {
            //     setProductsData(response.data);
            // }).catch(error => { console.log(error); })


            //FIRESTORE SIN ID
            // const db = getFirestore();
            // const productsCollection = collection(db, 'products');
            // getDocs(productsCollection).then((snapshot) => {
            //     setProductsData(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})))
            // })



            //FIRESTOTE CON ID
            const db = getFirestore();
            const docRef = doc(db, 'products', id)
            getDoc(docRef).then((doc) => {
                setProductsData({ id: doc.id, ...doc.data() });
            })
        }, 3200);

    }, [id]);

    return { productsData }
}