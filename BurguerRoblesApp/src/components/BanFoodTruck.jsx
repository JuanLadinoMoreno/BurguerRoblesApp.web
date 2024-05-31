import React from 'react'

function BanFoodTruck() {
    return (
        <>

            <div className="sectAbo" id="sectAbo">
                <div className="row  sectAbo__conte">

                    <div className="sectAbo__images col-lg-6 p-0">
                        <img src="../../public/img/about/foodTruck.png" alt="" />
                    </div>


                    <div className="sectAbo__datos row col-lg-6 z-0">

                        <div className="sectAbo__datosLogo  d-flex justify-content-center align-items-center flex-column">
                            <h3>Burguer Robles</h3>
                            <h2>Food truck</h2>
                        </div>

                        <p className="p-5">Empresa familiar con mas de 31 años en el mercado de la comida, especificamente en las hamburguesas creadas 100% con carne de res, especies y productos frescos.
                        </p>

                    </div>
                </div>
            </div>

        </>
    )
}

export default BanFoodTruck