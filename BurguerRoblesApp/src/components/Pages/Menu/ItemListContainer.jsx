import { Link } from "react-router-dom"
import { useForm } from 'react-hook-form'
import io from 'socket.io-client'
import MenuProducts from "./MenuProducts"
import ProdBig from "../../ProdBig"
import { useGetProducts, useDeleteProd } from "../../../Hooks/useProducts"
import { saveProduct, deleteProduct } from '../../../services/index'
import { useEffect, useState } from "react"


const socketIo = io.connect('http://localhost:8080/')

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



    useEffect(() => {
        // asigProds()

        // setProductsState(arre)


        // setProductss([productsDatas])s
        // console.log('setProducts([...productsDatas])', productss);
        // console.log('55 arre useefect', arre);


        //OJO ESTA SE EJECUTA
        socketIo.on("newProduct", reciveProd)

        socketIo.on('deleteProduct', (prod) => {
            setProductsData(prod)
        })

        // socketIo.on('newProduct', (prod) => {
        //     console.log('1111111111111111111', productsState);
        //     reciveProd
        //     // setProductss([productsDatas])

        //     // setProductss([1,2,3])
        //     console.log('newProduct useEffect', prod)
        //     // productsDatas.push(prod)
        //     // productsDatas = [...productsDatas, prod]

        //     // console.log('socjet on newProduct', productss);
        //     // setproducts([...products, prod])
        //     // productsDatas = prod
        //     console.log('arre socket NewProd sin push', arre)
        //     // arre.push(prod)
        //     // arre = prod
        //     console.log('arre socket NewProd con push', arre)
        //     // productsDatas.push(prod)
        //     console.log(' productsData useEffect', productsDatas);
        // })

        // control para duplicar
        return () => {
            socketIo.off('newProduct', reciveProd)
        }

    }, [])

    const reciveProd = (prod) => {
        // setProductsState((state) => [...state, prod])
        setProductsData((state) => [...state, prod])

    }

    const deleteProdId = (id) => {
        console.log('lasñdkñalsd');
        
        deleteProduct(id)

        const clonProds = structuredClone(productsData);
        const index = clonProds.findIndex(prod => prod.id === id);
        clonProds.splice(index, 1);
        setProductsData(clonProds);

        socketIo.emit('usr:deleteProduct', id)

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
        console.log('lasñdkñalsd');
        
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

            <section className="container d-flex justify-content-center align-item-center">

                {/* <form onSubmit={handleSubmit(onSubmitProduct)}> */}
                <form onSubmit={handleSubmit(onSubmitProduct)} className=" d-flex flex-column justify-content-center align-item-center gap-3 p-3 w-75">
                    <h2>Crear Producto</h2>
                    <div className="d-flex flex-column">
                        <input
                            type="text"
                            placeholder="nombre producto"
                            // nombre del campo para el form
                            {...register('nombre', {
                                required: true
                            })}
                        />
                        {errors.nombre?.type === 'required' && <p className="text-danger"> El campo nombre es requerido</p>}
                    </div>

                    <div className="d-flex flex-column">
                        <input
                            type="text"
                            placeholder="preparacion"
                            {...register('preparacion', {
                                required: true
                            })}
                        />
                        {errors.preparacion?.type === 'required' && <p className="text-danger"> El campo nombre es requerido</p>}
                    </div>

                    <div className="d-flex flex-column">
                        <input
                            type="text"
                            placeholder="ingrediente preparacion"
                            {...register('ingrePrep', {
                                required: true
                            })}

                        />
                        {errors.ingrePrep?.type === 'required' && <p className="text-danger"> El campo nombre es requerido</p>}
                    </div>

                    <select {...register('tipo')}>
                        <option value="burguerP">Hamburguesa</option>
                        <option value="hotdogP" >Hot dog</option>
                        <option value="bagP">Baguette</option>
                        <option value="sandP">Sandwiche</option>
                        <option value="burrP">Burrito</option>
                    </select>



                    <div className="d-flex flex-column">
                        <input
                            type="text"
                            placeholder="nombre pan"
                            {...register('pan', {
                                required: true
                            })}
                        />
                        {errors.pan?.type === 'required' && <p className="text-danger"> El campo nombre es requerido</p>}
                    </div>


                    <div className="d-flex flex-column ">
                        <h3>ADERESOS</h3>

                        <div className="d-flex justify-content-between align-item-center">

                            

                            <div className="mb-3">
                                <p>Catsup</p>
                                <input type="checkbox"
                                    // value={JSON.stringify({"id": 1, "nombre": "Catsup"})}
                                    value="Catsup"
                                    // checked= {watchAllAde}
                                    {...register("aderesos")}
                                />
                            </div>

                            <div className="mb-2">
                                <p>Mayonesa</p>
                                <input type="checkbox"
                                    // value={JSON.stringify({"id": 2, "nombre": "Mayonesa"})}
                                    value="Mayonesa"
                                    // checked= {watchAllAde}
                                    {...register("aderesos")}
                                />
                            </div>

                            <div className="mb-3">
                                <p>Mostaza</p>
                                <input type="checkbox"
                                    // value={JSON.stringify({"id": 3, "nombre": "Mostaza"})}
                                    value="Mostaza"
                                    // checked= {watchAllAde}
                                    {...register("aderesos")}
                                />
                            </div>

                        </div>

                        {/* <div>
                            {errors.aderesos && <span className="text-danger"> {errors.aderesos.message}</span>}
                        </div> */}

                    </div>

                    <div className="d-flex flex-column ">
                        <h3>VEGETALES</h3>

                        <div className="d-flex justify-content-between align-item-center">

                            

                            <div className="mb-3">
                                <p>Jitomate</p>
                                <input type="checkbox"
                                    // value={JSON.stringify({"id": 1, "nombre": "Catsup"})}
                                    value="Jitomate"
                                    // checked={watchAllVeg}
                                    {...register("vegetales")}
                                />
                            </div>

                            <div className="mb-2">
                                <p>Cebolla</p>
                                <input type="checkbox"
                                    // value={JSON.stringify({"id": 2, "nombre": "Mayonesa"})}
                                    value="Cebolla"
                                    // checked={watchAllVeg}
                                    {...register("vegetales")}
                                />
                            </div>

                            <div className="mb-3">
                                <p>Rajas</p>
                                <input type="checkbox"
                                    // value={JSON.stringify({"id": 3, "nombre": "Mostaza"})}
                                    value="Rajas"
                                    // checked={watchAllVeg}
                                    {...register("vegetales")}
                                />
                            </div>

                            <div className="mb-3">
                                <p>Aguacate</p>
                                <input type="checkbox"
                                    // value={JSON.stringify({"id": 3, "nombre": "Mostaza"})}
                                    value="Aguacate"
                                    // checked={watchAllVeg}
                                    {...register("vegetales")}
                                />
                            </div>

                            <div className="mb-3">
                                <p>Frijoles</p>
                                <input type="checkbox"
                                    // value={JSON.stringify({"id": 3, "nombre": "Mostaza"})}
                                    value="Frijoles"
                                    // checked={watchAllVeg}
                                    {...register("vegetales")}
                                />
                            </div>

                            <div className="mb-3">
                                <p>Lechuga</p>
                                <input type="checkbox"
                                    // value={JSON.stringify({"id": 3, "nombre": "Mostaza"})}
                                    value="Lechuga"
                                    // checked={watchAllVeg}
                                    {...register("vegetales")}
                                />
                            </div>

                        </div>

                        {/* <div>
                            {errors.vegetales && <span className="text-danger"> {errors.vegetales.message}</span>}
                        </div> */}

                    </div>


                    <div className="d-flex flex-column">
                        <input
                            type="text"
                            placeholder="Precio"
                            {...register('precio', {
                                required: true,
                                valueAsNumber: true
                            })}
                        />
                        {errors.precio?.type === 'required' && <p className="text-danger"> El campo nombre es requerido</p>}
                    </div>

                    <div className="d-flex flex-column">
                        Status
                        <input type="checkbox"
                            {...register('status')}
                        />
                    </div>

                    <div className="d-flex flex-column">
                        <input
                            type="text"
                            placeholder="productos en stock"
                            {...register('stock', {
                                required: true,
                                valueAsNumber: true
                            })}
                        />
                        {errors.tipo?.type === 'required' && <p className="text-danger"> El campo nombre es requerido</p>}
                    </div>

                    <button type="submit">Enviar</button>


                </form>
            </section>


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



                        <div className="dvProductos">

                            {

                                productsData.map(products => {
                                    return (

                                        <div className="dvProducto" key={products.id}>


                                            <h3>{products.nombre}</h3>


                                            <div className="datProd">

                                                <Link to={`/menu/item/${products.id}`}>
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
                                            <Link to={`/menu/item/${products.id}`} className="btnAnadirP" ><i className="bi bi-cart-plus-fill"></i>Ordenar</Link>
                                            <button onClick={() => { deleteProdId(products.id) }} > eliminar </button>
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
