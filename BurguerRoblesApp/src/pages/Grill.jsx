import { Head } from "../components/Head"
import NavBar from "../components/NavBar"
import BanEventos from "../components/Pages/Home/BanEventos"


export const Grill = () => {
    return (
        <>
            <header class="headerPaga">
                <div class="header-content">
                    <h1>Asados</h1>

                </div>
            </header>

            <NavBar />
            {/* <Head title={'Al grill'}/> */}

            <section class="scAsados">

                <div class="cntSec1">
                    <div class="cntSec1__cntDatos">
                        <h3> Ya los conocías?</h3>
                        <div class="cntSec1__cntProducts">
                            <h4>Hamburguesas</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur fugit incidunt qui minus,
                                repellat ipsam quod consequuntur ipsum magni facilis! Et neque voluptate alias sint doloremque
                                cum. Dignissimos, qui harum.</p>
                            <h4>Hamburguesas</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur fugit incidunt qui minus,
                                repellat ipsam quod consequuntur ipsum magni facilis! Et neque voluptate alias sint doloremque
                                cum. Dignissimos, qui harum.</p>
                            <h4>Hamburguesas</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur fugit incidunt qui minus,
                                repellat ipsam quod consequuntur ipsum magni facilis! Et neque voluptate alias sint doloremque
                                cum. Dignissimos, qui harum.</p>
                        </div>
                    </div>
                    <div class="cntSec1__cntImages">
                        <img src="../../public/img/grill/P1122570.jpg" alt="" />
                        <img src="../../public/img/grill/P1122615.jpg" alt="" />
                        <img src="../../public/img/grill/P1122506.jpg" alt="" />
                    </div>
                </div>

                <div id="carouselExampleAutoplaying" class="carousel slide col-xl-8 mt-5 cont__carousel"
                    data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="../../public/img/grill/gallery/5.jpg" class="d-block w-100" alt="..." />
                            <div class="carousel-caption d-none d-md-block ">
                                <h4>HAMBURGUESAS</h4>
                                <p>Some representative placeholder content for the first slide.</p>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <img src="../../public/img/grill/gallery/6.jpg" class="d-block w-100" alt="..." />
                            <div class="carousel-caption d-none d-md-block ">
                                <h4>CORTES</h4>
                                <p>Some representative placeholder content for the first slide.</p>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <img src="../../public/img/grill/gallery/7.jpg" class="d-block w-100" alt="..." />
                            <div class="carousel-caption d-none d-md-block ">
                                <h4> ALITAS</h4>
                                <p>Some representative placeholder content for the first slide.</p>
                            </div>
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying"
                        data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying"
                        data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>


            </section>

            <BanEventos/>
        </>
    )
}
