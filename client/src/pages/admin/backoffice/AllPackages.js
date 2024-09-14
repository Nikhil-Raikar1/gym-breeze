import { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import 'react-toastify/dist/ReactToastify.css';

function AllPackages() {
    const [packages, setPackages] = useState([]);
    const navigate = useNavigate(); // Use useNavigate hook

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/packages');
            setPackages(response.data);
        } catch (error) {
            console.error('Error fetching packages:', error);
        }
    };

    const handleDelete = async (id) => {
        const shouldDelete = window.confirm('Are you sure you want to delete this package?');
        if (shouldDelete) {
            try {
                await axios.delete(`http://localhost:3001/packages/${id}`);
                toast.success('Package deleted successfully');
                // After deleting, fetch data again to update the table
                fetchData();
            } catch (error) {
                console.error('Error deleting package:', error);
                toast.error('Error deleting package');
            }
        }
    };

    const handleEdit = (id) => {
        navigate(`/admin/backoffice/packageform/${id}`); // Use navigate to redirect
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <div className=" border-bottom border-1">
                    <div className="row">
                        <div className="col pt-4 pb-2">
                            <div className="d-flex justify-content-between align-items-center">
                                <h3 className="text-center fw-bold mt-3">Package Management</h3>
                                <a className='btn btn-dark fw-bold btn-md' href='/admin/backoffice/packageform'>Add New Package</a>
                            </div>
                        </div>
                    </div>
                </div> 
                <div className="row justify-content-center mt-5">
                    <div className="col-md-12">
                        <table className="table table-striped">
                            <thead>
                                <tr className='table-dark'>
                                    <th>Package Name</th>
                                    <th>Duration</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {packages.map(pkg => (
                                    <tr key={pkg.id}>
                                        <td>{pkg.packageName}</td>
                                        <td>{pkg.duration}</td>
                                        <td>{pkg.price}</td>
                                        <td>
                                            <button className="btn btn-secondary me-2" onClick={() => handleEdit(pkg.id)}><FontAwesomeIcon icon={faEdit} size=''/></button>
                                            <button className="btn btn-danger" onClick={() => handleDelete(pkg.id)}><FontAwesomeIcon icon={faTrash} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
    );
}

export default AllPackages;
