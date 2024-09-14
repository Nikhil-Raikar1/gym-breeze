import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSyncAlt, faChartBar, faBox, faUsersCog, faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../../components/Navbar';
import '../../assets/styles/core.css'
function Home() {
  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <h2 className='fw-bold text-center mb-3'> Membership Management </h2>
        <div className="row">
          {/* Add New Members Card */}
          <div className="col-md-4 p-2">
            <a href='/admin/addmember' className='text-decoration-none'>
              <div className="card shadow-sm p-2">
                <div className="card-body">
                  <h5 className="card-title dash-title">
                    <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                    Add New Members
                  </h5>
                  <p className="card-text">Add new members to your gym.</p>
                </div>
              </div>
            </a>
          </div>

          {/* Renewals Card */}
          <div className="col-md-4 p-2">
            <a href='/admin/renewals' className='text-decoration-none'>
              <div className="card shadow-sm p-2">
                <div className="card-body">
                  <h5 className="card-title dash-title">
                    <FontAwesomeIcon icon={faSyncAlt} className="me-2" />
                    Renewals
                  </h5>
                  <p className="card-text">Manage membership renewals.</p>
                </div>
              </div>
            </a>

          </div>

          {/* Reports Card */}
          <div className="col-md-4 p-2">
            <a href='/admin/stats' className='text-decoration-none'>
              <div className="card shadow-sm p-2">
                <div className="card-body">
                  <h5 className="card-title dash-title">
                    <FontAwesomeIcon icon={faChartBar} className="me-2" />
                    Stats
                  </h5>
                  <p className="card-text"> View Stats.</p>
                </div>
              </div>
            </a>
          </div>
        </div>

        <h2 className='fw-bold text-center mb-3 mt-5'> Back Office Management </h2>
        <div className='row'>
          <div className="col-md-4 p-2">
            <a href='/admin/backoffice/packages' className='text-decoration-none'>
              <div className="card shadow-sm p-2">
                <div className="card-body">
                  <h5 className="card-title dash-title">
                    <FontAwesomeIcon icon={faBox} className="me-2" />
                    Manage Packages
                  </h5>
                  <p className="card-text">Manage gym membership packages.</p>
                </div>
              </div>
            </a>
          </div>

          {/* <div className="col-md-4 p-2">
            <a href='/admin/staff-accounts' className='text-decoration-none'>
              <div className="card shadow-sm p-2">
                <div className="card-body">
                  <h5 className="card-title dash-title">
                    <FontAwesomeIcon icon={faUsersCog} className="me-2" />
                    Staff Accounts
                  </h5>
                  <p className="card-text">Manage staff accounts and permissions.</p>
                </div>
              </div>
            </a>
          </div> */}

          <div className="col-md-4 p-2">
            <a href='/admin/generate-invoice' className='text-decoration-none'>
              <div className="card shadow-sm p-2">
                <div className="card-body">
                  <h5 className="card-title dash-title">
                    <FontAwesomeIcon icon={faFileInvoice} className="me-2" />
                    Invoice Generation
                  </h5>
                  <p className="card-text">Generate invoices for gym expenses.</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
