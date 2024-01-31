// pages/AdminPage.js
import React, { useState, useEffect } from 'react';
import BeatLoader from "react-spinners/BeatLoader";
import axios from 'axios';
import LoggedInNavbar from '../admin/components/common/LoggedInNavbar';
import Navbar from '../admin/components/common/Navbar';
import WelcomePage from '../admin/components/auth/WelcomePage';
import ParksPage from '../admin/components/parks/ParksPage';

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const checkAuthentication = async () => {
      try {
        const response = await axios.post('/admin/authenticate');
        if (response.status === 200) {
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
                <ParksPage />
              </div>
            ) : (
              <div>
                <Navbar />
                <WelcomePage />
              </div>
            )}
          </div>)}
    </div>
  );
};

export default AdminPage;
