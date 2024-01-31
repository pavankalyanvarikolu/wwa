// /admin/components/common/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>

      <div className='row bg-black m-0 p-3'>
        <div className='col-6'>
          <Link className='btn btn-warning font-weight-bold ' to="/">Home</Link>
        </div>
        <div className='col-6'>
          <Link className='btn btn-warning font-weight-bold' to="/admin">Admin</Link>
        </div>
      </div>


    </>
  );
};

export default Navbar;
