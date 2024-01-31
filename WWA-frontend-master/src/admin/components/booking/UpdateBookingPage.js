// /admin/components/booking/UpdaeBookingPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateBookingPage = () => {

    const navigate = useNavigate();

    const handleView = () => {
        navigate('/admin/bookings')
        window.location.reload();
    }

    const handlePrint = () => {

    }

    const handleLogout = async () => {
        try {
            await axios.post('/admin/logout');
            navigate('/admin');
            window.location.reload();
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <div className="container-fluid booking-heading text-warning">
            <div className="row m-5 p-5">
                <h1 className="h1 booking-update">BOOKING UPDATED SUCCESSFULLY</h1>
            </div>

            <div className="row m-4">
                <div className='col-md-4 p-2'>
                    <button className='btn btn-lg py-3 px-5 bg-black text-warning' onClick={handlePrint} ><label className='h2'>PRINT TICKET</label></button>
                </div>
                <div className='col-md-4 p-2'>
                    <button className='btn btn-lg py-3 px-5 bg-black text-warning' onClick={handleView} ><label className='h2'>VIEW BOOKINGS</label></button>
                </div>
                <div className='col-md-4 p-2'>
                    <button className='btn btn-lg py-3 px-5 bg-black text-warning' onClick={handleLogout} ><label className='h2'>LOGOUT</label></button>
                </div>
            </div>
        </div>
    )
}

export default UpdateBookingPage;