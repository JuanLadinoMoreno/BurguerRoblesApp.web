import { Link } from "react-router-dom"
import { useForm } from 'react-hook-form'
import io from 'socket.io-client'
import MenuProducts from "./MenuProducts"
import ProdBig from "../../ProdBig"
import { useGetProducts, useDeleteProd } from "../../../Hooks/useProducts"
import { saveProduct, deleteProduct } from '../../../services/index'
import { useEffect, useState } from "react"
import Swal from 'sweetalert2'


// const socketIo = io.connect('http://localhost:8080/') //socketIO 

// import { useGetCategories } from "../../../Hooks/useProducts";


export default function ItemListContainer({ productsData, setProductsData }) {

    const { isLoading, setIsLoading } = useGetProducts()



    // let arre = productsDatas

    // const [productss, setProductss] = useState()
    const [productsState, setProductsState] = useState([]);
    // const [products, setProducts] = useState(productsDatas);

    // const {categories} = useGetCategories();

    // const [isLoading, setMenuState] = useState(true);
    // console.log('1 productsData', productsData);
    // console.log('2 productsDatas', productsDatas);
    // console.log('3 productss', productss);

    // console.log('4 setProductsState', productsState);
    // console.log('5 arre', arre);
    //Formulario
    const { register, formState: { errors }, handleSubmit, watch, setValue } = useForm()
    // const [selectAll, setSelectAll] = useState(false);
    const [aderesos, setAderesos] = useState([]); // Inicializar aderesos como un array vacío


    //Para seleccionar y todas los checks de aderesos y vegetales
    // const watchAllAde = watch('selectAllAde')
    // console.log('selectAllAde', watchAllAde)

    // const watchAllVeg = watch('selectAllVeg')

    // const asigProds = (prods) => {
    //     setProductsState(prods)
    //     // console.log('4 setProductsState', productsState);
    // }



    //     // Función para manejar el clic en el checkbox "Select All"
    //   const handleSelectAll = () => {
    //     const aderesos = watch('aderesos'); // Obtener el valor actual de los checkboxes aderesos
    //     const newValue = !selectAll; // Cambiar el valor de selectAll

    //     setSelectAll(newValue); // Actualizar el estado local de selectAll

    //     // Si selectAll es true, seleccionar todos los checkboxes; de lo contrario, deseleccionarlos
    //     if (newValue) {
    //       const updatedAderesos = aderesos.map((adereso) => adereso = true);
    //       setValue("aderesos", updatedAderesos); // Actualizar los valores de los checkboxes aderesos
    //     } else {
    //       const updatedAderesos = aderesos.map((adereso) => adereso = false);
    //       setValue("aderesos", updatedAderesos); // Actualizar los valores de los checkboxes aderesos
    //     }
    //   };

    // Función para manejar el clic en el checkbox "Select All"
    //   const handleSelectAll = () => {
    //     const newValue = !selectAll;
    //     setSelectAll(newValue);

    //     // Actualizar el estado de aderesos para reflejar la selección de todos los checkboxes
    //     const updatedAderesos = aderesos.map(() => newValue);
    //     setAderesos(updatedAderesos);

    //     // Actualizar los valores de los checkboxes aderesos utilizando setValue de React Hook Form
    //     setValue("aderesos", updatedAderesos);
    //   };

    //Funcion de click enviar enviar producto, data variable gen que los datos del form
    const onSubmitProduct = (data) => {
        //  alert(JSON.stringify(data));

        // e.preventDefault();
        // setProducts(productsData)

        //OJO ESTO SE EJECUTA
        // console.log('data', data);
        saveProduct(data)



        // productsDatas.push(data)
        // console.log('lado clientes productsData', productsDatas);
        // console.log('lado cliente products', productss);

        // socketIo.emit('productDataForm', data)

        // console.log('lado clientessssssss', productsData);

        // saveProduct(data)
        //     .then((resp) => {
        //         // setProductsData(resp.data)
        //         console.log('producto guardadossssss', resp);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     })


    }



    // useEffect(() => {
    //     // asigProds()

    //     // setProductsState(arre)


    //     // setProductss([productsDatas])s
    //     // console.log('setProducts([...productsDatas])', productss);
    //     // console.log('55 arre useefect', arre);


    //     //OJO ESTA SE EJECUTA
    //     socketIo.on("newProduct", reciveProd)

    //     socketIo.on('deleteProduct', (prod) => {
    //         setProductsData(prod)
    //     })

    //     // socketIo.on('newProduct', (prod) => {
    //     //     console.log('1111111111111111111', productsState);
    //     //     reciveProd
    //     //     // setProductss([productsDatas])

    //     //     // setProductss([1,2,3])
    //     //     console.log('newProduct useEffect', prod)
    //     //     // productsDatas.push(prod)
    //     //     // productsDatas = [...productsDatas, prod]

    //     //     // console.log('socjet on newProduct', productss);
    //     //     // setproducts([...products, prod])
    //     //     // productsDatas = prod
    //     //     console.log('arre socket NewProd sin push', arre)
    //     //     // arre.push(prod)
    //     //     // arre = prod
    //     //     console.log('arre socket NewProd con push', arre)
    //     //     // productsDatas.push(prod)
    //     //     console.log(' productsData useEffect', productsDatas);
    //     // })

    //     // control para duplicar
    //     return () => {
    //         socketIo.off('newProduct', reciveProd)
    //     }

    // }, [])

    // const reciveProd = (prod) => {
    //     // setProductsState((state) => [...state, prod])
    //     setProductsData((state) => [...state, prod])

    // }




    const deleteProdId = (id) => {


        try {

            // console.log('save', save);
            Swal.fire({
                title: "Do you want to save the changes?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {


                    // OPCION CON THEN
                    // saveProduct(data)
                    //     .then((resp) => {
                    //         if (resp === true) {
                    //             // console.log('resp', resp);
                    //             Swal.fire("Producto creado!", "", "info");

                    //         }
                    //         else {
                    //             Swal.fire("No fue posible guardar el producto", "", "danger");

                    //         }
                    //     })
                    //     .catch((err) => {
                    //         Swal.fire("Error al guardar el producto", "", "danger");
                    //         console.log('err', err);
                    //     })

                    deleteProduct(id)
                        .then((resp) => {

                            if (resp === true) {
                                const clonProds = structuredClone(productsData);
                                const index = clonProds.findIndex(prod => prod.id === id);
                                clonProds.splice(index, 1);
                                setProductsData(clonProds);

                                socketIo.emit('usr:deleteProduct', id)

                                Swal.fire("Producto eliminado!", "", "info");

                            }
                            else {
                                Swal.fire("No fue posible eliminar el producto", "", "danger");

                            }


                        })
                        .catch((err) => {
                            Swal.fire("Error al eliminar el producto", "", "danger");
                            console.log('err', err);
                        })



                }
                else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }
            });

        } catch (error) {
            console.log('error', error);
        }





        // // useDeleteProd(id)
        // const {isDelete} = useDeleteProd(id)
        // if (isDelete) {
        //     console.log('simon');
        // }

        // productsData = {...productsData}

        // const prodctIndex = productsData.findIndex(prod => prod.id === id)
        // productsData.splice(prodctIndex, 1)

        // console.log('productsData', productsData);
    }
    const deleteProdIds = (id) => {
        // console.log('lasñdkñalsd');

        deleteProduct(id)

        const clonProds = structuredClone(productsState);
        const index = clonProds.findIndex(prod => prod.id === id);
        clonProds.splice(index, 1);
        setProductsState(clonProds);

        // // useDeleteProd(id)
        // const {isDelete} = useDeleteProd(id)
        // if (isDelete) {
        //     console.log('simon');
        // }

        // productsData = {...productsData}

        // const prodctIndex = productsData.findIndex(prod => prod.id === id)
        // productsData.splice(prodctIndex, 1)

        // console.log('productsData', productsData);
    }

    // console.log('6 useeffect', productsState);
    return (
        <>

            <section className="contMen">
                <MenuProducts />
                {
                    isLoading ?
                        // Default values shown
                        <l-dot-spinner
                            size="80"
                            speed="1.1"
                            color="#0F1854"
                        >
                        </l-dot-spinner> :



                        <div className="dvProductos" >

                            {

                                productsData.map(products => {
                                    return (

                                        <div className="dvProducto" key={products._id}>


                                            <h3>{products.nombre}</h3>


                                            <div className="datProd">

                                                <Link to={`/menu/item/${products._id}`}>
                                                    <img className="imgProducto" src={products.thumbnail} alt="" loading="lazy" />
                                                </Link>

                                                <ul className="ulIngre">
                                                    <li>{products.ingrePrep}</li>
                                                    <li>{products.pan}</li>

                                                    {
                                                        products.aderesos ? products.aderesos.map((adereso, index) => (<li key={products.nombre + index}> {adereso} </li>)) : null
                                                        // products.aderesos ? products.aderesos.map((adereso) => (<li key={products.nombre + adereso.id}>{adereso.nombre}</li>)) : null
                                                    }


                                                    {
                                                        products.vegetales ? products.vegetales.map((vegetal, index) => (<li key={products.nombre + index}> {vegetal} </li>)) : null
                                                        // products.vegetales ? products.vegetales.map((adereso) => (<li key={products.nombre + adereso.id}>{adereso.nombre}</li>)) : null
                                                    }

                                                    <li>{products.precio}</li>
                                                </ul>
                                            </div>
                                            <Link to={`/menu/item/${products._id}`} className="btnAnadirP" ><i className="bi bi-cart-plus-fill"></i>Ordenar</Link>
                                            <button onClick={() => { deleteProdId(products._id) }} > eliminar </button>
                                        </div>




                                    )

                                })



                            }

                            {/* <div className="dvProductos"></div> */}




                        </div>



                }




                <ProdBig />

            </section>
        </>
    )
}
