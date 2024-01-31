import React, {useEffect} from 'react';

const PrintTicketPage = ({ userDetails, bookingNumber, selectedAdventures }) => {

    useEffect(() => {
        const Printfunction = () => {
          window.print();
        }
    
        Printfunction();
      }, []);

    return (
        <div className='container mt-5 bg-warning p-5'>
            <h1>Ticket Details</h1>
            <h2>Boooking No: {bookingNumber}</h2>
            <div className='text-left mt-5'>
                <h2>User Details:</h2>
                <h5>Name:  {userDetails.name}</h5>
                <h5>Email:  {userDetails.email}</h5>
                <h5>Address:  {userDetails.address}</h5>
                <h5>Contact:  {userDetails.contact}</h5>
                <h5>Adult:  {userDetails.adult}</h5>
                <h5>Children:  {userDetails.children}</h5>
                <h5>Date:  {userDetails.date}</h5>
                
            </div>

            <div className='mt-5 text-left'>
                <h2>Selected Adventures:</h2>
                {Object.entries(selectedAdventures).map(([category, adventures], index) => (
                    <div key={index}>
                        <h5>{category}</h5>
                        <ul>
                            {adventures.map((adventure, subIndex) => (
                                <li key={subIndex}>{adventure}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PrintTicketPage;