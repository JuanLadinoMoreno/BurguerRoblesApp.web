
import React, { useEffect, useState } from 'react'
import ItemListContainer from '../components/Pages/Menu/ItemListContainer'
import { useGetProducts } from '../Hooks/useProducts';
import { Head } from '../components/Head';
import NavBar from "../components/NavBar"
import NavDash from '../components/Dash/components/NavDash';


export default function Menu() {

    const { productsData, setProductsData } = useGetProducts()

    useEffect(() => {
        // Añadir la clase no-scroll a html y body al cargar la página
        document.documentElement.classList.add('no-scroll');
        document.body.classList.add('no-scroll');

        // Limpiar al desmontar el componente
        return () => {
            document.documentElement.classList.remove('no-scroll');
            document.body.classList.remove('no-scroll');
        };
    }, []);




    return (
        <>
            <div className="wrapper">

                <NavDash />

                {/* <Head title={'Menu'}/>
            <NavBar/> */}
                <div className="main">
                    <ItemListContainer productsData={productsData} setProductsData={setProductsData} />
                </div>
            </div>
        </>
    )
}
