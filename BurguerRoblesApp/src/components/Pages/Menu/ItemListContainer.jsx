import { Link, useLoaderData } from "react-router-dom"
import {useForm} from 'react-hook-form'
import io from 'socket.io-client'
import MenuProducts from "./MenuProducts"
import ProdBig from "../../ProdBig"
import { useGetProducts } from "../../../Hooks/useProducts"
import {saveProduct} from '../../../services/index'



const socketIo = io('http://localhost:8080/')

// import { useGetCategories } from "../../../Hooks/useProducts";


export default function ItemListContainer({ productsData }) {

    // const {categories} = useGetCategories();

    // const [isLoading, setMenuState] = useState(true);
    const { isLoading, setIsLoading } = useGetProducts('products')

    //Formulario
    const {register, formState:{errors}, handleSubmit} = useForm()

    //Funcion de click enviar enviar producto, data variable gen que los datos del form
    const onSubmitProduct = (data) => {
        console.log('lado cliente',data);

        socketIo.emit('productDataForm', (data) => {
            saveProduct(data)
        })

    }

    return (
        <>

            <section className="container d-flex justify-content-center">

                {/* <form onSubmit={handleSubmit(onSubmitProduct)}> */}
                <form action="/api/realTimeProducts" method="post" onSubmit={handleSubmit(onSubmitProduct)}>
                    <input
                        type="text"
                        placeholder="nombre producto"
                        // nombre del campo para el form
                        {...register('nombre',{
                            required:true
                        })}  
                    />
                    {errors.nombre?.type === 'required' && <p className="text-danger"> El campo nombre es requerido</p>}
                    <br /><br />

                    <input
                        type="text"
                        placeholder="tipo producto"
                        {...register('tipo',{
                            required:true
                        })}
                    />
                    {errors.tipo?.type === 'required' && <p className="text-danger"> El campo nombre es requerido</p>}
                    <br /><br />

                    <input
                        type="text"
                        placeholder="preparacion"
                        {...register('preparacion',{
                            required:true
                        })}
                    />
                    {errors.preparacion?.type === 'required' && <p className="text-danger"> El campo nombre es requerido</p>}
                    <br /><br />


                    <input
                        type="text"
                        placeholder="ingrediente preparacion"
                        {...register('ingrePrep',{
                            required:true
                        })}
                        
                    />
                    {errors.ingrePrep?.type === 'required' && <p className="text-danger"> El campo nombre es requerido</p>}
                    <br /><br />

                    <select {...register('tipoProd')}>
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
                        {...register('pan',{
                            required:true
                        })}
                    />
                    {errors.pan?.type === 'required' && <p className="text-danger"> El campo nombre es requerido</p>}
                    <br /><br />

                    <input
                        type="text"
                        placeholder="nombre precio"
                        {...register('precio',{
                            required:true
                        })}
                    />
                    {errors.precio?.type === 'required' && <p className="text-danger"> El campo nombre es requerido</p>}
                    <br /><br />
                        vegetales
                    <input type="checkbox" 
                        {...register('vegetal')}
                    />
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
                                productsData.map(products => {
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
