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
// import Login from '../components/Pages/Login/Login.jsx'
import Register from '../components/Pages/Login/Register.jsx'
import Index from '../components/Dash/Index.jsx'
import Login from '../components/Pages/Login/Login.jsx'

import ProtectedRoute from '../components/ProtectedRoute.jsx'
// import login from '../components/Pages/Login/login.jsx'



export default function MainRouter() {
  return (
    // BrowserRouter trabaja con children, su hijo es Routes
    <BrowserRouter>
      {/* <NavBar /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/about' element={<About />} />
        <Route path='/grill' element={<Grill />} />


        {/* register y login */}
        <Route path='/session/login' element={<Login />} />
        <Route path='/session/register' element={<Register />} />

        {/* index dashboard */}
        <Route path='/dash/index' element={<Index />} />

        <Route element={<ProtectedRoute />}>
          

          
          <Route path='/menu' element={<Menu />} />
          <Route path='/menu/category/:id' element={<Category />} />
          <Route path='/menu/item/:id' element={<DetailProduct />} />
          
        </Route>
        <Route path='/menu/addproduct' element={<AddProducts />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
