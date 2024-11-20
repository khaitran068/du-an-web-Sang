import React from 'react'
import './footer.css'
import { FaPiggyBank, FaShippingFast, FaHeadphonesAlt, FaWallet} from 'react-icons/fa';

const Footer = () => {
  return (
    <>
    <div className='footer'>
        <div className='container'>
            <div className='left-box'>
                <div className='box'>
                    <div className='icon_box'>
                        <FaPiggyBank />
                    </div>
                    <div className='detail'>
                        <h3>TIẾT KIỆM</h3>
                        <p>Hân hạnh phục vụ quý khách</p>
                        <p></p>
                    </div>
                </div>
                <div className='box'>
                    <div className='icon_box'>
                        <FaShippingFast />
                    </div>
                    <div className='detail'>
                        <h3>MIỄN PHÍ GIAO HÀNG</h3>
                        <p>Hân hạnh phục vụ quý khách</p>
                        <p></p>
                    </div>
                </div>
                <div className='box'>
                    <div className='icon_box'>
                        <FaHeadphonesAlt />
                    </div>
                    <div className='detail'>
                        <h3>HỖ TRỢ 24/7</h3>
                        <p>Hân hạnh phục vụ quý khách</p>
                        <p></p>
                    </div>
                </div>
                <div className='box'>
                    <div className='icon_box'>
                        <FaWallet />
                    </div>
                    <div className='detail'>
                        <h3>HOÀN TIỀN</h3>
                        <p>Hân hạnh phục vụ quý khách</p>
                        <p></p>
                    </div>
                </div>
            </div>
            <div className='right_box'>
                <div className='header'>
                    <img src='./logo.jpg' alt=''></img>
                    <p>Công ty TNHH MTV SX TM & DV Cao Đạt HONOR rất hân hạnh được phục vụ quý khách!</p>
                </div>
                <div className='bottom'>
                    <div className='box'>
                        <h3>Thông tin tài khoản</h3>
                        <ul>
                            <li>About us</li>
                            <li>Account</li>
                            <li>Payment</li>
                            <li>Sales</li>
                        </ul>
                    </div>
                    <div className='box'>
                        <h3>Sản Phẩm</h3>
                        <ul>
                            <li>Giao Hàng</li>
                            <li>Theo dõi đơn hàng</li>
                            <li>Sản phẩm mới</li>
                            <li>Sản phẩm cũ</li>
                        </ul>
                    </div>
                    <div className='box'>
                        <h3>Liên hệ chúng tôi</h3>
                        <ul>
                            <li>108, đường Trần Hoàng Na (KDC Hồng Loan), Phường Hưng Thạnh, Quận Cái Răng, TP.Cần Thơ, VN</li>
                            <li>+(84)943 696 994(Mr.Sang)</li>
                            <li>caodathonor@gmail.com</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
    
  )
}

export default Footer