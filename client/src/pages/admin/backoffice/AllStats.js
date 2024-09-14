// AllStats.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSync, faMoneyBill, faMoneyCheck } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../../../components/Navbar';
import '../../../assets/styles/core.css'
const AllStats = () => {
  const [totalMembers, setTotalMembers] = useState(0);
  const [totalRenewals, setTotalRenewals] = useState(0);
  const [totalAmountDues, setTotalAmountDues] = useState(0);
  const [totalAmountPaid, setTotalAmountPaid] = useState(0);

  useEffect(() => {
    fetchAllStatsData();
  }, []);

  const fetchAllStatsData = async () => {
    try {
      const [membersResponse, renewalsResponse, amountDuesResponse, amountPaidResponse] = await Promise.all([
        axios.get('http://localhost:3001/total-members'),
        axios.get('http://localhost:3001/total-renewals'),
        axios.get('http://localhost:3001/total-amount-dues'),
        axios.get('http://localhost:3001/total-amount-paid')
      ]);

      setTotalMembers(membersResponse.data.totalMembers);
      setTotalRenewals(renewalsResponse.data.totalRenewals);
      setTotalAmountDues(amountDuesResponse.data.totalAmountDues);
      setTotalAmountPaid(amountPaidResponse.data.totalAmountPaid);
    } catch (error) {
      console.error('Error fetching AllStats data:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-5 mb-4 p-2">
            <div className="card text-center">
              <div className="card-body p-4">
                <h5 className="card-title"><FontAwesomeIcon icon={faUser} /> Total Members</h5>
                <p className="card-text">{totalMembers}</p>
              </div>
            </div>
          </div>
          <div className="col-md-5 mb-4 p-2">
            <div className="card text-center">
              <div className="card-body p-4">
                <h5 className="card-title"><FontAwesomeIcon icon={faSync} /> Total Renewals</h5>
                <p className="card-text">{totalRenewals}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-5 mb-4 p-2">
            <div className="card text-center">
              <div className="card-body p-4">
                <h5 className="card-title"><FontAwesomeIcon icon={faMoneyBill} /> Total Amount Dues</h5>
                <p className="card-text">{totalAmountDues}</p>
              </div>
            </div>
          </div>
          <div className="col-md-5 mb-4 p-2">
            <div className="card text-center">
              <div className="card-body p-4">
                <h5 className="card-title"><FontAwesomeIcon icon={faMoneyCheck} /> Total Amount Paid</h5>
                <p className="card-text">{totalAmountPaid}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllStats;
