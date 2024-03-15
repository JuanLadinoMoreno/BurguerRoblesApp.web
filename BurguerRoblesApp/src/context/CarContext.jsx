import { createContext, useState } from "react"

export const CarContext = createContext();

export const CarProvider = ({children}) => {


    const [count, setCount] = useState([]);

    // const handleAdd = () =>{
    //     setCount (count + 1);
    // }

    // const handleRemove = () =>{
    //     if (count === 0) return;
        
    //     setCount (count - 1);
    // }

    return(
        <CarContext.Provider value = {{count, setCount}}>
            {children}
        </CarContext.Provider>
    )
}