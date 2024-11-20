import React, {useState} from 'react'
import Nav from './comp/nav'
import {BrowserRouter} from 'react-router-dom'
import Rout from './comp/rout'
import Footer from'./comp/footer'
import Homeproduct from './comp/home_product'

const App = () => {
  // Add To cart
  const [cart, setCart] = useState([])
  //Shop Page product
  const [shop, setShop] = useState(Homeproduct)
  //Shop Search Filter
  const [search, setSearch] = useState('')
  //Shop category filter
  const Filter = (x) =>{
    const catefilter = Homeproduct.filter((product) =>
    {
      return product.cat === x;
    })
    setShop(catefilter)
  }

  const allcatefilter = () =>{
    setShop(Homeproduct)
  }
   //Shop Search Filter

   const searchlength = (search || []).length === 0
   const searchProduct = () =>{
   if(searchlength)
   {
     alert("Please Search Something !")
     setShop(Homeproduct)
   }
   else
   {

    const normalizedSearch = removeDiacritics(search.toLowerCase());

    const searchfilter = Homeproduct.filter((x) => {
      const normalizedCat = removeDiacritics(x.cat.toLowerCase());
      const normalizedName = removeDiacritics(x.Name.toLowerCase());
      
      // Tìm kiếm trong cả `cat` và `name`
      return (
        normalizedCat.includes(normalizedSearch) ||
        normalizedName.includes(normalizedSearch)
      );
    });
       setShop(searchfilter)
   }
 }
 //chuyễn đổi chữ có dấu sang không dấu
 const removeDiacritics = (str) => {
  return str
    .normalize("NFD") // Chuẩn hóa chuỗi Unicode
    .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
    .replace(/đ/g, "d") // Chuyển đổi "đ" thành "d"
    .replace(/Đ/g, "D"); // Chuyển đổi "Đ" thành "D"
};

//Add To cart
const addtocart = (product) =>
  {
    const exist = cart.find((x) => {
      return x.id === product.id
    })
    if(exist)
    {
      alert("This product is alleardy added in cart")
    }
    else
    {
      setCart([...cart, {...product, qty:1}])
      alert("Added To cart")
    }
  }
   console.log(cart)
  return (
    <>
    <BrowserRouter>
    <Nav search={search} setSearch={setSearch} searchProduct={searchProduct} />
    <Rout cart={cart} setCart={setCart} shop={shop} Filter = {Filter} allcatefilter={allcatefilter} addtocart={addtocart}></Rout>
    <Footer />
    </BrowserRouter>
    </>

  )
}

export default App
