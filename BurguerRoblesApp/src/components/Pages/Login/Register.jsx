import { useForm } from "react-hook-form";
import { onRegister } from "../../../services/";


const onSubmitRegister = (data) => {
    // OPCION CON THEN
  onRegister(data)
  .then((resp) => {
    if (resp === true) {
      // console.log('resp', resp);
      Swal.fire("Usuario Creado!", "", "info");

    }
    else {
      Swal.fire("No fue posibles crear usuario", "", "danger");

    }
  })
  .catch((err) => {
    Swal.fire("Error guardar el producto", "", "danger");
    console.log('err', err);
  })

}


export default function Register() {
    const { register, formState: { errors }, handleSubmit } = useForm()

  return (
    <>

<section className="container d-flex justify-content-center align-item-center">
    

<form onSubmit={handleSubmit(onSubmitRegister)} className=" d-flex flex-column justify-content-center align-item-center gap-3 p-3 w-75">

  <h2>Register</h2>

   <div className="d-flex flex-column">
    <input
      type="text"
      placeholder="Nombre"
      // nombre del campo para el form
      {...register('firstName', {
        required: true
      })}
    />
    {errors.firstName?.type === 'required' && <p className="text-danger"> El campo nombre es requerido</p>}
  </div>

  <div className="d-flex flex-column">
    <input
      type="text"
      placeholder="Apellidos"
      {...register('lastName', {
        required: true
      })}
    />
    {errors.lastName?.type === 'required' && <p className="text-danger"> El campo apellido es requerido</p>}
  </div>

  <div className="d-flex flex-column">
    <input
      type="number"
      placeholder="Edad"
      {...register('age', {
        required: true
      })}

    />
    {errors.age?.type === 'required' && <p className="text-danger"> El campo edad es requerido</p>}
  </div> 

  <div className="d-flex flex-column">
    <input
      type="email"
      placeholder="Correo Electrónico"
      {...register('email', {
        required: true
      })}

    />
    {errors.email?.type === 'required' && <p className="text-danger"> Correo electronico es obligatorio</p>}
  </div>

  <div className="d-flex flex-column">
    <input
      type="password"
      placeholder="Contraseña"
      {...register('password', {
        required: true,
        minLength: 5
      })}

    />
    {errors.password?.type === 'required' && <p className="text-danger"> La contraseña es oblogatoria es requerido</p>}
    {errors.password?.type === 'minLength' && <p className="text-danger"> Passwordesss must have at least 8 characters</p>}
  </div>



  <button type="submit">Enviar</button>


</form>
</section>

    </>
  )
}
