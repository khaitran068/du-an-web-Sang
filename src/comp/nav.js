import React from 'react'
import './nav.css';
import { useAuth0 } from "@auth0/auth0-react";
import {Link} from 'react-router-dom';
import { MdOutlineLocalShipping } from "react-icons/md";
import { AiOutlineSearch } from 'react-icons/ai';
import { FiLogIn } from 'react-icons/fi';
import { CiLogout,CiUser} from 'react-icons/ci';

const Nav = ({search, setSearch, searchProduct}) => {
  //phím enter thay click tìm kiếm
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchProduct(); // Gọi hàm tìm kiếm khi nhấn Enter
    }
  };
    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  return (
    <>
    <div className='header'>
        <div className='top_header'>
            <div className='icon'>
                <MdOutlineLocalShipping />
            </div>
            <div className='info'>
                <p> Miễn phí giao hàng khi mua từ 3.000.000 VNĐ</p>
            </div>
        </div>
        <div className='mid_header'>
            <div className='logo'>
                <img src='logo.jpg' alt='logo'></img>
            </div>
            <div className='search_box'>
                <input type='text' value={search} placeholder='Tìm kiếm' onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyPress}></input>
                <button onClick={searchProduct}><AiOutlineSearch /></button>
            </div>
            {
                isAuthenticated?
                 // if user is login then Logout Button will shown and also user profile 
                 <div className='user'>
                     <div className='icon'>
                         <CiLogout />
                     </div>
                     <div className='btn'>
                         <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                             Đăng xuất</button>
                     </div>
                 </div>
                :
                // if user is not Login then login button will shown
                <div className='user'>
                    <div className='icon'>
                        <FiLogIn />
                    </div>
                    <div className='btn'>
                    <button onClick={() => loginWithRedirect()}>Đăng nhập</button>
                    </div>
                </div>
            }
        </div>
        <div className='last_header'>
          <div className='user_profile'>
            {
              // User Profile Will Shown Here
              isAuthenticated ?
              <>
              <div className='icon'>
                <CiUser />
              </div>
              <div className='info'>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
              </div>
              </>
              :
              <>
              <div className='icon'>
                <CiUser />
              </div>
              <div className='info'>
                <p>Vui lòng đăng nhập</p>
              </div>
              </>
            }
          </div>
          <div className='nav'>
            <ul>
            <li><Link to='/' className='link'>Trang chủ</Link></li>
              <li><Link to='/cửa-hàng-thiết-bị-vệ-sinh-nội-thất' className='link'>Cửa hàng</Link></li>
              <li><Link to='/chi-tiết-đơn-hàng' className='link'>Chi tiết đơn hàng</Link></li>
              <li><Link to='/công-ty-thiết-bị-vệ-sinh-nội-thất' className='link'>Thông tin công ty</Link></li>
              <li><Link to='/liên-hệ-công-ty-thiết-bị-vệ-sinh-nội-thất' className='link'>Liên hệ tư vấn</Link></li>
            </ul>
          </div>
          <div className='offer'>
            <p>Giảm 10% tấc cả sản phẩm</p>
          </div>
        </div>
    </div>
    </>
  )
}

export default Nav