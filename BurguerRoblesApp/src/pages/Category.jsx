import React from 'react'
import ItemListContainer from '../components/Pages/Menu/ItemListContainer'
import { useParams } from 'react-router-dom';
import { useGetProducts, useGetProductsCat } from '../Hooks/useProducts';
import { Head } from '../components/Head';


export const Category = () => {
  const { id } = useParams();

  const { productsData } = useGetProductsCat(id);

  return (
    <>


      <Head title={'Menu'}/>

      <ItemListContainer productsData={productsData} />


    </>
  )

}
