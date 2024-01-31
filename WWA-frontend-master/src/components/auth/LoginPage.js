// /comoponent/auth/LoginPage.js
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = ({ setActiveTemplate }) => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/login', { email, password }, { withCredentials: true });

      const { message } = response.data;
      window.alert(message);

      navigate('/');
      window.location.reload();
    }
    catch (error) {
      const { message } = error.response.data;
      window.alert(message);
    }
  };

  const handleSignupClick = () => {
    setActiveTemplate('signup');
  }

  const handleForgotClick = () => {
    setActiveTemplate('forgotPassword');
  }

  return (
    <div className="row m-5">
      <div className='col-lg-1 col-sm-12'></div>


      <div className='col-lg-5 col-sm-12 text-warning my-5 p-5'>
        <h1 className='wednesday-title'>WEDNESDAYS WICKED ADVENTURES</h1>
      </div>


      <div className="col-lg-4 col-sm-12">
        <div className="card bg-black text-warning" >
          <div className="card-body">
            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>

            <form method="POST" className="mx-1 mx-md-4">

              <div className="mb-4">
                <i className="zmdi zmdi-email me-3"></i>
                <div className="form-outline mb-0">
                  <input type="email" id="email" name="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email" />
                </div>
              </div>

              <div className="mb-4">
                <i className="zmdi zmdi-lock me-3"></i>
                <div className="form-outline mb-0">
                  <input type="password" id="password" name="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your Password" />
                </div>
              </div>

              <div className='mb-4'>
                <Link className="text-warning" onClick={handleForgotClick} >Forgot Parssword?</Link>
              </div>

              <div className="row mx-4 mb-3 mb-lg-4">
                <div className='col-6'>
                  <button type="button" onClick={loginUser} className="btn btn-warning btn-lg" name="login" id="login" >Login</button>
                </div>
                <div className='col-6'>
                  <button type="button" onClick={handleSignupClick} className="btn btn-warning btn-lg">Sign Up</button>
                </div>
              </div>

            </form>

          </div>
        </div>
      </div>


      <div className='col-lg-2 col-sm-12'></div>
    </div>
  )
}

export default LoginPage;