
import { useContext, useEffect } from "react";
import { CarContext } from "../context/CarContext"
import { useGetProductsCart } from "../Hooks/useProducts";
import { Head } from "../components/Head";
import BanEventos from "../components/Pages/Home/BanEventos";
import { Link } from "react-router-dom";
import MenuProducts from "../components/Pages/Menu/MenuProducts";






// const deleteProd = (ob, func, id) => {

//   const newOb = structuredClone(ob);
//   const indexOb = newOb.findIndex(producto => producto.id === id);
//   newOb.splice(indexOb,1);
//   func(newOb);


//   // const newCart = structuredClone(cart);
//   // const indexFind = newCart.findIndex(producto => producto.id === id);
//   // newCart.splice(indexFind,1);
//   // setCart(newCart);
// }





export const Cart = () => {

  // count es el arreglo de los productos del carrito, solo viene el id y la cantidad
  const { count, setCount } = useContext(CarContext);
  

  const { cart, setCart, productsData, isLoading } = useGetProductsCart(count)
  
  // const total = cart.reduce((acc, prod) => acc + prod.precio, 0);
  // 
  let total = 0;
  // useEffect(() => {


  // }, [])


  cart.map(producto => { total += (producto.precio * producto.quantity) })


  const deleteProdCart = (id) => {

    Swal.fire({
      title: "Desea eliminar el producto del carrito?",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#FC0",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {

        // deleteProd(count, setCount(), id)
        const newCount = structuredClone(count);
        const indexCount = newCount.findIndex(producto => producto.id === id);
        newCount.splice(indexCount, 1);
        setCount(newCount);



        const newCart = structuredClone(cart);
        const indexFind = newCart.findIndex(producto => producto.id === id);
        newCart.splice(indexFind, 1);
        setCart(newCart);

        // setProductsData(newCart);



        Swal.fire({
          position: "center",
          icon: "success",
          title: "Producto eliminado",
          showConfirmButton: false,
          timer: 1500
        });
      }
    });



    return (count, cart)
  }

  const clearsObjects = () => {
    setCount([]);
    setCart([]);
    total = 0;
  }

  const clearCart = () => {

    Swal.fire({
      title: "Desea vaciar el carrito?",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#FC0",
      cancelButtonColor: "#d33",
      confirmButtonText: "Vaciar!"
    }).then((result) => {
      if (result.isConfirmed) {
        clearsObjects();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "El carrito está vacío",
          showConfirmButton: false,
          timer: 1500
        });
      }
    });

  }

  const buyCart = () => {

    Swal.fire({
      title: "Desea realizar la compra?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#FC0",
      cancelButtonColor: "#d33",
      confirmButtonText: "Comprar!"
    }).then((result) => {
      if (result.isConfirmed) {
        clearsObjects();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Compra realizada",
          text: "Gracias por confiar en nosotros",
          showConfirmButton: true,
          // timer: 1500
        });
      }
    });

    //   Swal.fire({
    //     title: "Seguro que deseas vaciar?",
    //     showDenyButton: false,
    //     showCancelButton: true,
    //     showConfirmButton: true,
    //     confirmButtonText: "Acepto",
    // }).then(() => {
    //   if (result.isConfirmed) {
    //   setCount([]);
    //   setCart([]);
    //   total = 0;
    //   }
    // })


  }



  return (

    <>

      <Head title={"Carrito"} />


      <section className="contMen">



        <MenuProducts />

        {
          isLoading ?

            <l-dot-spinner
              size="80"
              speed="1.1"
              color="#0F1854"
            >
            </l-dot-spinner> :


            <div className="contCarr container">

              {



                cart.length > 0 ?

                  <div>
                    <div id="productsCarr" className="productsCarr ">
                      {
                        cart.map((producto) => {
                          return (
                            <div className="prodCarr" key={producto.id}>
                              <img className="imgPro" src={producto.urlImg} alt="" />
                              <div className="titu">
                                <small>Producto</small>
                                <h4>{producto.nombre}</h4>
                              </div>
                              <div className="cantidad">
                                <small>Cantidad</small>
                                <p>{producto.quantity}</p>
                              </div>
                              <div className="precio">
                                <small>Precio</small>
                                <p>$ {producto.precio}</p>
                              </div>
                              <div className="subtotal">
                                <small>Subtotal</small>
                                <p>$ {producto.precio * producto.quantity}</p>
                              </div>
                              <button className="btnEliminar" onClick={() => deleteProdCart(producto.id)}><i className="bi bi-trash-fill"></i></button>
                            </div>
                          )

                        })


                      }


                    </div>

                    <div id="accCarr" className="accCarr ">
                      <div className="dvVaciar">
                        <button onClick={clearCart} className="btnVaciar btn btn-danger"> <i className="bi bi-cart-dash-fill"></i> Vaciar
                          carrito</button>
                      </div>
                      <div className="dvCalcu">
                        <div className="total">
                          <p>Total</p>
                          <p>💲 {total} </p>
                        </div>
                        <button className="btn-prin btnComprar" onClick={buyCart}>Comprar ahora</button>
                      </div>
                    </div>
                    
                    <Link to={"/menu"} className="btnVaciar btn btn-prin">
                      Seguir comprando
                    </Link>
                  </div>
                  :
                  <h2 id="carVacio" className="carVacio ">
                    Tu carrito está vacío.
                    <i className="bi bi-emoji-frown"></i>
                  </h2>

              }

            </div>


        }



        <BanEventos />

      </section>

    </>

  )



}
