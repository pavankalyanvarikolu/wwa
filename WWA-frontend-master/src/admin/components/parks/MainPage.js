// /admin/components/parks/MainPage.js
import React from "react";


const MainPage = ({ setActiveTemplate }) => {

    const handleClick = (e) => {
        setActiveTemplate(e.target.name);
    }

    return (
        <div className='container-fluid mt-5'>

            <div className='row m-4'>
                <h1 className='text-warning'>Wednesdays Wicked Adventure Park</h1>
            </div>

            <div className="container-fluid">

                <div className='row m-4'>
                    <div className='col-lg-6 col-md-12'>
                        <div className='row m-5 py-5 bg-black border rounded border-warning'>
                            <div className='col-lg-9 col-md-12'>
                                <h2 className="text-warning text-lg-left ml-lg-5 my-2">THRILLVILLE</h2>
                            </div>
                            <div className='col-lg-3 col-md-12'>
                                <button className='btn btn-lg font-weight-bold btn-warning' name="thrillville" onClick={handleClick}>View</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-12'>
                        <div className='row m-5 py-5 bg-black border rounded border-warning'>
                            <div className='col-lg-9 col-md-12'>
                                <h2 className="text-warning text-lg-left ml-lg-5 my-2">SPIRITREALM</h2>
                            </div>
                            <div className='col-lg-3 col-md-12'>
                                <button className='btn btn-lg font-weight-bold btn-warning' name="spiritrealm" onClick={handleClick} >View</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row m-4'>
                    <div className='col-lg-6 col-md-12'>
                        <div className='row m-5 py-5 bg-black border rounded border-warning'>
                            <div className='col-lg-9 col-md-12'>
                                <h2 className="text-warning text-lg-left ml-lg-5 my-2">QUESTWORLD</h2>
                            </div>
                            <div className='col-lg-3 col-md-12'>
                                <button className='btn btn-lg font-weight-bold btn-warning' name="questworld" onClick={handleClick} >View</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-12'>
                        <div className='row m-5 py-5 bg-black border rounded border-warning'>
                            <div className='col-lg-9 col-md-12'>
                                <h2 className="text-warning text-lg-left ml-lg-5 my-2">SHADOW KINGDOM</h2>
                            </div>
                            <div className='col-lg-3 col-md-12'>
                                <button className='btn btn-lg font-weight-bold btn-warning' name="shadowkingdom" onClick={handleClick}>View</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default MainPage;