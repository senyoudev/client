import React,{useState} from 'react'
import './contact.css'

const Contact = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        //do whatever u need here
        console.log(name,email,message)
    }
    
  return (
    <div className="contact">
        <h3 className="contact__title">Contact Us</h3>
        <form className='contact__form' onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" value={name}
             onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" value={email} 
             onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea className="form-control" rows="5" value={message} 
             onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button type="submit" className="contact__btn" >Submit</button>
        </form>
    </div>
  )
}

export default Contact