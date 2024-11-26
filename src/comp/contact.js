import React, {useState} from 'react'
import './contact.css'
const Contact = () => {
    const[user, setUser] = useState(
        {
            Name:'', email:'', phone:'', subject: '', Message: ''
        }
    )

    let values, names
    const data = (e) => 
    {
        values = e.target.value
        names = e.target.name
        setUser({...user, [names]: values})
    }
    const send = async (e) => 
        {
            const {Name, email, phone, subject, Message} = user
            e.preventDefault()
            const option = {
                method: 'POST',
                headers: {
                    'Content-Type': 'aplication/json'
                },
                body: JSON.stringify({
                    Name, email, phone, subject, Message
                })
            }
    
            const send = await fetch(
                'https://du-an-cua-sang-default-rtdb.asia-southeast1.firebasedatabase.app/Message.json', option
                )
    
            if (send) {
                alert("Message Sent")
            }
            else
            {
                alert("Error Occoured Message Sent failed")
            }
    
        }

  return (
    <>
    <div className='contact'>
        <div className='container'>
            <div className='form'>
                <h2># Thông tin của quý khách</h2>
                <form method='POST'>
                    <div className='box'>
                        <div className='lable'>
                            <h4>Tên</h4>
                        </div>
                        <div className='input'>
                            <input type='text' placeholder='Tên' value= {user.Name} name='Name' onChange={data}></input>
                        </div>
                    </div>
                    <div className='box'>
                        <div className='lable'>
                            <h4>Email</h4>
                        </div>
                        <div className='input'>
                            <input type='text' placeholder='Email' value={user.email} name='email' onChange={data}></input>
                        </div>
                    </div>
                    <div className='box'>
                        <div className='lable'>
                            <h4>Điện thoại</h4>
                        </div>
                        <div className='input'>
                            <input type='text' placeholder='Phone' value={user.phone} name='phone' onChange={data}></input>
                        </div>
                    </div>
                    <div className='box'>
                        <div className='lable'>
                            <h4>Tiêu đề</h4>
                        </div>
                        <div className='input'>
                            <input type='text' placeholder='Tiêu đề' value= {user.subject} name='subject' onChange={data}></input>
                        </div>
                    </div>
                    <div className='box'>
                        <div className='lable'>
                            <h4>Nội dung</h4>
                        </div>
                        <div className='input'>
                            <textarea placeholder='Nội dung !' value= {user.Message} name='Message' onChange={data}></textarea>
                        </div>
                    </div>
                    <button type='submit' onClick={send}>Gửi</button>
                </form>
            </div>
        </div>
    </div>
    </>
 )      
}

export default Contact