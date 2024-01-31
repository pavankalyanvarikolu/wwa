// /pages/AdminBookingsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BeatLoader from 'react-spinners/BeatLoader';
import LoggedInNavbar from '../admin/components/common/LoggedInNavbar';
import HandleBookingsPage from '../admin/components/booking/HandleBookingsPage';
import ErrorPage from './ErrorPage';


const AdminBookingsPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    setLoading(true);
    const checkAuthentication = async () => {
      try {
        const response = await axios.post('/admin/authenticate');
        if (response.status === 200) {
          setEmail(response.data.email);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Authentication check failed');
      } finally {
        setLoading(false);
      }
    }

    checkAuthentication();
  }, []);

  return (
    <>
      <div>
        {loading ? (
          <div className='loading justify-content-center'>
            <BeatLoader color="#FFFF00" margin={5} size={30} />
          </div>)
          : (
            <div>
              {isLoggedIn ? (
                <div>
                  <LoggedInNavbar />
                  <HandleBookingsPage email={email} />
                </div>
              ) : (
                <div>
                  <ErrorPage />
                </div>
              )}
            </div>)}
      </div>
    </>
  );
};

export default AdminBookingsPage;
