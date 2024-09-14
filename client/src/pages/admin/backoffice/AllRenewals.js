import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../../components/Navbar';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function AllRenewals() {
  const [renewals, setRenewals] = useState([]);
  const navigate = useNavigate(); // Use useNavigate hook

  useEffect(() => {
    axios.get('http://localhost:3001/renewals')
      .then(response => {
        // Assuming the status is determined by comparing the due date with the current date
        const renewalsWithStatus = response.data.map(renewal => {
          const dueDate = new Date(renewal.dueDate);
          const today = new Date();
          const status = dueDate > today ? 'Pending' : 'Overdue';
          return { ...renewal, status };
        });
        setRenewals(renewalsWithStatus);
      })
      .catch(error => {
        console.error('Error fetching renewals data:', error);
      });
  }, []);
  const handleEdit = (id) => {
    navigate(`/admin/editmembers/${id}`);
  }
  const handleRenew = (id) => {
    console.log('Renew clicked for id:', id);
    // Implement the renewal logic here
  };

  return (
    <>
      <Navbar />
      <div className="container mt-3">
      <div className=" border-bottom border-1">
          <div className="row">
            <div className="col pt-4 pb-2">
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="text-center fw-bold mt-3">All Renewals</h3>
                <a className='btn btn-dark fw-bold btn-md' href='/admin/allmembers'>Note renewals are based on next 5 days</a>
              </div>
            </div>
          </div>
        </div>
        <table className="table table-striped mt-4">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Package Type</th>
              <th>Amount Due</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {renewals.map(renewal => (
              <tr key={renewal.id}>
                <td>{renewal.firstName}</td>
                <td>{renewal.lastName}</td>
                <td>{renewal.packageType}</td>
                <td>{renewal.amountDue}</td>
                <td>{new Date(renewal.dueDate).toLocaleDateString()}</td>
                <td>{renewal.status}</td>
                <td>
                <button className="btn btn-link" onClick={() => handleEdit(renewal.id)} title="Edit">
Renew                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AllRenewals;
