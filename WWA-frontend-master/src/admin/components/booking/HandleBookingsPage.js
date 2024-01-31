// /admin/components/booking/HandleBookingPage.js
import React, { useState } from 'react';
import BookingsPage from './BookingsPage';
import EditBookingPage from './EditBookingPage';
import UpdateBookingPage from './UpdateBookingPage';

const HandleBookingsPage = ({email}) => {
    const [activeTemplate, setActiveTemplate] = useState('booking');
    const [booking, setBooking] = useState([]);


    switch (activeTemplate) {
        case 'booking':
            return <BookingsPage setActiveTemplate={setActiveTemplate} email={email} setBooking={setBooking} />;
        case 'edit':
            return <EditBookingPage setActiveTemplate={setActiveTemplate} booking={booking}/>;
        case 'update':
            return <UpdateBookingPage setActiveTemplate={setActiveTemplate} />;
        default:
            return <BookingsPage setActiveTemplate={setActiveTemplate} email={email} setBooking={setBooking} />;
    }

}

export default HandleBookingsPage;