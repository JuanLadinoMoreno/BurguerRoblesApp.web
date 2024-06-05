import { Head } from "../components/Head"
import MenuTabs from "../components/MenuTabs"
import NavBar from "../components/NavBar"
import BanEventos from "../components/Pages/Home/BanEventos"
import ProdBig from "../components/ProdBig"


function MenuHome() {
    return (
        <>
            <Head title={'Menu'}/>
            <NavBar/>
            <MenuTabs />
            <ProdBig />
            <BanEventos/>

        </>
    )
}

export default MenuHome