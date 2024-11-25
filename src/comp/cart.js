import React from 'react'
import './cart.css'
import { Link } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai';

const Cart = ({cart, setCart}) => {
  // Increase Quantity of cart product
  const incqty = (product) => 
    {
      const exist = cart.find((x) => 
      {
        return x.id === product.id
      })
      setCart(cart.map((curElm) => 
      {
        return curElm.id === product.id ? { ...exist, qty: exist.qty + 1} : curElm
      }))
    }
    // decrese Quantity of cart product
  const decqty = (product) => 
    {
      const exist = cart.find((x) => 
      {
        return x.id === product.id
      })
      setCart(cart.map((curElm) => 
      {
        return curElm.id === product.id ? {...exist ,qty: exist.qty - 1}: curElm
      }))
    }
    //Removing cart product
  const removeproduct = (product) => 
    {
      const exist = cart.find((x) => 
      {
        return x.id === product.id
      })
      if(exist.qty > 0)
      {
        setCart(cart.filter((curElm) => 
        {
          return curElm.id !== product.id
        }))
      }
    }
    //Total Price
  const total = cart.reduce((discountPrice, item) => discountPrice + item.qty * item.discountPrice, 0)
  return (
    <>
    <div className='cart'>
      <h3># Thông tin đơn hàng</h3>
      {
        cart.length === 0 &&
        <>
        <div className='empty_cart'>
          <h2>Hiện tại Bạn chưa có đơn hàng nào</h2>
          <Link to= '/cửa-hàng-thiết-bị-vệ-sinh-nội-thất'><button>Vào mua hàng</button></Link>
        </div>
        </>
      }
      <div className='container'>
        {
          cart.map((curElm) =>
          {
            return (
              <>
              <div className='box'>
                <div className='img_box'>
                  <img src={curElm.image} alt=''></img>
                </div>
                <div className='detail'>
                  <div className='info'>
                     {/* <h4>{curElm.cat}</h4> */}
                    <h3>{curElm.Name}</h3>
                    <p>Price: {curElm.discountPrice} VNĐ</p>
                    <p>Total: {curElm.discountPrice * curElm.qty} VNĐ</p>
                  </div>
                  <div className='quantity'>
                    <button onClick={() => incqty (curElm)}>+</button>
                    <input type='number' value={curElm.qty}></input>
                    <button onClick={() => decqty (curElm)}>-</button>
                  </div>
                  <div className='icon'>
                      <li onClick={() => removeproduct(curElm)}><AiOutlineClose /></li>
                  </div>
                </div>
              </div>
              </>
            )
          })
        }
      </div>
      <div className='bottom'>
          {
            cart.length > 0 && 
            <>
            <div className='Total'>
              <h4>Sub Total: {total} VNĐ</h4>
            </div>
            <button>Thanh toán</button>
            </>
          }
        </div>
    </div>
    </>
  )
}

export default Cart