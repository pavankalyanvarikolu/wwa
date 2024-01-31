// /comoponent/auth/SignupPage.js
import React, { useState } from 'react';
import axios from 'axios';

const SignupPage = ({ setActiveTemplate }) => {

  const [termsCheck, setTermsCheck] = useState(false);
  const [user, setUser] = useState({
    firstname: "", lastname: "", email: "", password: "", cpassword: "",
  });

  const handelTermsCheck = (e) => {
    setTermsCheck(e.target.checked);
  }

  let name, value;
  const handelInputs = (userData) => {
    name = userData.target.name;
    value = userData.target.value;

    setUser({ ...user, [name]: value })
  }


  const registerUser = async (userData) => {
    userData.preventDefault();
    try {
      const { firstname, lastname, email, password, cpassword } = user;

      const response = await axios.post('/signup', { firstname, lastname, email, password, cpassword });

      const { message } = response.data;
      window.alert(message);

      setActiveTemplate('login');

    } catch (error) {
      window.alert(error.response.data.message);
    }
  };

  const handleLoginClick = () => {
    setActiveTemplate('login');
  };

  return (
    <div className='row m-5'>
      <div className='col-lg-1 col-sm-12'></div>

      <div className='col-lg-5 col-sm-12 text-warning my-5 p-5'>
        <h1 className='wednesday-title'>Wednesdays Wicked Adventures</h1>
      </div>

      <div className="col-lg-5 col-sm-12">
        <div className="card text-warning bg-black" >
          <div className="card-body">

            <p className=" h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

            <form className="mx-1 mx-md-4" method='POST'>

              <div className="mb-4">
                <i className="zmdi zmdi-account me-3"></i>
                <div className="form-outline mb-0">
                  <input type="text" id="firstname" name="firstname" onChange={handelInputs} value={user.firstname} className="form-control" placeholder="Your First Name" />
                </div>
              </div>

              <div className="mb-4">
                <i className="zmdi zmdi-account me-3"></i>
                <div className="form-outline mb-0">
                  <input type="text" id="lastname" name="lastname" onChange={handelInputs} value={user.lastphone} className="form-control" placeholder="Your Last Name" />
                </div>
              </div>

              <div className="mb-4">
                <i className="zmdi zmdi-email me-3"></i>
                <div className="form-outline mb-0">
                  <input type="email" id="email" name="email" onChange={handelInputs} value={user.email} className="form-control" placeholder="Your Email" />
                </div>
              </div>

              <div className="mb-4">
                <i className="zmdi zmdi-lock me-3"></i>
                <div className="form-outline mb-0">
                  <input type="password" id="password" name="password" onChange={handelInputs} value={user.password} className="form-control" placeholder="Your Password" />
                </div>
              </div>

              <div className="mb-4">
                <i className="zmdi zmdi-lock me-3"></i>
                <div className="form-outline mb-0">
                  <input type="password" id="cpassword" name="cpassword" onChange={handelInputs} value={user.cpassword} className="form-control" placeholder="Confirm Your Password" />
                </div>
              </div>

              <div className="mb-4">
                <input type="checkbox" name="termsCheck" onChange={handelTermsCheck} className="form-check-input" id="termsCheck" />
                <label className="form-check-label" htmlFor="termCheck">Term and conditions</label>
              </div>

              <div className="row mx-4 mb-3 mb-lg-4">
                <div className='col-6'>
                  <button type="button" className="btn btn-warning btn-lg" name="register" id="register" onClick={registerUser} disabled={!termsCheck}>Signup</button>
                </div>
                <div className='col-6'>
                  <button type="button" onClick={handleLoginClick} className="btn btn-warning btn-lg">Login</button>
                </div>
              </div>

            </form>

          </div>
        </div>
      </div>


      <div className='col-lg-1 col-sm-12'></div>
    </div>
  )
}

export default SignupPage
