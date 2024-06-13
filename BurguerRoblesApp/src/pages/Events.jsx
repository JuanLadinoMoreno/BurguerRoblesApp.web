import { useState } from 'react'
import { Head } from '../components/Head'
import BanEventos from '../components/Pages/Home/BanEventos'
import NavBar from '../components/NavBar'
import { PopupImage } from '../components/PopupImage'



import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'


function Events() {

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const handleClosePopup = () => {
        setSelectedImage(null);
    };


    return (
        <>
            <Head title={'Eventos'} />

            {/* <header class="headerPagasa">
                <div class="header-content">
                    <h1>Eventos</h1>

                </div>
            </header> */}

            <NavBar />

            <section class="sect-gallery">
                <div class="grid-container">
                    <div class="item c-span2">
                        <img src="../public/img/events/bg-event.jpg"
                            alt=""
                            loading='lazy'
                            onClick={(e) => handleImageClick(e.target.src)}
                        />
                    </div>

                    <div class="item ">
                        <img src="../public/img/events/P1244319.jpg"
                            alt=""
                            loading='lazy'
                            onClick={(e) => handleImageClick(e.target.src)}
                        />
                    </div>

                    <div class="item r-span2">
                        <img src="../public/img/events/P1233991b.jpg"
                            alt=""
                            loading='lazy'
                            onClick={(e) => handleImageClick(e.target.src)}
                        />
                    </div>

                    <div class="item ">
                        <img src="../public/img/events/P1244321.jpg"
                            alt=""
                            loading='lazy'
                            onClick={(e) => handleImageClick(e.target.src)}
                        />
                    </div>


                    <div class="item ">
                        <img src="../public/img/events/P1244338.jpg"
                            alt=""
                            loading='lazy'
                            onClick={(e) => handleImageClick(e.target.src)}
                        />
                    </div>

                    <div class="item ">
                        <img src="../public/img/events/P1244348.jpg"
                            alt=""
                            loading='lazy'
                            onClick={(e) => handleImageClick(e.target.src)}
                        />
                    </div>



                    {/* <div class="item ">
                        <img src="../public/img/events/P1244357 (1).jpg" alt="" />
                    </div> */}

                    {/* <div class="item ">
                        <img src="../public/img/events/P1244357 (1).jpg" alt="" />
                    </div> */}

                    {/* <div class="item ">
                        <img src="../public/img/events/P1244359.jpg" alt="" />
                    </div>
                    <div class="item ">
                        <img src="../public/img/events/P1244363 (1).jpg" alt="" />
                    </div> */}
                </div>

                {
                    selectedImage && (
                        <PopupImage imageUrl={selectedImage} onClose={handleClosePopup} />
                    )
                }
            </section>

            <h2 className='title2'>Paquetes</h2>

            <div className="gridContainerCa container mt-5">
                <div className="gridContainerCa__itemCa">
                    {/* <i className=" gridContainerCa__itemCa--quoteR fa-solid fa-quote-right"></i>
                    <i className=" gridContainerCa__itemCa--quoteL fa-solid fa-quote-left"></i> */}
                    <img src="../../public/img/paquetes/burgPap.png" alt="" />
                    <h2> <span>$</span>60</h2> 
                    <p>Hamburguesa sencilla+ papas a la fencesa</p>
                    {/* <h4>Chef</h4> */}
                    <a className="btn-prin d-none" href="#">Redes </a>
                    {/* <div className="gridContainerCa__itemCa__iconsAb ">
                        <a href="https://www.facebook.com/vicente.robles.961" target="_blank"><i className="fab fa-facebook-f"></i></a>
                        <a href="https://www.instagram.com/chentirris/" target="_blank"> <i className="fab fa-instagram"></i></a>
                        <a href="" target="_blank"><i className="fab fa-twitter"></i></a>

                    </div> */}

                </div>

                <div className="gridContainerCa__itemCa">
                    {/* <i className=" gridContainerCa__itemCa--quoteR fa-solid fa-quote-right"></i>
                    <i className=" gridContainerCa__itemCa--quoteL fa-solid fa-quote-left"></i> */}
                    <img src="../../public/img/paquetes/hotPap.png" alt="" />
                    <h2> <span>$</span>60</h2> 
                    <p>Hamburguesa sencilla+ papas a la fencesa</p>
                    {/* <h4>Chef</h4> */}
                    <a className="btn-prin d-none" href="#">Redes </a>
                    {/* <div className="gridContainerCa__itemCa__iconsAb ">
                        <a href="" target="_blank"><i className="fab fa-facebook-f"></i></a>
                        <a href="" target="_blank"> <i className="fab fa-instagram"></i></a>
                        <a href="" target="_blank"><i className="fab fa-twitter"></i></a>
                    </div> */}
                </div>

                <div className="gridContainerCa__itemCa">
                    {/* <i className=" gridContainerCa__itemCa--quoteR fa-solid fa-quote-right"></i>
                    <i className=" gridContainerCa__itemCa--quoteL fa-solid fa-quote-left"></i> */}
                    <img src="../../public/img/paquetes/burgHotPap.png" alt="" />
                    <h2> <span>$</span>60</h2> 
                    <p>Hamburguesa sencilla+ papas a la fencesa</p>
                    {/* <h4>Chef</h4> */}
                    <a className="btn-prin d-none" href="#">Redes </a>
                    {/* <div className="gridContainerCa__itemCa__iconsAb ">
                        <a href="" target="_blank"><i className="fab fa-facebook-f"></i></a>
                        <a href="" target="_blank"> <i className="fab fa-instagram"></i></a>
                        <a href="" target="_blank"><i className="fab fa-twitter"></i></a>
                    </div> */}
                </div>

                <div className="gridContainerCa__itemCa">
                    {/* <i className=" gridContainerCa__itemCa--quoteR fa-solid fa-quote-right"></i>
                    <i className=" gridContainerCa__itemCa--quoteL fa-solid fa-quote-left"></i> */}
                    <img src="../../public/img/paquetes/burgHot.png" alt="" />
                    <h2> <span>$</span>60</h2> 
                    <p>Hamburguesa sencilla+ papas a la fencesa</p>
                    {/* <h4>Chef</h4> */}
                    <a className="btn-prin d-none" href="#">Redes </a>
                    {/* <div className="gridContainerCa__itemCa__iconsAb ">
                        <a href="" target="_blank"><i className="fab fa-facebook-f"></i></a>
                        <a href="" target="_blank"> <i className="fab fa-instagram"></i></a>
                        <a href="" target="_blank"><i className="fab fa-twitter"></i></a>
                    </div> */}
                </div>
            </div>


            <h2 className='title2'>Ubicación</h2>

            <div className="container-fluid">
                <div className="row">

                    <div className="col-lg-8 col-md-8 col-sm-12 mb-4 mb-md-0 " style={{ zIndex: "-1", height: "400px" }}>
                        <MapContainer style={{ height: "400px" }} center={[18.9051, -98.4395]} zoom={16} scrollWheelZoom={false}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[18.9051, -98.4395]}>
                                <Popup>
                                    A pretty CSS3 popup. <br /> Easily customizable.
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>

                    <div className=" col-lg-4 col-md-4 col-sm-12 d-flex justify-content-center align-items-center">
                        <div className="img-cont">
                            <img src="../../public/img/bseller/Maskgroup1.png" alt="" data-aos="fade-down-right" data-aos-easing="linear" data-aos-duration="1500" loading="lazy" />
                            <img src="../../public/img/bseller/Maskgroup2.png" alt="" data-aos="fade-up-right" data-aos-easing="linear" data-aos-duration="1500" loading="lazy" />
                            <img src="../../public/img/bseller/Maskgroup3.png" alt="" data-aos="fade-up-left" data-aos-easing="linear" data-aos-duration="1500" loading="lazy" />
                            <img src="../../public/img/bseller/Maskgroup4.png" alt="" data-aos="fade-down-left" data-aos-easing="linear" data-aos-duration="1500" loading="lazy" />
                        </div>
                    </div>

                </div>
            </div>



        </>
    )
}

export default Events








