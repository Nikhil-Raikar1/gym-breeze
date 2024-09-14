import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../../../components/Navbar';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer

// Import CSS for toastify (add this line in your main CSS file or index.js)
import 'react-toastify/dist/ReactToastify.css';

function PackageForm() {
    const [packageName, setPackageName] = useState('');
    const [price, setPrice] = useState('');
    const [duration, setDuration] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await axios.post('http://localhost:3001/packages', {
                packageName,
                price,
                duration
            });
            
            setPackageName('');
            setPrice('');
            setDuration('');
            
            // Show success message using toast
            toast.success('Package created successfully');
        } catch (error) {
            console.error('Error creating package:', error);
            // Show error message using toast
            toast.error('Error creating package. Please try again later.');
        }
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <div className=" border-bottom border-1">
                    <div className="row">
                        <div className="col pt-4 pb-2">
                            <div className="d-flex justify-content-between align-items-center">
                                <h3 className="text-center fw-bold mt-3">Add New Package </h3>
                                <a className='btn btn-dark fw-bold btn-md' href='/admin/backoffice/packages'>Got to All Packages</a>
                            </div>
                        </div>
                    </div>
                </div> 
                <div className='d-flex justify-content-center align-items-center mt-5'>
                    <div className="col-md-8 border p-5 rounded">
                        <h2 className='panel-title fs-3 mb-3'>Package Settings</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="row mb-3">
                                <div className="col">
                                    <div className="form-floating">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="packageName"
                                            placeholder=" "
                                            value={packageName}
                                            onChange={(e) => setPackageName(e.target.value)}
                                        />
                                        <label htmlFor="packageName">Package Name</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-floating">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="price"
                                            placeholder=" "
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                        <label htmlFor="price">Price</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <div className="form-floating">
                                        <select
                                            className="form-select"
                                            id="duration"
                                            value={duration}
                                            onChange={(e) => setDuration(e.target.value)}
                                        >
                                            <option value="">Select duration</option>
                                            <option value="1 Month">1 Month</option>
                                            <option value="3 Months">3 Months</option>
                                            <option value="6 Months">6 Months</option>
                                            <option value="1 Year">1 Year</option>
                                        </select>
                                        <label htmlFor="duration">Duration</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group text-end mt-4">
                                <button type="submit" id="submit_btn" className="btn btn-md btn-dark">Save Record</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* ToastContainer to display toast messages */}
            <ToastContainer />
        </>
    );
}

export default PackageForm;
