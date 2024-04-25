
import { useContext, useEffect } from "react";
import { CarContext } from "../context/CarContext"
import { useGetProductsCart } from "../Hooks/useProducts";
import { Head } from "../components/Head";
import BanEventos from "../components/Pages/Home/BanEventos";
import { Link } from "react-router-dom";
import MenuProducts from "../components/Pages/Menu/MenuProducts";
import { useForm } from 'react-hook-form';
import { saveCart } from "../services";






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
  // const [cartP, setCartP] = useState({})
  const { register, formState: { errors }, handleSubmit, watch, setValue } = useForm()


  const { cart, setCart, productsData, isLoading } = useGetProductsCart(count)
  // console.log('cartCart', cart);
  // console.log('count', count);

  const conv = () => {
    let arr = []
    arr.push({ products: count })
    return arr
  }

  

  // const total = cart.reduce((acc, prod) => acc + prod.precio, 0);
  let total = 0;

//Calcula total
  cart.map(producto => { total += (producto.product.precio * producto.quantity) })


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

        const prodCar = conv()
        console.log('prodCar', prodCar);

        saveCart(prodCar)
        .then((resp) => {
          if (resp === true){
            clearsObjects();
            // Swal.fire("Producto creado!", "", "info");
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Compra realizada",
              text: "Gracias por confiar en nosotros",
              showConfirmButton: true,
              // timer: 1500
            });
          }
          
        })
        .catch((err) => {
          Swal.fire("Error guardar el carrrito", "", "danger");
          console.log('err', err);
        })



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
              {/* <form onSubmit={handleSubmit()} className=" d-flex flex-column justify-content-center align-item-center gap-3 p-3 w-100"> */}



                {



                  cart.length > 0 ?

                    <div>
                      <div id="productsCarr" className="productsCarr ">
                        {
                          cart.map((producto) => {
                            return (
                              <div className="prodCarr" key={producto.product.id}>
                                <img className="imgPro" src={producto.product.urlImg} alt="" />
                                <div className="titu">
                                  <small>Producto</small>
                                  <br/>

                                  {/* <input
                                  className="bg-transparent border-0"
                                    type="text"
                                    placeholder="nombre producto"
                                    // nombre del campo para el form
                                    {...register('nombre', {
                                      required: true
                                    })}
                                    value={producto.product.nombre}
                                  /> */}

                                  <h4>{producto.product.nombre}</h4>
                                </div>
                                <div className="cantidad">
                                  <small>Cantidad</small>
                                  <p>{producto.quantity}</p>
                                </div>
                                <div className="precio">
                                  <small>Precio</small>
                                  <p>$ {producto.product.precio}</p>
                                </div>
                                <div className="subtotal">
                                  <small>Subtotal</small>
                                  <p>$ {producto.product.precio * producto.quantity}</p>
                                </div>
                                <button className="btnEliminar" onClick={() => deleteProdCart(producto.product.id)}><i className="bi bi-trash-fill"></i></button>
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

              {/* </form> */}

            </div>


        }



        <BanEventos />

      </section>

    </>

  )



}



//  [{id: '660dba3063b4664603416291', quantity: 1}, {id: '660dba3063b4664603416299', quantity: 10}]