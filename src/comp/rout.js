import React from 'react';
import {Routes, Route} from 'react-router';
import Home from './home';
import Shop from './shop';
import Cart from './cart';
import Contact from './contact';
const Rout = ({shop, FilterCat, allcatefilter, FilterBrand, FilterType, addtocart, cart, setCart}) => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home addtocart={addtocart} />}/>
      <Route path='/chi-tiết-đơn-hàng' element={<Cart cart={cart} setCart={setCart} />} />
      <Route path='cửa-hàng-thiết-bị-vệ-sinh-nội-thất' element={<Shop shop={shop} FilterCat = {FilterCat} allcatefilter={allcatefilter} FilterBrand={FilterBrand} addtocart={addtocart} />}/>
      <Route path='liên-hệ-công-ty-thiết-bị-vệ-sinh-nội-thất' element={<Contact />} />
    </Routes>
    </>
  )
}

export default Rout