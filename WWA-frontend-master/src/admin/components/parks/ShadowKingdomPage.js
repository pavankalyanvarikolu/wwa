// /admin/components/parks/ShadowKingdomPage.js
import React, { useState } from 'react';

const ShadowKingdomPage = ({ setActiveTemplate, onSave }) => {

    const [termsCheck1, setTermsCheck1] = useState(false);
    const [termsCheck2, setTermsCheck2] = useState(false);
    const [selectedAdventures, setSelectedAdventures] = useState([]);

    const handleCheckboxChange = (adventureName) => {
        setSelectedAdventures((prevSelectedAdventures) => {
            if (prevSelectedAdventures.includes(adventureName)) {
                return prevSelectedAdventures.filter((adventure) => adventure !== adventureName);
            } else {
                return [...prevSelectedAdventures, adventureName];
            }
        });
    };

    const handelTermsCheck1 = (e) => {
        setTermsCheck1(e.target.checked);
    }

    const handelTermsCheck2 = (e) => {
        setTermsCheck2(e.target.checked);
    }

    const handleClick = (e) => {
        setActiveTemplate(e.target.name);
    }

    const handleSave = () => {
        onSave(selectedAdventures);
    };

    const handleBook = () => {
        if (!selectedAdventures) {
            window.alert("Please Select an Adventure");
        }
        else {
            onSave(selectedAdventures);
            setActiveTemplate('userdetails');
        }
    };


    return (
        <div className='container-fluid mt-5'>

            <div className='row m-lg-5'>
                <h1 className='text-warning'>WELCOME TO SHADOW KINGDOM</h1>
                <p className='text-warning'>“Thrill to SCUBA DIVING, our star ride, and discover more exciting adventures”</p>
            </div>

            <div className='container'>

                <div className='row mx-4'>
                    <div className='col-lg-6 col-md-12'>
                        <div className='row  m-3 py-3 bg-black border rounded border-warning big'>
                            <div className='col-3'>
                                <input className="form-check-input" type="checkbox" value="" id="canoeing" onChange={() => handleCheckboxChange('Canoeing')}/>
                            </div>
                            <div className='col-9'>
                                <label className="form-check-label text-warning h2" htmlFor="canoeing">
                                    CANOEING
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-12'>
                        <div className='row  m-3 py-3 bg-black border rounded border-warning big'>
                            <div className='col-3'>
                                <input className="form-check-input" type="checkbox" value="" id="parasailing" onChange={() => handleCheckboxChange('Parasailing')}/>
                            </div>
                            <div className='col-9'>
                                <label className="form-check-label text-warning h2" htmlFor="parasailing">
                                    PARASAILING
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row mx-4'>
                    <div className='col-lg-6 col-md-12'>
                        <div className='row  m-3 py-3 bg-black border rounded border-warning big'>
                            <div className='col-3'>
                                <input className="form-check-input" type="checkbox" value="" id="kayaking" onChange={() => handleCheckboxChange('Kayaking')}/>
                            </div>
                            <div className='col-9'>
                                <label className="form-check-label text-warning h2" htmlFor="kayaking">
                                    KAYAKING
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-12'>
                        <div className='row  m-3 py-3 bg-black border rounded border-warning big'>
                            <div className='col-3'>
                                <input className="form-check-input" type="checkbox" value="" id="scubaDiving" onChange={() => handleCheckboxChange('Scuba Diving')}/>
                            </div>
                            <div className='col-9'>
                                <label className="form-check-label text-warning h2" htmlFor="scubaDiving">
                                    SCUBA DIVING
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row mx-4'>
                    <div className='col-lg-6 col-md-12'>
                        <div className='row  m-3 py-3 bg-black border rounded border-warning big'>
                            <div className='col-3'>
                                <input className="form-check-input" type="checkbox" value="" id="underWaterScooter" onChange={() => handleCheckboxChange('Under Water Scooter')}/>
                            </div>
                            <div className='col-9'>
                                <label className="form-check-label text-warning h2" htmlFor="underWaterScooter">
                                    UNDER WATER SCOOTER
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-12'>
                        <div className='row  m-3 py-3 bg-black border rounded border-warning big'>
                            <div className='col-3'>
                                <input className="form-check-input" type="checkbox" value="" id="cliffDiving" onChange={() => handleCheckboxChange('Cliff Diving')}/>
                            </div>
                            <div className='col-9'>
                                <label className="form-check-label text-warning h2" htmlFor="cliffDiving">
                                    CLIFF DIVING
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className='row text-warning bg-black text-left m-lg-5 rounded p-lg-2'>
                <div className='col-12'>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" name="termsCheck1" onChange={handelTermsCheck1} id="termsCheck1" />
                        <label className="form-check-label" htmlFor="termsCheck1">
                            I have read and understood the health and warning statement. By checking this box, I acknowledge and accept the risks
                            associated with adventure sports and confirm my suitability to participate.
                        </label>
                    </div>
                </div>
                <div className='col-12'>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" name="termsCheck2" onChange={handelTermsCheck2} id="termsCheck2" />
                        <label className="form-check-label" htmlFor="termsCheck2">
                            I agree for Terms & Conditions
                        </label>
                    </div>
                </div>
            </div>

            <div className='row m-3'>
                <div className='col-4'>
                    <button className='btn btn-lg py-3 px-5 bg-black text-warning ' name='main' onClick={handleClick}><label className='h2'>Back</label></button>
                </div>
                <div className='col-4'>
                    <button className='btn btn-lg py-3 px-5 bg-black text-warning ' onClick={handleSave} disabled={!termsCheck1 || !termsCheck2} ><label className='h2'>Save</label></button>
                </div>
                <div className='col-4'>
                    <button className='btn btn-lg py-3 px-5 bg-black text-warning ' onClick={handleBook} disabled={!termsCheck1 || !termsCheck2}><label className='h2'>Book</label></button>
                </div>
            </div>
            
        </div>
    )
};

export default ShadowKingdomPage;