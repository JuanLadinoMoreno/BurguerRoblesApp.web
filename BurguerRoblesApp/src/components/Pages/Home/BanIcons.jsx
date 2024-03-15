import React from 'react'

export default function BanIcons() {
  return (
    <section className="sect-icons">
        <div className="cont-icons">
            <div className="card-icon wow fadeInLeft slow">
                <img className="icon-card" src="../../public/img/icons/aniversarios.png" alt="" loading="lazy"/>
                <p>Mas 31 años de experiencia nos resplanda en la cocina, y los años que nos falta! </p>
            </div>

            <div className="card-icon">/
                <img className="icon-card" src="../../public/img/icons/lechugas.png" alt="" loading="lazy"/>
                <p>Siempre creados con los productos mas frescos directamente del campo </p>
            </div>

            <div className="card-icon">
                <img className="icon-card" src="../../public/img/icons/chile.png" alt="" loading="lazy"/>
                <p>Ven y prueba nuestas salsas a base de chile habanero 100% caseras </p>
            </div>
        </div>
    </section>
  )
}
