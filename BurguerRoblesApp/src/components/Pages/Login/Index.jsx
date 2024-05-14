import { useEffect, useState } from "react";
import { getContador } from "../../../services"


export const useGetContador = () => {
  // const [productsData, setProductsData] = useState([]);
  // const [isLoading, setIsLoading] = useState(true)



  

  return { productsData }
}

export default function Index() {

  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    // setTimeout(() => {

      getContador()
            .then((resp) => {
                setProductsData(resp.data)
            })
            .catch((err) => {
                console.log(err);
            })

            console.log(productsData);

        // setProductsData(getProducts.map((doc) => ({ id: doc.id, ...doc.data() })))

        //CON FIRESTORE
        // const db = getFirestore();
        // const productsCollection = collection(db, collectionName);
        // // const quer = id ? query(productsCollection, where("category", "==", 'burguerP')) : productsCollection;
        // const q = query(productsCollection, orderBy("category"));
        // getDocs(q).then((snapshot) => {
        //     setProductsData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
        // })

        // setIsLoading(false);
    // }, 2500);

}, []);

  return (
    <div>Index</div>
  )
}
