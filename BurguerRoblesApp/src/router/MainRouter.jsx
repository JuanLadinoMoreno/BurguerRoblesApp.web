import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import NavBar from '../components/NavBar'
import Menu from '../pages/Menu'
import Footer from '../components/Footer.jsx'
import { Category } from '../pages/Category.jsx'
import DetailProduct from '../pages/DetailProduct.jsx'
import { Cart } from '../pages/Cart.jsx'
import { About } from '../pages/About.jsx'
import { Grill } from '../pages/Grill.jsx'
import AddProducts from '../components/Pages/Menu/AddProducts.jsx'



export default function MainRouter() {
  return (
    // BrowserRouter trabaja con children, su hijo es Routes
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/menu/category/:id' element={<Category />} />
        <Route path='/menu/item/:id' element={<DetailProduct />} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/grill' element={<Grill/>} />
        <Route path='/menu/addproduct' element={<AddProducts />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}
