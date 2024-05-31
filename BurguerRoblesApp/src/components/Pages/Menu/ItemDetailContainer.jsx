import { useContext, useState } from 'react'
import { useGetProductsById } from '../../../Hooks/useProducts'
import { Link, useParams } from 'react-router-dom'
import MenuProducts from './MenuProducts'
import { CarContext } from '../../../context/CarContext'
import ProdBig from '../../ProdBig'
import { ItemCount } from '../../ItemCount'



export default function ItemDetailContainer() {

    const { id } = useParams() //Obtiene id de la ruta para mostrar el producto
    // const { productData, isLoading } = useGetProductsById(id, 'products') //firestore
    const { productData, isLoading } = useGetProductsById(id)
    // console.log('productData', productData);



    return (

        <>

            {
                isLoading ?
                    <l-dot-spinner
                        size="80"
                        speed="1.1"
                        color="#0F1854"
                    ></l-dot-spinner> :

                    <section className="contMen">

                        <MenuProducts />
                        {/* <div className="container"></div> */}

                            {/* ojo aca */}


                            <div className="dvProductDetail">

                                <div className="dvProducto" key={productData._id}>
                                    <h3>{productData.nombre}</h3>


                                    <div className="datProd">

                                        <img className="imgProducto" src={productData.thumbnail} alt="" width='350px' />
                                        <ul className="ulIngre">
                                            <li >{productData.ingrePrep}</li>
                                            <li >{productData.pan}</li>
                                            {
                                                productData.aderesos ? productData.aderesos.map((adereso, index) => (<li key={productData.nombre + index}> {adereso} </li>)) : null
                                                // productData.aderesos ? productData.aderesos.map((adereso) => (<li key={adereso.id}> {adereso.nombre} </li>)) : null
                                            }
                                            {
                                                productData.vegetales ? productData.vegetales.map((vegetal, index) => (<li key={productData.nombre + index}> {vegetal} </li>)) : null
                                                // productData.vegetales ? productData.vegetales.map((adereso) => (<li key={adereso.id}>{adereso.nombre}</li>)) : null
                                            }
                                            <li>{productData.precio}</li>
                                        </ul>
                                    </div>

                                    <ItemCount productId={productData.id} productName={productData.nombre} />
                                </div>
                            </div>

                        

                    </section>
            }




            <ProdBig />

        </>
    )
}
