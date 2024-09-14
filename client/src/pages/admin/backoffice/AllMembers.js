import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faDownload } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function AllMembers() {
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await fetch('http://localhost:3001/members');
      if (response.ok) {
        const data = await response.json();
        const formattedData = data.map(member => ({
          ...member,
          dob: new Date(member.dob).toLocaleDateString(),
          startDate: new Date(member.startDate).toLocaleDateString(),
          endDate: new Date(member.endDate).toLocaleDateString(),
          initialPaymentDate: new Date(member.initialPaymentDate).toLocaleDateString(),
          dueDate: new Date(member.dueDate).toLocaleDateString()
        }));
        setMembers(formattedData);
      } else {
        throw new Error('Failed to fetch members');
      }
    } catch (error) {
      console.error('Error fetching members:', error.message);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/editmembers/${id}`);
  };

  const handleDelete = (id) => {
    const confirmation = window.confirm('Are you sure you want to delete this member?');
    if (confirmation) {
      deleteMember(id);
    }
  };

  const deleteMember = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/members/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMembers(members.filter(member => member.id !== id));
        alert('Member has been deleted successfully.');
      } else {
        throw new Error('Failed to delete member');
      }
    } catch (error) {
      console.error('Error deleting member:', error.message);
      alert('Failed to delete member.');
    }
  };

  const handleDownload = (id) => {
    // Handle download action
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2 className="mb-4">Member List</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Mobile Number</th>
              <th>Package Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id}>
                <td>{member.firstName}</td>
                <td>{member.lastName}</td>
                <td>{member.mobileNumber}</td>
                <td>{member.packageType}</td>
                <td>
                  <button className="btn btn-link" onClick={() => handleEdit(member.id)} title="Edit">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="btn btn-link" onClick={() => handleDelete(member.id)} title="Delete">
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                  {/* <button className="btn btn-link" onClick={() => handleDownload(member.id)} title="Download">
                    <FontAwesomeIcon icon={faDownload} />
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AllMembers;
 