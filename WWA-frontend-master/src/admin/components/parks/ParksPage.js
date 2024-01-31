// /admin/components/parks/ParksPage.js
import React, { useState } from 'react';
import MainPage from "./MainPage";
import ThrillvillePage from './ThrillvillePage';
import QuestworldPage from './QuestworldPage';
import SpiritrealmPage from './SpiritrealmPage';
import ShadowKingdomPage from './ShadowKingdomPage';
import UserDetailPage from './UserDetailsPage';
import BookingConfirmPage from './BookingConfirmPage';
import PrintTicketPage from './PrintTicketPage';
import axios from 'axios';

const ParksPage = () => {
    const [activeTemplate, setActiveTemplate] = useState('main');
    const [selectedAdventures, setSelectedAdventures] = useState({});
    const [bookingNumber, setBookingNumber] = useState();
    const [userDetail, setUserDetail] = useState();

    const onSave = (parkName, adventures) => {
        setSelectedAdventures((prev) => ({ ...prev, [parkName]: adventures }));
    };
    const onBook = async (userDetails) => {

        setUserDetail(userDetails);

        try {
            const response = await axios.post('/admin/bookticket', { userDetails, selectedAdventures });

            const { message, bookingnumber } = response.data;
            setBookingNumber(bookingnumber);

            setActiveTemplate('booking');
            window.alert(message);
        }
        catch (error) {
            const { message } = error.response.data;
            window.alert(message);
        }
    }



    switch (activeTemplate) {
        case 'main':
            return <MainPage setActiveTemplate={setActiveTemplate} />;
        case 'thrillville':
            return <ThrillvillePage setActiveTemplate={setActiveTemplate} onSave={(adventures) => onSave('Thrillville', adventures)} />;
        case 'spiritrealm':
            return <SpiritrealmPage setActiveTemplate={setActiveTemplate} onSave={(adventures) => onSave('Spiritrealm', adventures)} />;
        case 'questworld':
            return <QuestworldPage setActiveTemplate={setActiveTemplate} onSave={(adventures) => onSave('Questworld', adventures)} />;
        case 'shadowkingdom':
            return <ShadowKingdomPage setActiveTemplate={setActiveTemplate} onSave={(adventures) => onSave('ShadowKingdom', adventures)} />;
        case 'userdetails':
            return <UserDetailPage setActiveTemplate={setActiveTemplate} onBook={(userDetails) => onBook(userDetails)} />
        case 'booking':
            return <BookingConfirmPage setActiveTemplate={setActiveTemplate} bookingNumber={bookingNumber} />;
        case 'print':
            return <PrintTicketPage setActiveTemplate={setActiveTemplate} userDetails={userDetail} selectedAdventures={selectedAdventures} bookingNumber={bookingNumber} />;
        default:
            return <MainPage setActiveTemplate={setActiveTemplate} />;
    }
};

export default ParksPage;