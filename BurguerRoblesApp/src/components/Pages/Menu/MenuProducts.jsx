
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useGetCategories } from '../../../Hooks/useProducts';
import { CarContext } from '../../../context/CarContext';



export default function MenuProducts() {

    const { categories, isLoading } = useGetCategories('categories');
    const { count } = useContext(CarContext);



    return (
        <>
            {
                // isLoading ?

                // <h2>cargando</h2> :

                    <div className="dvMenProductos">
                        <ul className="ulMenu">

                            <Link to='/menu' >
                                <li className="btn-prin btnMenu btnMenuProducto">
                                    Todos los productos
                                </li>
                            </Link>

                            {

                                categories.map((cate) => {
                                    return (
                                        <Link key={cate.id} to={`/menu/category/${cate.id}`} >
                                            <li className="btn-prin btnMenu btnMenuProducto">
                                                {cate.nombre}
                                            </li>
                                        </Link>
                                    )
                                })
                            }
                        </ul>

                        <Link className="btn-transparent" to='/cart'> 
                        
                            <i className="bi bi-cart-fill"></i>
                            En carrito

                            <span id="cantidadProductos" className="prodCant "> {count.reduce((acc, prod) => acc + prod.quantity, 0)} </span>
                        
                        </Link>
                        
                    </div>
            }

        </>

    )
}


