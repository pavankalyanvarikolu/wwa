// /comoponent/parks/BookingConfirmPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BookingConfirmPage = ({ setActiveTemplate, bookingNumber }) => {

    const navigate = useNavigate();

    const handleView = () => {
        navigate('/bookings')
    }

    const handlePrint = () => {
        setActiveTemplate('print');
    }

    const handleLogout = async () => {
        try {
            await axios.post('/logout');
            navigate('/');
            window.location.reload();
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <div className="container-fluid booking-heading text-warning">
            <div className="row m-4">
                <h1 className="h1">BOOKING IS SUCCESSFUL</h1>
            </div>

            <div className="container booking-container my-5">
                <div className="my-5">
                    <div className="booking-body bg-warning text-black p-3 px-5 rounded border border-black">
                        <h2 className="h1">Booking Number: {bookingNumber}</h2>
                    </div>
                </div>
            </div>
            <div className="row m-4">
                <div className='col-4'>
                    <button className='btn btn-lg py-3 px-5 bg-black text-warning' onClick={handlePrint} ><label className='h2'>PRINT TICKET</label></button>
                </div>
                <div className='col-4'>
                    <button className='btn btn-lg py-3 px-5 bg-black text-warning' onClick={handleView} ><label className='h2'>VIEW BOOKINGS</label></button>
                </div>
                <div className='col-4'>
                    <button className='btn btn-lg py-3 px-5 bg-black text-warning' onClick={handleLogout} ><label className='h2'>LOGOUT</label></button>
                </div>
            </div>
        </div>
    )
}

export default BookingConfirmPage;