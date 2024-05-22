import { createContext, useContext, useEffect, useState } from "react"
import { onRegister, onLogin, onVerifyToken } from "../services";
import Cookies from 'js-cookie'

const AuthContext = createContext();

//hook para importar el uso del contexto (tre los datos de value={{}} del context)
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within a AuthProvider");
    return context;
};

export const AuthProvider = ({ children }) => {


    const [user, setUser] = useState({})
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {

        async function checkLogin() {
            const cookies = Cookies.get();




            if (cookies.token) {
                try {
                    const res = await onVerifyToken(cookies.token)
                    if (!res.data) setIsAuthenticated(false)

                        console.log('res', res);
                    setIsAuthenticated(true)
                    setUser(res.data)
                } catch (error) {
                    setIsAuthenticated(false)
                    setUser(null)
                }
            }
        }

        checkLogin();

    }, [])

    // useEffect(() => {
    //     const checkLogin = async () => {
    //         const cookies = Cookies.get();
    //         if (!cookies.token) {
    //             setIsAuthenticated(false);
    //             // setLoading(false);
    //             setUser(null)
    //             return;
    //         }

    //         try {
    //             const res = await verifyTokenRequest(cookies.token);
    //             console.log(res);
    //             if (!res.data) return setIsAuthenticated(false);
    //             setIsAuthenticated(true);
    //             setUser(res.data);
    //             // setLoading(false);
    //         } catch (error) {
    //             setIsAuthenticated(false);
    //             // setLoading(false);
    //         }
    //     };
    //     checkLogin();
    // }, []);

    const signUp = async (userP) => {
        console.log('signUp');

        try {
            // console.log('userP', userP);
            const resp = await onRegister(userP)
            // console.log('resp.data', resp.data);

            setUser(resp.data)
            setIsAuthenticated(true)
        } catch (error) {
            console.log(error);
        }



        // // OPCION CON THEN
        // onRegister(userP)
        //     .then((resp) => {
        //         console.log('resp.data', resp);
        //         // if (resp === true) {
        //         //     // console.log('resp', resp);
        //         //     Swal.fire("Usuario Creado!", "", "info");

        //         // }
        //         // else {
        //         //     Swal.fire("No fue posibles crear usuario", "", "danger");

        //         // }
        //     })
        //     .catch((err) => {
        //         Swal.fire("Error guardar el producto", "", "danger");
        //         console.log('err', err);
        //     })
    }

    const signIn = async (userP) => {
        console.log('signIn');

        try {
            // console.log('userP', userP);
            const resp = await onLogin(userP)
            // console.log('resp.data', resp.data);

            setUser(resp.data)
            setIsAuthenticated(true)
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <AuthContext.Provider
            value={
                {
                    signUp,
                    signIn,
                    user,
                    isAuthenticated,
                }
            }>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;