import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgetPasswordPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const navigate = useNavigate();

    const handleReset = () => {
        setEmail("");
        setPassword("");
        setCpassword("");
    }

    const forgotPassword = async () => {
        
        try {
            const response = await axios.post('/admin/forgotpassword', { email, password, cpassword });
      
            const { message } = response.data;
            window.alert(message);
      
            navigate('/admin');
            window.location.reload();
          }
          catch (error) {
            const { message } = error.response.data;
            window.alert(message);
          }
    }


    return (
        <div>
            <div className='card bg-black m-5'>
                <div className='card-body'>
                    <div className='card-heading fw-bold text-warning'>
                        <h1>WEDNESDAYS WICKED ADVENTURES</h1>
                    </div>
                </div>
            </div>
            <div className='container my-5'>
                <div className='card bg-black rounded-5 text-warning p-3'>
                    <div className='row m-3 mb-5'>
                        <div className='card-heading fw-bold text-warning'>
                            <h2>FORGOT PASSWORD</h2>
                        </div>
                    </div>
                    <div className='row m-3'>
                        <div className='col-6'>
                            <label className='h5'>Email</label>
                        </div>
                        <div className='col-6'>
                            <input className='form-control text-black bg-warning' type='email' id="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
                    <div className='row m-3'>
                        <div className='col-6'>
                            <label className='h5'>Password</label>
                        </div>
                        <div className='col-6'>
                            <input className='form-control text-black bg-warning' type='password' id="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className='row m-3'>
                        <div className='col-6'>
                            <label className='h5'>Confirm Password</label>
                        </div>
                        <div className='col-6'>
                            <input className='form-control text-black bg-warning' type='password' id="cpassword" name='cpassword' value={cpassword} onChange={(e) => setCpassword(e.target.value)} />
                        </div>
                    </div>
                    <div className='row m-5'>
                        <div className='col'>
                            <button className='btn btn-warning btn-lg' onClick={handleReset}>Reset</button>
                        </div>
                        <div className='col'>
                            <button className='btn btn-warning btn-lg' onClick={forgotPassword}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPasswordPage;