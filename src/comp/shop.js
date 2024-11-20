import React from 'react'
import './shop.css'
import ReactPaginate from 'react-paginate'
import { AiFillHeart, AiFillEye, AiOutlineClose} from 'react-icons/ai';
import { useState, useEffect, useRef } from 'react'

const Shop = ({shop, Filter, allcatefilter, addtocart}) => {
    //Phân Trang
    const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
    const itemsPerPage = 20; // Số sản phẩm mỗi trang

     // Reset currentPage về 0 khi shop thay đổi
    useEffect(() => {
        setCurrentPage(0);
    }, [shop]);

    // Tính toán các sản phẩm sẽ hiển thị
    const offset = currentPage * itemsPerPage; // Vị trí bắt đầu
    const currentData = shop.slice(offset, offset + itemsPerPage); // Sản phẩm trên trang hiện tại

    const pageCount = Math.ceil(shop.length / itemsPerPage); // Tổng số trang

    // Xử lý khi chuyển trang
    const handlePageClick = (event) => {
        setCurrentPage(event.selected); // Cập nhật trang hiện tại
    };

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
                    <img src={detail.image} alt=''></img>
                </div>
                <div className='info'>
                    {/* <h4># {detail.cat}</h4> */}
                    <h2>{detail.Name}</h2>
                    <p>A Searchcreen Everyone Will Love: Whether your family is streaming or video chatting with friends tablet A8...</p>
                    <h3>VND{detail.price}</h3>
                    <button onClick={() => addtocart (detail)}>Add To Cart</button>
                </div>
            </div>
        </div>
        </>
        :null
    }
    
    <div className='shop'>
        <h2># Shop</h2>
        <p>Home . shop</p>
        <div className='container'>
            <div className='left_box'>
                <div className='category'>
                    <div className='header'>
                        <h3>mặt hàng</h3>
                    </div>
                    <div className='box'>
                        <ul>
                            <li onClick={() => allcatefilter ()}># All</li>
                            <li onClick={() => Filter ("voi sen")}># Vòi Sen</li>
                            <li onClick={() => Filter ("Guong den LED")}># Gương đèn LED</li>
                            <li onClick={() => Filter ("LAVABO")}># Lavabo</li>
                            <li onClick={() => Filter ("bon cau")}># Bồn Cầu</li>
                            <li onClick={() => Filter ("chau chen")}># Chậu Chén</li>
                            <li onClick={() => Filter ("chau chen")}># Bồn rửa chén</li>
                        </ul>
                    </div>
                </div>
                <div className='banner'>
                    <div className='img_box'>
                        <img src='image/shop_left.jpg' alt=''></img>
                    </div>
                </div>
            </div>
            <div className='right_box'>
                <div className='banner'>
                    <div className='img_box'>
                        <img src='image/shop_right_top.jpg' alt=''></img>
                    </div>
                </div>
                <div className='product_box'>
                    <h2>Cửa hàng sản phẩm</h2>
                    <div className='product_container'>
                        {
                            currentData.length > 0?(
                            currentData.map((curElm) =>{
                                return(
                                    <>
                                    <div className='box'>
                                        <div className='img_box'>
                                            <img src={curElm.image} alt=''></img>
                                            <div className='icon'>
                                                <li><AiFillHeart /></li>
                                                <li onClick={() => detailpage (curElm)}><AiFillEye /></li>
                                            </div>
                                        </div>
                                        <div className='detail'>
                                            <h3>{curElm.Name}</h3>
                                            <p>VND {curElm.price}</p>
                                            <button onClick={() => addtocart (curElm)}>Add To Cart</button>
                                        </div>
                                    </div>
                                    </>
                                )
                            })
                        ) : (<p>Không tìm thấy sản phẩm. Vui lòng nhập chính xác tên hoặc mặt hàng Bạn cần tìm!</p>)
                        }
                    </div>
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
        </div>
    </div>
    </>
  )
}

export default Shop