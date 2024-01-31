// /comoponent/booking/BookingPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const BookingsPage = ({ email }) => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {

        const checkBooking = async () => {
            try {
                const response = await axios.post("/mybookings", { email });
                setBookings(response.data.bookings);

            } catch (error) {
                console.log(error);
            }
        }

        checkBooking();
    }, [email]);

    return (
        <>
            <div className='container-fluid mt-5'>
                <div className='row text-warning fw-bold m-5 p-5'>
                    <h1 className="h1">Bookings</h1>
                </div>
                <div className='row text-warning bg-black m-5 rounded border-warning border p-5'>
                    <div>
                        {(bookings.length === 0) ?
                            <div>
                                <div className='card bg-dark m-5 p-3'>
                                    <h2 className='text-danger'>No Booking Found!</h2>
                                    <p className='text-warning'>for Email: {email}</p>
                                </div>
                            </div> :
                            <div>
                                <table className='w-100 h3'>
                                    <thead>
                                        <tr>
                                            <th>Serial No</th>
                                            <th>Name</th>
                                            <th>Booking Number</th>
                                            <th>Park</th>
                                            <th>Adventure</th>
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