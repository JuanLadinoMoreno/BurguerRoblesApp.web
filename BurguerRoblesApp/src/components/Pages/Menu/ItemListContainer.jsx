import { Link, useLoaderData } from "react-router-dom"
import { useForm } from 'react-hook-form'
import io from 'socket.io-client'
import MenuProducts from "./MenuProducts"
import ProdBig from "../../ProdBig"
import { useGetProducts } from "../../../Hooks/useProducts"
import { saveProduct } from '../../../services/index'
import { useEffect, useState } from "react"


const socketIo = io.connect('http://localhost:8080/')

// import { useGetCategories } from "../../../Hooks/useProducts";


export default function ItemListContainer({ productsDatas }) {

    const { isLoading, setIsLoading } = useGetProducts('products')

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
    const { register, formState: { errors }, handleSubmit } = useForm()

    const asigProds = (prods) => {
        setProductsState(prods)
        // console.log('4 setProductsState', productsState);
    }


    //Funcion de click enviar enviar producto, data variable gen que los datos del form
    const onSubmitProduct = (data) => {
        // e.preventDefault();
        // setProducts(productsData)
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

        socketIo.on("newProduct", reciveProd)

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
        setProductsState((state) => [...state, prod])
    }

    // console.log('6 useeffect', productsState);
    return (
        <>

            <section className="container d-flex justify-content-center">

                {/* <form onSubmit={handleSubmit(onSubmitProduct)}> */}
                <form onSubmit={handleSubmit(onSubmitProduct)}>
                    <input
                        type="text"
                        placeholder="nombre producto"
                        // nombre del campo para el form
                        {...register('nombre', {
                            required: true
                        })}
                    />
                    {errors.nombre?.type === 'required' && <p className="text-danger"> El campo nombre es requerido</p>}
                    <br /><br />


                    <input
                        type="text"
                        placeholder="preparacion"
                        {...register('preparacion', {
                            required: true
                        })}
                    />
                    {errors.preparacion?.type === 'required' && <p className="text-danger"> El campo nombre es requerido</p>}
                    <br /><br />


                    <input
                        type="text"
                        placeholder="ingrediente preparacion"
                        {...register('ingrePrep', {
                            required: true
                        })}

                    />
                    {errors.ingrePrep?.type === 'required' && <p className="text-danger"> El campo nombre es requerido</p>}
                    <br /><br />

                    <select {...register('tipo')}>
                        <option value="burguerP">Hamburguesa</option>
                        <option value="hotdogP" >Hot dog</option>
                        <option value="bagP">Baguette</option>
                        <option value="sandP">Sandwiche</option>
                        <option value="burrP">Burrito</option>
                    </select>
                    <br /><br />



                    <input
                        type="text"
                        placeholder="nombre pan"
                        {...register('pan', {
                            required: true
                        })}
                    />
                    {errors.pan?.type === 'required' && <p className="text-danger"> El campo nombre es requerido</p>}
                    <br /><br />

                    <input
                        type="text"
                        placeholder="nombre precio"
                        {...register('precio', {
                            required: true,
                            valueAsNumber: true
                        })}
                    />
                    {errors.precio?.type === 'required' && <p className="text-danger"> El campo nombre es requerido</p>}
                    <br /><br />
                    Status
                    <input type="checkbox"
                        {...register('status')}
                    />
                    <br /><br />

                    <input
                        type="text"
                        placeholder="productos en stock"
                        {...register('stock', {
                            required: true,
                            valueAsNumber: true
                        })}
                    />
                    {errors.tipo?.type === 'required' && <p className="text-danger"> El campo nombre es requerido</p>}
                    <br /><br />

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

                                productsDatas.map(products => {
                                    return (

                                        <div className="dvProducto" key={products.id}>


                                            <h3>{products.nombre}</h3>


                                            <div className="datProd">

                                                <Link to={`/menu/item/${products.id}`}>
                                                    <img className="imgProducto" src={products.thumbnail} alt="" />
                                                </Link>

                                                <ul className="ulIngre">
                                                    <li >{products.ingrePrep}</li>
                                                    <li >{products.pan}</li>

                                                    {
                                                        products.aderesos ? products.aderesos.map((adereso) => (<li key={products.nombre + adereso.id}> {adereso.nombre} </li>)) : null
                                                    }


                                                    {
                                                        products.vegetales ? products.vegetales.map((adereso) => (<li key={products.nombre + adereso.id}>{adereso.nombre}</li>)) : null
                                                    }

                                                </ul>
                                            </div>
                                            <Link to={`/menu/item/${products.id}`} className="btnAnadirP" ><i className="bi bi-cart-plus-fill"></i>Ordenar</Link>
                                        </div>

                                        


                                    )

                                })
                                

                                
                            }

                            {/* <div className="dvProductos"></div> */}
                            
                            {
                                
                                productsState.map(products => {
                                    return (
    
                                        <div className="dvProducto" key={products.id}>
    
    
                                            <h3>{products.nombre}</h3>
    
    
                                            <div className="datProd">
    
                                                <Link to={`/menu/item/${products.id}`}>
                                                    <img className="imgProducto" src={products.thumbnail} alt="" />
                                                </Link>
    
                                                <ul className="ulIngre">
                                                    <li >{products.ingrePrep}</li>
                                                    <li >{products.pan}</li>
    
                                                    {
                                                        products.aderesos ? products.aderesos.map((adereso) => (<li key={products.nombre + adereso.id}> {adereso.nombre} </li>)) : null
                                                    }
    
    
                                                    {
                                                        products.vegetales ? products.vegetales.map((adereso) => (<li key={products.nombre + adereso.id}>{adereso.nombre}</li>)) : null
                                                    }
    
                                                </ul>
                                            </div>
                                            <Link to={`/menu/item/${products.id}`} className="btnAnadirP" ><i className="bi bi-cart-plus-fill"></i>Ordenar</Link>
                                        </div>
    
    
                                    )
    
                                })

                            }


                        </div>



                }




                <ProdBig />

            </section>
        </>
    )
}
