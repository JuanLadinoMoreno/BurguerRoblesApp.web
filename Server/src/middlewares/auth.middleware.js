import jwt from "jsonwebtoken";

// verificacion con JWT
export const authMdw = (req, res, next) => {
    try {      
      const { token } = req.cookies;
      // verifica que exista token
      if (!token)
        return res
    .status(401)
    .json({ message: "No token, authorization denied" });
    
    // verifica que el token sea el del servidor
      jwt.verify(token, 'TOKEN_SECRET', (error, user) => {
        if (error) {
          return res.status(401).json({ message: "Token is not valid" });
        }
        req.user = user;
        next();
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };





// export const userIsLoggedIn = (req, res, next) => {
//         // el usuario debe tener una sesión iniciada
//         const isLoggedIn = ![null, undefined].includes(req.session.user)
//         if (!isLoggedIn) {
//             return res.status(401).json({ error: 'User should be logged in!' })
//         }

//         next()
//     }

    // userIsNotLoggedIn: (req, res, next) => {
    //     // el usuario no debe tener una sesión iniciada
    //     const isLoggedIn = ![null, undefined].includes(req.session.user)
    //     if (isLoggedIn) {
    //         return res.status(401).json({ error: 'User should not be logged in!' })
    //     }

    //     next()
    // }
