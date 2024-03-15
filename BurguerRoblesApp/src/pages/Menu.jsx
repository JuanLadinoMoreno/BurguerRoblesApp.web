
import React, { useEffect, useState } from 'react'
import ItemListContainer from '../components/Pages/Menu/ItemListContainer'
import { useGetProducts } from '../Hooks/useProducts';
import { Head } from '../components/Head';
Head

export default function Menu() {

     const { productsData } = useGetProducts()


    return (
        <>
            <Head title={'Menu'}/>

            <ItemListContainer productsData = {productsData}/>
        </>
    )
}
