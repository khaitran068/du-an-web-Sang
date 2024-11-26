import React from 'react';
import { AiFillPhone } from 'react-icons/ai';
import './phone.css'; // CSS cho nút điện thoại

const PhoneButton = () => {
  return (
    <a href='tel:0946696994' className='phone_button'>
      <div className='icon'>
        <AiFillPhone /> 
      </div>
      <div className='phone_number'>0943-696-994</div>
    </a>
  );
};

export default PhoneButton;
