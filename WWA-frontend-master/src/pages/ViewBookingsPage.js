// /pages/ViewBookingsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BeatLoader from 'react-spinners/BeatLoader';
import LoggedInNavbar from '../components/common/LoggedInNavbar';
import BookingsPage from '../components/booking/BookingsPage';
import ErrorPage from './ErrorPage';


const ViewBookingsPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    setLoading(true);
    const checkAuthentication = async () => {
      try {
        const response = await axios.post('/authenticate');
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
                  <BookingsPage email={email} />
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

export default ViewBookingsPage;
