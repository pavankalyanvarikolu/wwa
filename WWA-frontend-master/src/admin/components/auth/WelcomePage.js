// /admin/components/auth/WelcomePage.js
import React, { useState } from 'react';
import LoginPage from './LoginPage';
// import SignupPage from './SignupPage';
import ForgotPasswordPage from './ForgotPasswordPage';

const WelcomePage = () => {
    const [activeTemplate, setActiveTemplate] = useState('login');


    switch (activeTemplate) {
        case 'login':
            return <LoginPage setActiveTemplate={setActiveTemplate} />;
        // case 'signup':
        //     return <SignupPage setActiveTemplate={setActiveTemplate} />;
        case 'forgotPassword':
            return <ForgotPasswordPage setActiveTemplate={setActiveTemplate} />;
        default:
            return <LoginPage setActiveTemplate={setActiveTemplate} />;
    }

}

export default WelcomePage;