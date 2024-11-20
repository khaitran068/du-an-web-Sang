import React, { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import './home.css'
import { Link } from 'react-router-dom'
import Homeproduct from './home_product'
// import {getProduct} from './home_product'
import { AiFillEye, AiFillHeart, AiOutlineShoppingCart} from "react-icons/ai";
import {BiLogoFacebook, BiLogoTwitter, BiLogoInstagram, BiLogoYoutube} from "react-icons/bi";

const Home = ({addtocart}) => {

  // Product category
  const [newProduct, setNewProduct] =  useState([])
  const [featuredProduct, setFeaturdProduct] =  useState([])
  const [topProduct, setTopProduct] =  useState([])

  //phan trang
  const itemsPerPage = 16; // Số lượng sản phẩm trên mỗi trang
  const [currentPage, setCurrentPage] = useState(0);
  const [product, setProduct] = useState(Homeproduct)

  const handlePageClick = (event) =>{
    setCurrentPage(event.selected);
  }

  //hien thi cho san pham hien tai
  const offset = currentPage * itemsPerPage;
  const currentProducts = product.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(product.length / itemsPerPage);
  // Filter of tranding product
  const filtercate = (x) => 
    {
      const filterproduct = Homeproduct.filter((curElm) => 
      {
        return curElm.type === x
      })
      setProduct(filterproduct)
      setCurrentPage(0);
    }
     //All Trending Product
  const allTrendingProduct = () =>
    {
      setProduct(Homeproduct);
      setCurrentPage(0);
    }

  //Product Type
  useEffect(() => 
    {
      productcategory()
    })
    const productcategory = () => 
    {
      // New Product
      const newcategory = Homeproduct.filter((x) => 
      {
        return x.type === 'new'
      })
      setNewProduct(newcategory)
  
      // Featured Product
      const featuredcategory = Homeproduct.filter((x) => 
      {
        return x.type === 'featured'
      })
      setFeaturdProduct(featuredcategory)
  
      // Top Product
      const topcategory = Homeproduct.filter((x) => 
      {
        return x.type === 'top'
      })
      setTopProduct(topcategory)
    }

  return (
    <>
        <div className='home'>
            <div className='top_banner'>
                <div className='contant'>
                    <h1>Nâng Tầm Cuộc Sống</h1>
                    <Link to='/shop' className='link'>Shop Now</Link>
                </div>
            </div>
            <div className='trending'>
              <div className='container'>
                <div className='left_box'>
                  <div className='header'>
                    <div className='heading'>
                      <h2 onClick={() => allTrendingProduct ()}>Sản phẩm bán chạy</h2>
                    </div>
                    <div className='cate'>
                      <h3 onClick={() => filtercate ('new')}>Sản phẩm mới</h3>
                      <h3 onClick={() => filtercate ('featured')}>Sản phẩm sắp về</h3>
                      <h3 onClick={() => filtercate ('top')}>Sản phẩm giảm giá</h3>
                    </div>
                  </div>
                  <div className='products'>
                    <div className='container'>
                    {
                      currentProducts.map((curElm) => {
                        return(
                          <>
                            <div className='box'>
                              <div className='img_box'>
                                <img src={curElm.image} alt=''></img>
                                <div className='icon'>
                                  <div className='icon_box'>
                                    <AiFillEye />
                                  </div>
                                  <div className='icon_box'>
                                    <AiFillHeart />
                                  </div>
                                </div>
                              </div>
                              <div className='info'>
                                <h3>{curElm.Name}</h3>
                                <p>VND {curElm.price}</p>
                                <button className='btn' onClick={() => addtocart (curElm)}>Add to cart</button>
                              </div>
                            </div>
                          </>
                        )
                      })
                    }
                    </div>
                    {/* <button>Show More</button> */}
                    <div className='paginate'>
                    <ReactPaginate
                      nextLabel="next >"
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={3}
                      // marginPagesDisplayed={2}
                      pageCount={pageCount}
                      previousLabel="< previous"
                      pageClassName="page-item"
                      pageLinkClassName="page-link"
                      previousClassName="page-item"
                      previousLinkClassName="page-link"
                      nextClassName="page-item"
                      nextLinkClassName="page-link"
                      // breakLabel="..."
                      breakClassName="page-item"
                      breakLinkClassName="page-link"
                      containerClassName="pagination"
                      activeClassName="active"
                      // renderOnZeroPageCount={null}
                    />
                    </div>
                  </div>
                </div>
                <div className='right_box'>
                  <div className='right_container'>
                    <div className='testimonial'>
                      <div className='head'>
                        <h3>Thông tin</h3>
                      </div>
                      <div className='detail'>
                        <div className='img_box'>
                          <img src='image/T1.avif' alt='testmonial'></img>
                        </div>
                        <div className='info'>
                          <h3>Khai Tran</h3>
                          <h4>web designer</h4>
                          <p>Công ty TNHH MTV SX TM & DV CAO ĐẠT HONOR</p>
                        </div>
                      </div>
                    </div>
                    <div className='newsletter'>
                      <div className='head'>
                        <h3>Bảng tin</h3>
                      </div>
                      <div className='form'>
                        <p>Trở thành khách hàng thân thiết</p>
                        <input type='email' placeholder='E-mail' autoComplete='off'></input>
                        <button>subcribe</button>
                        <div className='icon_box'>
                          <div className='icon'>
                            <BiLogoFacebook />
                          </div>
                          <div className='icon'>
                            <BiLogoTwitter />
                          </div>
                          <div className='icon'>
                            <BiLogoInstagram />
                          </div>
                          <div className='icon'>
                            <BiLogoYoutube />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='banners'>
              <div className='container'>
                <div className='left_box'>
                  <div className='box'>
                    <img src='image/banner1.jpg' alt='banner'></img>
                  </div>
                  <div className='box'>
                    <img src='image/Multi-Banner-2.jpg' alt='banner'></img>
                  </div>
                </div>
                <div className='right_box'>
                  <div className='box'>
                    <img src='image/banner.jpg' alt=''></img>
                  </div>
                </div>
              </div>
            </div>
            <div className='product_type'>
              <div className='container'>
                <div className='box'>
                  <div className='header'>
                    <h2>Sản phẩm mới</h2>
                  </div>
                  {
                    newProduct.map((curElm) => 
                  {
                    return(
                      <>
                      <div className='productbox'>
                        <div className='img-box'>
                          <img src={curElm.image} alt=''></img>
                        </div>
                        <div className='detail'>
                          <h3>{curElm.Name}</h3>
                          <p>VND {curElm.price}</p>
                          <div className='icon'>
                            <button><AiFillEye /></button>
                            <button><AiFillHeart /></button>
                            <button onClick={() => addtocart (curElm)}><AiOutlineShoppingCart /></button>
                          </div>
                        </div>
                      </div>
                      </>
                    )
                  })
                }
                </div>
                <div className='box'>
                  <div className='header'>
                    <h2>Sản phẩm sắp ra mắt</h2>
                  </div>
                  {
                    featuredProduct.map((curElm) => 
                    {
                      return(
                      <>
                        <div className='productbox'>
                          <div className='img-box'>
                            <img src={curElm.image} alt=''></img>
                          </div>
                          <div className='detail'>
                            <h3>{curElm.Name}</h3>
                            <p>VND {curElm.price}</p>
                            <div className='icon'>
                              <button><AiFillEye /></button>
                              <button><AiFillHeart /></button>
                              <button onClick={() => addtocart (curElm)}><AiOutlineShoppingCart /></button>
                            </div>
                          </div>
                        </div>
                      </>
                      )
                    })
                  }
                </div>
                <div className='box'>
                  <div className='header'>
                    <h2>Sản phẩm nổi bật</h2>
                  </div>
                  {
                    topProduct.map((curElm) => 
                    {
                      return(
                        <>
                        <div className='productbox'>
                          <div className='img-box'>
                            <img src={curElm.image} alt=''></img>
                          </div>
                          <div className='detail'>
                            <h3>{curElm.Name}</h3>
                            <p>VND {curElm.price}</p>
                            <div className='icon'>
                              <button><AiFillEye /></button>
                              <button><AiFillHeart /></button>
                              <button onClick={() => addtocart (curElm)}><AiOutlineShoppingCart /></button>
                            </div>
                          </div>
                        </div>
                        </>
                      )
                    })
                  }
                </div>
              </div>
            </div>
        </div>
    </>
  )
}

export default Home