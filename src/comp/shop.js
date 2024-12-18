import React from 'react'
import './shop.css'
import ReactPaginate from 'react-paginate'
import { AiFillHeart, AiFillEye, AiOutlineClose} from 'react-icons/ai';
import { useState, useEffect, useRef } from 'react'

const Shop = ({shop, FilterCat, allcatefilter, FilterBrand, addtocart}) => {

    //hien subcategory
    const [expandedCategory, setExpandedCategory] = useState(null);
    // Dữ liệu category
  const categories = [
    { name: "phụ kiện", subcategories: ["giá kệ móc", "máy sấy tay",
         "phễu thoát sàn", "phụ kiện bồn cầu", "phụ kiện bồn tiểu", 
        "phụ kiện chậu"] },
    // { name: "Bồn Rửa", subcategories: ["Bồn Rửa Tay", "Bồn Rửa Chén"] },
  ];

  // Xử lý sự kiện click
  const handleCategoryClick = (categoryName) => {
    setExpandedCategory((prev) => (prev === categoryName ? null : categoryName));
  };

  // Xử lý sự kiện click vào subcategory
  const handleSubCategoryClick = (subcat) => {
    FilterCat(removeDiacritics(subcat)); // Gọi hàm lọc
    setExpandedCategory(null); // Đóng tất cả danh sách con
  };

  //chuyễn đổi chữ có dấu sang không dấu
 const removeDiacritics = (str) => {
    return str
      .normalize("NFD") // Chuẩn hóa chuỗi Unicode
      .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
      .replace(/đ/g, "d") // Chuyển đổi "đ" thành "d"
      .replace(/Đ/g, "D"); // Chuyển đổi "Đ" thành "D"
  };

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

    // State để theo dõi hình ảnh hiện tại
    const [currentImage, setCurrentImage] = useState(0);

    // Danh sách hình ảnh
    const images = [detail.image, detail.image1];

    // Chuyển sang hình ảnh tiếp theo
    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % images.length);
    };

    // Quay lại hình ảnh trước đó
    const prevImage = () => {
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    };
  return (
    <>
    {
        showDetail ?
        <>
        <div className='product_detail' ref={detailRef}>
        <button className='close_btn' onClick={closedetail}><AiOutlineClose /></button>
            <div className='container'>
                <div className='img_box'>
                    {/* Hiển thị hình ảnh hiện tại */}
                    <img src={images[currentImage]} alt={detail.Name} className='main_image' loading='lazy' />

                    {/* Nút điều hướng hình ảnh */}
                    <button className='prev_btn' onClick={prevImage}>
                    ❮
                    </button>
                    <button className='next_btn' onClick={nextImage}>
                    ❯
                    </button>
                </div>
                <div className='info'>
                    {/* <h4># {detail.cat}</h4> */}
                    <h2>{detail.Name}</h2>
                    <div className='description'>
                        {detail.description.split('\n').map((line, index) => (
                        <p key={index}>{line}</p>
                        ))}
                    </div>
                    <div className='price'>
                        <span className='original-price'>
                            {detail.originalPrice.toLocaleString('vi-VN')} VNĐ
                        </span>
                        <span className="discount-price">
                            {detail.discountPrice.toLocaleString('vi-VN')} VNĐ
                        </span>
                    </div>
                    <button onClick={() => addtocart (detail)}>Mua hàng</button>
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
                            <li onClick={() => FilterCat ("chau lavabo")}># Chậu Lavabo</li>
                            <li onClick={() => FilterCat ("voi xit")}># Vòi Xịt</li>
                            <li onClick={() => FilterCat ("xa tieu nam")}># Xã Tiểu Nam</li>
                            <li onClick={() => FilterCat ("bon tieu nam")}># Bồn Tiểu Nam</li>
                            <li onClick={() => FilterCat ("bon nuoc")}># Bồn Nước</li>
                            <li onClick={() => FilterCat ("may nuoc nong")}># Máy Nước Nóng</li>
                            <li onClick={() => FilterCat ("bon cau")}># Bồn Cầu</li>
                            <ul>
                                {categories.map((category) => (
                                    <li key={category.name}>
                                    <span onClick={() => handleCategoryClick(category.name)}>
                                        # {category.name}
                                    </span>
                                    {expandedCategory === category.name && (
                                        <ul>
                                        {category.subcategories.map((subcat) => (
                                            <li
                                                key={subcat}
                                                onClick={() => handleSubCategoryClick(subcat)}
                                            >
                                                . {subcat}
                                            </li>
                                            ))}
                                        </ul>
                                    )}
                                    </li>
                                ))}
                            </ul>
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
                            <li onClick={() => FilterBrand ("Ariston")}># Hãng Ariston</li>
                            <li onClick={() => FilterBrand ("Hwata")}># Hãng HWATA</li>
                            <li onClick={() => FilterBrand ("DaiThanh")}># Hãng Đại Thành</li>
                            <li onClick={() => FilterBrand ("Wapi")}># Hãng WAPI</li>
                            <li onClick={() => FilterBrand ("ToanMy")}># Hãng Toàn Mỹ</li>
                            <li onClick={() => FilterBrand ("Inax")}># Hãng Inax</li>
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
                                            <button onClick={() => addtocart (curElm)}>Mua hàng</button>
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