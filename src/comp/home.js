import React, { useState, useEffect, useRef } from 'react'
import ReactPaginate from 'react-paginate'
import './home.css'
// import { Link } from 'react-router-dom'
import Homeproduct from './home_product'
import AutoBanner from './banner';
// import {getProduct} from './home_product'
import { AiFillEye, AiFillHeart, AiOutlineShoppingCart, AiOutlineClose} from "react-icons/ai";
import {BiLogoFacebook, BiLogoTwitter, BiLogoInstagram, BiLogoYoutube} from "react-icons/bi";

const Home = ({addtocart}) => {

  // Product category
  const [brandLuxta, setBrandLuxta] =  useState([])
  const [brandInax, setBrandInax] =  useState([])
  const [brandToto, setBrandToto] =  useState([])

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
      productbrand();
    }, []);
    const productbrand = () => 
    {
      // Luxta brand
      const brandluxta = Homeproduct.filter((x) => 
      {
        return x.brand === 'Luxta'
      })
      setBrandLuxta(brandluxta)
  
      // Inax brand
      const brandinax = Homeproduct.filter((x) => 
      {
        return x.brand === 'Inax'
      })
      setBrandInax(brandinax)
  
      // Toto brand
      const brandtoto = Homeproduct.filter((x) => 
      {
        return x.brand === 'Toto'
      })
      setBrandToto(brandtoto)
    }
    // trộn các phần tử trong mảng
    // function shuffleArray(array) {
    //   return array.sort(() => Math.random() - 0.5);
    // }

    // Toggle Product Detail
    const [showDetail, setShowDetail] = useState(false)
    // Detail Page Data
   const [detail, setDetail] = useState([])
   //Showing Detail Box
   const detailpage = (product) => 
   {
       const detaildata = ([{product}])
       const productdetail = detaildata[0]['product']
       // console.log(productdetail)
       setDetail(productdetail)
       setShowDetail(true)
   }
   const closedetail = () => 
       {
           setShowDetail(false)
       }
   // xu ly dong detailProduct khi click chuot ben ngoai
   const detailRef = useRef(null);
   // Xử lý đóng khi click bên ngoài
   const handleClickOutside = (event) => {
       if (detailRef.current && !detailRef.current.contains(event.target)) {
       setShowDetail(false); // Đóng Product Detail nếu click bên ngoài
       }
   };
   // Gắn và hủy sự kiện
   useEffect(() => {
       document.addEventListener("mousedown", handleClickOutside);
           return () => {
       document.removeEventListener("mousedown", handleClickOutside);
       };
   }, []);

  return (
    <>
    {
        showDetail ?
        <>
        <div className='product_detail' ref={detailRef}>
        <button className='close_btn' onClick={closedetail}><AiOutlineClose /></button>
            <div className='container'>
                <div className='img_box'>
                    <img src={detail.image1} alt=''></img>
                </div>
                <div className='info'>
                    {/* <h4># {detail.cat}</h4> */}
                    <h2>{detail.Name}</h2>
                    <div className="description">
                        {detail.description.split('\n').map((line, index) => (
                        <p key={index}>{line}</p>
                        ))}
                    </div>
                    <div className="price">
                        <span className="original-price">
                            {detail.originalPrice.toLocaleString('vi-VN')} VNĐ
                        </span>
                        <span className="discount-price">
                            {detail.discountPrice.toLocaleString('vi-VN')} VNĐ
                        </span>
                    </div>
                    <button onClick={() => addtocart (detail)}>Add To Cart</button>
                </div>
            </div>
        </div>
        </>
        :null
    }
        <div className='home'>
            <div className='banner'>
              <AutoBanner />
                {/* <div className='contant'>
                  <Link to='/cửa-hàng-thiết-bị-vệ-sinh-nội-thất' className='link'>Vào mua hàng</Link>
                </div> */}
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
                                <img onClick={() => detailpage (curElm)} src={curElm.image} alt='' loading='lazy'></img>
                                <div className='icon'>
                                  <div onClick={() => detailpage (curElm)} className='icon_box'>
                                    <AiFillEye />
                                  </div>
                                  <div className='icon_box'>
                                    <AiFillHeart />
                                  </div>
                                </div>
                              </div>
                              <div className='info'>
                                <h3>{curElm.Name}</h3>
                                {/* <p>{curElm.discountPrice} VNĐ</p> */}
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
                    {pageCount > 1 &&(
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
                    />)}
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
                          <img src='image/T1.avif' alt='testmonial' loading='lazy'></img>
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
                        <button>Theo dõi</button>
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
                    <img src='image/banner1.jpg' alt='banner' loading='lazy'></img>
                  </div>
                  <div className='box'>
                    <img src='image/banner2.jpg' alt='banner' loading='lazy'></img>
                  </div>
                </div>
                <div className='right_box'>
                  <div className='box'>
                    <img src='image/banner.jpg' alt='' loading='lazy'></img>
                  </div>
                </div>
              </div>
            </div>
            <div className='product_type'>
              <div className='container'>
                <div className='box'>
                  <div className='header'>
                    <h2>Hãng Luxta</h2>
                  </div>
                  {
                    brandLuxta.slice(0, 4).map((curElm) => 
                  {
                    return(
                      <>
                      <div className='productbox'>
                        <div className='img-box'>
                          <img onClick={() => detailpage (curElm)} src={curElm.image} alt='' loading='lazy'></img>
                        </div>
                        <div className='detail'>
                          <h3>{curElm.Name}</h3>
                          <p>VND {curElm.price}</p>
                          <div className='icon'>
                            <button onClick={() => detailpage (curElm)}><AiFillEye /></button>
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
                    <h2>Hãng Inax </h2>
                  </div>
                  {
                    brandInax.slice(0, 4).map((curElm) => 
                    {
                      return(
                      <>
                        <div className='productbox'>
                          <div className='img-box'>
                            <img onClick={() => detailpage (curElm)} src={curElm.image} alt='' loading='lazy'></img>
                          </div>
                          <div className='detail'>
                            <h3>{curElm.Name}</h3>
                            <p>VND {curElm.price}</p>
                            <div className='icon'>
                              <button onClick={() => detailpage (curElm)}><AiFillEye /></button>
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
                    <h2>Hãng TOTO</h2>
                  </div>
                  {
                    brandToto.slice(0, 4).map((curElm) => 
                    {
                      return(
                        <>
                        <div className='productbox'>
                          <div className='img-box'>
                            <img onClick={() => detailpage (curElm)} src={curElm.image} alt='' loading='lazy'></img>
                          </div>
                          <div className='detail'>
                            <h3>{curElm.Name}</h3>
                            <p>VND {curElm.price}</p>
                            <div className='icon'>
                              <button onClick={() => detailpage (curElm)}><AiFillEye /></button>
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