import React from 'react'
import './shop.css'
import ReactPaginate from 'react-paginate'
import { AiFillHeart, AiFillEye, AiOutlineClose} from 'react-icons/ai';
import { useState, useEffect, useRef } from 'react'

const Shop = ({shop, FilterCat, allcatefilter, FilterBrand, addtocart}) => {
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
    
    <div className='shop'>
        <h2># Cửa Hàng</h2>
        <p>Cửa hàng thiết bị vệ sinh nội thất</p>
        <div className='container'>
            <div className='left_box'>
                <div className='category'>
                    <div className='header'>
                        <h3>mặt hàng</h3>
                    </div>
                    <div className='box'>
                        <ul>
                            <li onClick={() => allcatefilter ()}># Tấc Cả Sản Phẩm</li>
                            <li onClick={() => FilterCat ("chau chen")}># Chậu Rửa Chén</li>
                            <li onClick={() => FilterCat ("voi sen dung")}># Vòi Sen Tắm Đứng</li>
                            <li onClick={() => FilterCat ("voi sen tam")}># Vòi Sen Tắm</li>
                            <li onClick={() => FilterCat ("tay sen")}># Tay Sen Tắm</li>
                            <li onClick={() => FilterCat ("voi bep")}># Vòi Bếp</li>
                            <li onClick={() => FilterCat ("voi ho")}># Vòi Hồ</li>
                            <li onClick={() => FilterCat ("voi lavabo")}># Vòi Lavabo</li>
                            <li onClick={() => FilterCat ("voi xit")}># Vòi Xịt</li>
                            <li onClick={() => FilterCat ("xa tieu nam")}># Xã Tiểu Nam</li>
                        </ul>
                    </div>
                </div>
                <div className='banner'>
                    <div className='img_box'>
                        <img src='image/shop_left.jpg' alt='' loading='lazy'></img>
                    </div>
                </div>
                <div className='brand'>
                    <div className='header'>
                        <h3>Hãng sản xuất</h3>
                    </div>
                    <div className='box'>
                        <ul>
                            <li onClick={() => FilterBrand ("Luxta")}># Hãng Luxta</li>
                            <li onClick={() => FilterBrand ("Inax")}># Hãng Inax</li>
                            <li onClick={() => FilterBrand ("TOTO")}># Hãng TOTO</li>
                            <li onClick={() => FilterBrand ("DaiThanh")}># Hãng Đại Thành</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='right_box'>
                <div className='banner'>
                    <div className='img_box'>
                        <img src='image/shop_right_top.jpg' alt='' loading='lazy'></img>
                    </div>
                </div>
                <div className='product_box'>
                    <h2>Cửa hàng thiết bị vệ sinh nội thất</h2>
                    <div className='product_container'>
                        {
                            currentData.length > 0?(
                            currentData.map((curElm) =>{
                                return(
                                    <>
                                    <div className='box'>
                                        <div className='img_box'>
                                            <img onClick={() => detailpage (curElm)} src={curElm.image} alt='' loading='lazy'></img>
                                            <div className='icon'>
                                                <li><AiFillHeart /></li>
                                                <li onClick={() => detailpage (curElm)}><AiFillEye /></li>
                                            </div>
                                        </div>
                                        <div className='detail'>
                                            <h3>{curElm.Name}</h3>
                                            {/* <p>{curElm.price}</p> */}
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