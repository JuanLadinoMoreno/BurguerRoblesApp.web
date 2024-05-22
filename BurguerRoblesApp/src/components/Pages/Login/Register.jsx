import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
// import { onRegister } from "../../../services/";
import { useForm } from "react-hook-form";
import { useEffect } from "react";





 function Register() {

  const { register, formState: { errors }, handleSubmit } = useForm()
  const { signUp, user, isAuthenticated } = useAuth()

  const navigate = useNavigate();

  useEffect(() => {
    if(isAuthenticated) navigate('/menu')
  
    
  }, [isAuthenticated])
  

// console.log('user user user', user);

  const onSubmitRegister = async (data) => {
    await signUp(data);

  }


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
export default Register