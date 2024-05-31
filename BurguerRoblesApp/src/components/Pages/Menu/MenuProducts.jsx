
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useGetCategories } from '../../../Hooks/useProducts';
import { CarContext } from '../../../context/CarContext';

export default function MenuProducts() {

    const { categories, isLoading } = useGetCategories('categories');
    const { count } = useContext(CarContext);

    // console.log('categories', categories);



    return (
        <>
            {
                // isLoading ?

                // <h2>cargando</h2> :

                <div className="dvMenProductos">

                    <Link className="btn-transparent" to='/cart'>

                        <i className="bi bi-cart-fill"></i>
                        En carrito

                        <span id="cantidadProductos" className="prodCant "> {count.reduce((acc, prod) => acc + prod.quantity, 0)} </span>

                    </Link>

                    <ul className="ulMenu ">

                        {/* <div className="container "> */}



                            {/* <Link to='/menu' >
                                <img src="../../public/img/bgTripl.png" alt="" className='w-50' />
                                <li className="btn-prin btnMenu btnMenuProducto">
                                    Todos los productos
                                </li>
                            </Link> */}

                            {

                                categories.map((cate) => {
                                    return (
                                        <>
                                            <div className="container d-flex flex-wrap flex-column justify-content-center align-items-between gap-2">


                                            <Link key={cate.ids} to={`/menu/category/${cate.ids}`} >
                                                <img src={cate.thumbnail} alt="" className='w-100' />
                                                <p>{cate.nombre}</p>
                                                {/* <li className="btn-transparent btnMenu btnMenuProducto">
                                                    {cate.nombre}

                                                </li> */}
                                            </Link>
                                            </div>

                                        </>
                                    )
                                })
                            }
                        {/* </div> */}
                    </ul>



                </div>
            }

        </>

    )
}


