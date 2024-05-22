import { useState } from "react";
import { saveProduct } from "../../../services";
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'


// import { useHistory } from 'react-router-dom';

const save = async (data) => {
  const lete = await saveProduct(data)
  return lete
}

const onSubmitProducts = async (data) => {

  // const {isCreated} = useCreateProd(data)

  try {

    // console.log('save', save);
    Swal.fire({
      title: "Desea guardar el producto?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        

        // const aa = save(data)
        //   console.log('aa',aa);
        // if (aa === true) {
        //   Swal.fire("Saved!", "", "success");
        // } else {
        //   Swal.fire("No pue posible guardar el producto", "", "info");
        // }

        // console.log('saveProduct(data)', saveProduct(data));

        // OPCION CON THEN
        saveProduct(data)
          .then((resp) => {
            console.log('resp', resp);
            if (resp === true) {
              // console.log('resp', resp);
              Swal.fire("Producto creado!", "", "info");

            }
            else {
              Swal.fire("No pue posible guardar el producto", "", "danger");

            }
          })
          .catch((err) => {
            Swal.fire("Error guardar el producto", "", "danger");
            console.log('err', err);
          })

         



          


        // if (saveProduct(data) === false) {
        //   Swal.fire("No pue posible guardar el producto", "", "info");
        //   // return <Redirect to="/menu" />;
        // } else {
        //   Swal.fire("Saved!", "", "success");
        //   // return <Redirect to="/menu" />;
        // }
      }
      else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });




    // console.log('data', data);
  } catch (error) {
    console.log('error', error);
  }



}


// if (onSubmitProducts) {

// }

export default function AddProducts() {
  const { register, formState: { errors }, handleSubmit, watch, setValue } = useForm()

  return (
    <>
      <section className="container d-flex justify-content-center align-item-center">

        <form onSubmit={handleSubmit(onSubmitProducts)} className=" d-flex flex-column justify-content-center align-item-center gap-3 p-3 w-75">
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
      </section></>
  )
}
