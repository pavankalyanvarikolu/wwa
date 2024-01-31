// /admin/components/booking/EditBookingPage.js
import React, { useState } from "react";
import axios from 'axios';

const EditBookingPage = ({ setActiveTemplate, booking }) => {
    const [user, setUser] = useState({
        name: booking.name, email: booking.email, contact: booking.contact, address: booking.address, date: booking.date.substring(0, 10), adult: booking.adult, children: booking.children,
    });

    let name, value;
    const handleChange = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });
    }

    const incAdult = () => {
        setUser({ ...user, 'adult': user.adult + 1 });
    }
    const decAdult = () => {
        setUser({ ...user, 'adult': Math.max(user.adult - 1, 0) });
    }
    const incChildren = () => {
        setUser({ ...user, 'children': user.children + 1 });
    }
    const decChildren = () => {
        setUser({ ...user, 'children': Math.max(user.children - 1, 0) });
    }

    const handleBook = async (e) => {
        try {
            const response = await axios.post('/admin/editticket', { user, booking });
            const { message } = response.data;
            window.alert(message);
            setActiveTemplate('update');
        }
        catch (error) {
            const { message } = error.response.data;
            window.alert(message);
        }
    }



    return (
        <div className="container-fluid mt-5 text-warning">

            <div className="row m-5">
                <h1 className=" h1">Edit User Details</h1>
            </div>

            <div className="container">
                <div className="h4">

                    <div className="row m-4">
                        <div className="col-4 bg-black rounded ">
                            <label>Name</label>
                        </div>
                        <div className="col-8">
                            <input className=" bg-black rounded w-100 text-center text-warning" value={user.name} name="name" type="text" onChange={handleChange} ></input>
                        </div>
                    </div>

                    <div className="row m-4">
                        <div className="col-4 bg-black rounded ">
                            <label>Email</label>
                        </div>
                        <div className="col-8">
                            <input className=" bg-black rounded w-100 text-center text-warning" value={user.email} name="email" type="email" onChange={handleChange} ></input>
                        </div>
                    </div>

                    <div className="row m-4">
                        <div className="col-4 bg-black rounded ">
                            <label>Address</label>
                        </div>
                        <div className="col-8">
                            <input className=" bg-black rounded w-100 text-center text-warning" value={user.address} name="address" type="text" onChange={handleChange} ></input>
                        </div>
                    </div>

                    <div className="row m-4">
                        <div className="col-4 bg-black rounded ">
                            <label>Contact</label>
                        </div>
                        <div className="col-8">
                            <input className=" bg-black rounded w-100 text-center text-warning" value={user.contact} name="contact" type="number" onChange={handleChange} ></input>
                        </div>
                    </div>

                    <div className="row m-4">
                        <div className="col-4 bg-black rounded ">
                            <label>Date</label>
                        </div>
                        <div className="col-8">
                            <input className=" bg-black rounded w-75 text-center text-warning" value={user.date} name="date" type="date" onChange={handleChange} ></input>
                        </div>
                    </div>

                    <div className="row m-4">
                        <div className="col-lg-6">
                            <div className="row m-4">
                                <div className="col-6 bg-black rounded">
                                    <label>Adult</label>
                                </div>
                                <div className="col-6">
                                    <div className="btn-group" role="group">
                                        <button type="button" className="btn btn-warning" onClick={decAdult}> - </button>
                                        <input className=" bg-black text-warning text-center w-50" name="adult" value={user.adult} onChange={handleChange} type="number" min="1" />
                                        <button type="button" className="btn btn-warning" onClick={incAdult} > + </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="row m-4">
                                <div className="col-6 bg-black rounded">
                                    <label>Children</label>
                                </div>
                                <div className="col-6">
                                    <div className="btn-group" role="group">
                                        <button type="button" className="btn btn-warning" onClick={decChildren}> - </button>
                                        <input className=" bg-black text-warning text-center w-50" name="children" value={user.children} onChange={handleChange} type="number" min="1" />
                                        <button type="button" className="btn btn-warning" onClick={incChildren}> + </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row m-4">
                        <div>
                            <button className="btn btn-lg  bg-black text-warning w-50" onClick={handleBook}>SUBMIT</button>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default EditBookingPage;