// /admin/components/booking/BookingsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const BookingsPage = ({ setActiveTemplate, email, setBooking }) => {
    const [bookings, setBookings] = useState([]);
    
    const handleEditBooking = (booking) => {
        
        setBooking(booking)
        setActiveTemplate('edit');
    }

    const handleDeleteBooking = async (booking) => {
        try{
            const response = await axios.post("/admin/deletebooking",{booking});
            const message = response.data.message;
            window.alert(message);
            window.location.reload();
        } catch (error) {
            window.alert(error.response.data);
        }
    }

    useEffect(() => {

        const checkBooking = async () => {
            try {
                const response = await axios.post("/admin/mybookings", { email });
                setBookings(response.data.bookings);

            } catch (error) {
                console.log(error);
            }
        }

        checkBooking();
    },[email]);

    return (
        <>
            <div className='container-fluid mt-5'>
                <div className='row text-warning fw-bold m-5 p-5'>
                    <h1 className="h1">Bookings</h1>
                </div>
                <div className='row text-warning '>
                    <div>
                        {(bookings.length === 0 ) ?
                            <div className='bg-black m-5 rounded border-warning border p-5'>
                                <div className='card bg-dark m-5 p-3'>
                                    <h2 className='text-danger'>No Booking Found!</h2>
                                    <p className='text-warning'>Admin What are you Doing.</p>
                                </div>
                            </div> :
                            <div className=" overflow-auto bg-black rounded py-5 px-2">
                                <table className='w-100 h4'>
                                    <thead>
                                        <tr>
                                            <th>Serial No</th>
                                            <th>Name</th>
                                            <th>Booking Number</th>
                                            <th>Park</th>
                                            <th>Adventure</th>
                                            <th>Date</th>
                                            <th>Edit Booking</th>
                                            <th>Delete Booking</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookings.map((booking, index) => (
                                            <tr key={index} className='border border-warning'>
                                                <td>{index + 1}</td>
                                                <td>{booking.name}</td>
                                                <td>{booking.bookingnumber}</td>
                                                <td>{booking.park}</td>
                                                <td>{booking.adventure}</td>
                                                <td>{booking.date.substring(0,10)}</td>
                                                <td><button className='btn btn-lg btn-warning' onClick={() => handleEditBooking(booking)}>Edit</button></td>
                                                <td><button className='btn btn-lg btn-warning' onClick={() => handleDeleteBooking(booking)}>Delete</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>
                </div>

            </div>
        </>
    )
}

export default BookingsPage;