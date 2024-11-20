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
                <p> Free Shippong When Shopping upto 3000VND</p>
            </div>
        </div>
        <div className='mid_header'>
            <div className='logo'>
                <img src='logo.jpg' alt='logo'></img>
            </div>
            <div className='search_box'>
                <input type='text' value={search} placeholder='search' onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyPress}></input>
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
                             Logout</button>
                     </div>
                 </div>
                :
                // if user is not Login then login button will shown
                <div className='user'>
                    <div className='icon'>
                        <FiLogIn />
                    </div>
                    <div className='btn'>
                    <button onClick={() => loginWithRedirect()}>Login</button>
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
                <p>Please Login</p>
              </div>
              </>
            }
          </div>
          <div className='nav'>
            <ul>
            <li><Link to='/' className='link'>Trang chủ</Link></li>
              <li><Link to='/shop' className='link'>Cửa hàng</Link></li>
              <li><Link to='/cart' className='link'>Chi tiết đơn hàng</Link></li>
              <li><Link to='/about' className='link'>Thông tin về chúng tôi</Link></li>
              <li><Link to='/contact' className='link'>Liên hệ</Link></li>
            </ul>
          </div>
          <div className='offer'>
            <p>flat 10% over all</p>
          </div>
        </div>
    </div>
    </>
  )
}

export default Nav