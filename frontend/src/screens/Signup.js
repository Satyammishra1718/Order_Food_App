import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import CustomNavbar from '../components/Navbar';

function Signup() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: ""});
  const [error, setError] = useState("");
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password
      })
    });

    const json = await response.json();

    if (!json.success) {
      if (json.errors && json.errors.length > 0) {
        setError(json.errors[0].msg);
      } else if (json.error) {
        setError(json.error);
      } else {
        setError("Please Enter Valid Credentials");
      }
    } else {
      setError(""); 
      navigate("/login");
    }
  }
  

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }

  return (
    <div className='img_signup' style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover',height: '100vh' }}>
      <div>
      <CustomNavbar />
      </div>

        <div className='container ' >
          <form className='w-50 m-auto mt-5 border bg-dark border-success rounded mobile_form_signup_log' onSubmit={handleSubmit}>
            <div className="m-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" placeholder='Enter your name' className="form-control" name='name' value={credentials.name} onChange={onChange} aria-describedby="emailHelp" />
            </div>
            <div className="m-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" placeholder='Enter your Email-ID' className="form-control" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
            </div>
            <div className="m-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" placeholder='Enter your Password' className="form-control" value={credentials.password} onChange={onChange} name='password' />
            </div>
            <button type="submit" className="m-3 btn btn-success">Submit</button>
            <Link to="/login" className="m-3 mx-1 btn btn-danger">Already a user</Link>
          </form>
          {error && <div className="w-50 m-auto mt-3 mobile_error laptop_error">{error}</div>}
        </div>
      </div>
  )
}

export default Signup;
