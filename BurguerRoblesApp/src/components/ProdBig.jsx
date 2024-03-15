import React from 'react'

export default function ProdBig() {
  return (
    <section className="sectProdBig overflow-x-hidden">


                <div className="row">

                    <div className="sectProdBig__contDat p-5 col-lg-5  col-md-6 col-sm-12">
                        <img className="" src="../assets/img/icons/real.svg" alt="" />
                        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. <span>Quaerat deleniti sunt autem veritatis
                            vel iusto ratione mollitia </span> neque unde cupiditate!
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas, officia!
                        </p>
                    </div>

                    <div
                        className="sectProdBig__contImg col-lg-7 col-md-6 col-sm-12 d-flex justify-content-center align-items-center">
                        <span className="spanMov"></span>
                        <span className="spanMov"></span>
                        <span className="spanMov"></span>
                        <span className="spanMov"></span>
                        <span className="spanMov"></span>
                        <img className="" src="../../public/img/bgTripl.png" style={{ maxWidth: "70%" }} alt="" />
                    </div>


                </div>


            </section>
  )
}
