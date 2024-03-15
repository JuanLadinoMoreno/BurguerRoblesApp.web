import React, { useContext, useState } from 'react'
import Toastify from 'toastify-js'
import { ToastContainer, Zoom, toast } from 'react-toastify';
import { CarContext } from '../context/CarContext'



export const ItemCount = ({ productId, productName }) => {

    const { count, setCount } = useContext(CarContext);
    const [countItem, setCountItem] = useState(1);


    const handleAddItem = () => {
        setCountItem(countItem + 1);
    }

    const handleRemoveItem = () => {
        if (countItem === 1) return;

        setCountItem(countItem - 1);
    }

    const addCart = () => {
        // setCount(count + countItem);

        const newProduct =
        {
            id: productId,
            quantity: countItem
        }

        const IndexFind = count.findIndex(item => item.id === productId)
        if (IndexFind >= 0) {
            const newCart = structuredClone(count);
            newCart[IndexFind].quantity += countItem
            setCountItem(1);

            // toast.success('Producto agregado2!     ' + toString(productName).toUpperCase() );
            Toastify({
                text: "Producto agregado " + productName.toUpperCase(),
                duration: 1800,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                className: "toastAgregarP"
                
              }).showToast();
            return setCount(newCart);
            
        }else{
            setCount(prevState => ([
                ...prevState,
                {
                    id: productId,
                    quantity: countItem
                }
            ]))

            setCountItem(1);

            // toast.success('Producto agregado !!!   ' + productName.toUpperCase());

            Toastify({
                text: "Producto agregado " + productName.toUpperCase(),
                duration: 1800,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                className: "toastAgregarP"
                
              }).showToast();
            
        }

   
        

        

        
    }

    return (
        <div className="itemCount">
            <button className="btnAnadirP" onClick={handleRemoveItem}><i className="bi bi-cart-plus-fill"></i> ➖ </button>
            <span> {countItem} </span>
            <button className="btnAnadirP" onClick={handleAddItem}><i className="bi bi-cart-plus-fill"></i> ➕ </button>
            <button className="btnAnadirP" onClick={addCart}><i className="bi bi-cart-plus-fill"></i>Agregar al Carrito</button>
            {/* <ToastContainer 
            position="top-right"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition: Bounce
            /> */}
        </div>
    )
}
