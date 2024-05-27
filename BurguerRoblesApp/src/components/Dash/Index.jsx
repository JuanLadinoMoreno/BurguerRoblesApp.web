import { useEffect, useState } from "react";
import { getContador } from "../../services"
import NavDash from "./components/NavDash";
import Footer from "../Footer";
import ItemListContainer from "../Pages/Menu/ItemListContainer";
import { useGetProducts } from "../../Hooks/useProducts";



export default function Index() {
  const { productsData, setProductsData } = useGetProducts()
  const [isExpanded, setIsExpanded] = useState(true)

  useEffect(() => {
    // Añadir la clase no-scroll a html y body al cargar la página
    document.documentElement.classList.add('no-scroll');
    document.body.classList.add('no-scroll');

    // Limpiar al desmontar el componente
    return () => {
      document.documentElement.classList.remove('no-scroll');
      document.body.classList.remove('no-scroll');
    };
  }, []);

 

  return (
    <>
      <div className="wrapper ">

      <NavDash/>  

        <div className="main p-3">
          <div className="text-center">
            <h1>
              Sidebar Bootstrap 5
            </h1>

            <ItemListContainer productsData = {productsData} setProductsData = {setProductsData}/>


            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi exercitationem fuga cupiditate, autem, quibusdam reiciendis consequatur a deleniti est ipsa tenetur quos cumque possimus saepe in odio officiis! Minima, quibusdam.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi exercitationem fuga cupiditate, autem, quibusdam reiciendis consequatur a deleniti est ipsa tenetur quos cumque possimus saepe in odio officiis! Minima, quibusdam.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi exercitationem fuga cupiditate, autem, quibusdam reiciendis consequatur a deleniti est ipsa tenetur quos cumque possimus saepe in odio officiis! Minima, quibusdam.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi exercitationem fuga cupiditate, autem, quibusdam reiciendis consequatur a deleniti est ipsa tenetur quos cumque possimus saepe in odio officiis! Minima, quibusdam.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi exercitationem fuga cupiditate, autem, quibusdam reiciendis consequatur a deleniti est ipsa tenetur quos cumque possimus saepe in odio officiis! Minima, quibusdam.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi exercitationem fuga cupiditate, autem, quibusdam reiciendis consequatur a deleniti est ipsa tenetur quos cumque possimus saepe in odio officiis! Minima, quibusdam.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi exercitationem fuga cupiditate, autem, quibusdam reiciendis consequatur a deleniti est ipsa tenetur quos cumque possimus saepe in odio officiis! Minima, quibusdam.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi exercitationem fuga cupiditate, autem, quibusdam reiciendis consequatur a deleniti est ipsa tenetur quos cumque possimus saepe in odio officiis! Minima, quibusdam.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi exercitationem fuga cupiditate, autem, quibusdam reiciendis consequatur a deleniti est ipsa tenetur quos cumque possimus saepe in odio officiis! Minima, quibusdam.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi exercitationem fuga cupiditate, autem, quibusdam reiciendis consequatur a deleniti est ipsa tenetur quos cumque possimus saepe in odio officiis! Minima, quibusdam.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi exercitationem fuga cupiditate, autem, quibusdam reiciendis consequatur a deleniti est ipsa tenetur quos cumque possimus saepe in odio officiis! Minima, quibusdam.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi exercitationem fuga cupiditate, autem, quibusdam reiciendis consequatur a deleniti est ipsa tenetur quos cumque possimus saepe in odio officiis! Minima, quibusdam.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi exercitationem fuga cupiditate, autem, quibusdam reiciendis consequatur a deleniti est ipsa tenetur quos cumque possimus saepe in odio officiis! Minima, quibusdam.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi exercitationem fuga cupiditate, autem, quibusdam reiciendis consequatur a deleniti est ipsa tenetur quos cumque possimus saepe in odio officiis! Minima, quibusdam.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi exercitationem fuga cupiditate, autem, quibusdam reiciendis consequatur a deleniti est ipsa tenetur quos cumque possimus saepe in odio officiis! Minima, quibusdam.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi exercitationem fuga cupiditate, autem, quibusdam reiciendis consequatur a deleniti est ipsa tenetur quos cumque possimus saepe in odio officiis! Minima, quibusdam.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi exercitationem fuga cupiditate, autem, quibusdam reiciendis consequatur a deleniti est ipsa tenetur quos cumque possimus saepe in odio officiis! Minima, quibusdam.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi exercitationem fuga cupiditate, autem, quibusdam reiciendis consequatur a deleniti est ipsa tenetur quos cumque possimus saepe in odio officiis! Minima, quibusdam.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi exercitationem fuga cupiditate, autem, quibusdam reiciendis consequatur a deleniti est ipsa tenetur quos cumque possimus saepe in odio officiis! Minima, quibusdam.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi exercitationem fuga cupiditate, autem, quibusdam reiciendis consequatur a deleniti est ipsa tenetur quos cumque possimus saepe in odio officiis! Minima, quibusdam.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi exercitationem fuga cupiditate, autem, quibusdam reiciendis consequatur a deleniti est ipsa tenetur quos cumque possimus saepe in odio officiis! Minima, quibusdam.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi exercitationem fuga cupiditate, autem, quibusdam reiciendis consequatur a deleniti est ipsa tenetur quos cumque possimus saepe in odio officiis! Minima, quibusdam.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi exercitationem fuga cupiditate, autem, quibusdam reiciendis consequatur a deleniti est ipsa tenetur quos cumque possimus saepe in odio officiis! Minima, quibusdam.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi exercitationem fuga cupiditate, autem, quibusdam reiciendis consequatur a deleniti est ipsa tenetur quos cumque possimus saepe in odio officiis! Minima, quibusdam.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi exercitationem fuga cupiditate, autem, quibusdam reiciendis consequatur a deleniti est ipsa tenetur quos cumque possimus saepe in odio officiis! Minima, quibusdam.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi exercitationem fuga cupiditate, autem, quibusdam reiciendis consequatur a deleniti est ipsa tenetur quos cumque possimus saepe in odio officiis! Minima, quibusdam.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi exercitationem fuga cupiditate, autem, quibusdam reiciendis consequatur a deleniti est ipsa tenetur quos cumque possimus saepe in odio officiis! Minima, quibusdam.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi exercitationem fuga cupiditate, autem, quibusdam reiciendis consequatur a deleniti est ipsa tenetur quos cumque possimus saepe in odio officiis! Minima, quibusdam.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi exercitationem fuga cupiditate, autem, quibusdam reiciendis consequatur a deleniti est ipsa tenetur quos cumque possimus saepe in odio officiis! Minima, quibusdam.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi exercitationem fuga cupiditate, autem, quibusdam reiciendis consequatur a deleniti est ipsa tenetur quos cumque possimus saepe in odio officiis! Minima, quibusdam.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi exercitationem fuga cupiditate, autem, quibusdam reiciendis consequatur a deleniti est ipsa tenetur quos cumque possimus saepe in odio officiis! Minima, quibusdam.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi exercitationem fuga cupiditate, autem, quibusdam reiciendis consequatur a deleniti est ipsa tenetur quos cumque possimus saepe in odio officiis! Minima, quibusdam.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi exercitationem fuga cupiditate, autem, quibusdam reiciendis consequatur a deleniti est ipsa tenetur quos cumque possimus saepe in odio officiis! Minima, quibusdam.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi exercitationem fuga cupiditate, autem, quibusdam reiciendis consequatur a deleniti est ipsa tenetur quos cumque possimus saepe in odio officiis! Minima, quibusdam.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi exercitationem fuga cupiditate, autem, quibusdam reiciendis consequatur a deleniti est ipsa tenetur quos cumque possimus saepe in odio officiis! Minima, quibusdam.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi exercitationem fuga cupiditate, autem, quibusdam reiciendis consequatur a deleniti est ipsa tenetur quos cumque possimus saepe in odio officiis! Minima, quibusdam.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi exercitationem fuga cupiditate, autem, quibusdam reiciendis consequatur a deleniti est ipsa tenetur quos cumque possimus saepe in odio officiis! Minima, quibusdam.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi exercitationem fuga cupiditate, autem, quibusdam reiciendis consequatur a deleniti est ipsa tenetur quos cumque possimus saepe in odio officiis! Minima, quibusdam.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi exercitationem fuga cupiditate, autem, quibusdam reiciendis consequatur a deleniti est ipsa tenetur quos cumque possimus saepe in odio officiis! Minima, quibusdam.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi exercitationem fuga cupiditate, autem, quibusdam reiciendis consequatur a deleniti est ipsa tenetur quos cumque possimus saepe in odio officiis! Minima, quibusdam.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi exercitationem fuga cupiditate, autem, quibusdam reiciendis consequatur a deleniti est ipsa tenetur quos cumque possimus saepe in odio officiis! Minima, quibusdam.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi exercitationem fuga cupiditate, autem, quibusdam reiciendis consequatur a deleniti est ipsa tenetur quos cumque possimus saepe in odio officiis! Minima, quibusdam.</p>
            <Footer/>
          </div>
        </div>
      </div>

      {/* <div classNameName="DsContainer w-100 h-100  d-flex ">

        <div classNameName="side-bar h-100 bg-danger col-md-3 d-flex flex-column justify-content-center align-item-center">
          <p>sdfsdfsf</p>
          <p>sdfsdfsf</p>
          <p>sdfsdfsf</p>
          <p>sdfsdfsf</p>
        </div>

        <div classNameName="main col-md-9">
          ffffff
        </div>

      </div> */}


    </>
  )
}
