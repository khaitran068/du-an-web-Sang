import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import "./banner.css"; // Tùy chỉnh CSS ở đây

const banners = [
  { id: 1, image: 'image/banner3.jpg', alt: 'Banner 1', link: '/cửa-hàng-thiết-bị-vệ-sinh-nội-thất' },
  { id: 2, image: 'image/banner4.jpg', alt: 'Banner 2', link: '/cửa-hàng-thiết-bị-vệ-sinh-nội-thất' },
  { id: 3, image: 'image/banner5.jpg', alt: 'Banner 3', link: '/cửa-hàng-thiết-bị-vệ-sinh-nội-thất' },
  { id: 3, image: 'image/banner6.jpg', alt: 'Banner 4', link: '/cửa-hàng-thiết-bị-vệ-sinh-nội-thất' },
];

const AutoBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length); // Chuyển sang ảnh tiếp theo
    }, 4000); // 3 giây đổi 1 banner
    return () => clearInterval(interval); // Dọn dẹp interval khi component bị unmount
  }, []);

  return (
    <div className="banner-container">
      <img
        src={banners[currentIndex].image}
        alt={banners[currentIndex].alt}
        className="banner-image"
      />
      <div className="banner-content">
        {/* <h1>{banners[currentIndex].title}</h1> */}
        <Link to={banners[currentIndex].link} className="link">
          Vào mua hàng
        </Link>
      </div>
      <div className="dots">
        {banners.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default AutoBanner;
