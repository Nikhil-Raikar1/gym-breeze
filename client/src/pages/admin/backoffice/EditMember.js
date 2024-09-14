import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../../components/Navbar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditMember = () => {
  const { id } = useParams();

  const [packageTypes, setPackageTypes] = useState([]);
  const [memberData, setMemberData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    mobileNumber: '',
    homeAddress: '',
    aadharNumber: '',
    medicalDetails: false,
    packageType: '',
    startDate: '',
    endDate: '',
    totalPackageFee: '',
    paymentPlanType: '',
    initialPaymentAmount: '',
    initialPaymentDate: '',
    amountDue: '',
    dueDate: '',
    totalPaymentsRemaining: '',
    discount: '',
    finalAmount: ''
  });

  useEffect(() => {
    fetchData();
    fetchPackageTypes();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/members/${id}`);
      if (response.status === 200) {
        const data = response.data;
        setMemberData(data);
      }
    } catch (error) {
      console.error('Error fetching member data:', error);
    }
  };

  const fetchPackageTypes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/packages');
      if (response.status === 200) {
        setPackageTypes(response.data);
      } else {
        throw new Error('Failed to fetch package types');
      }
    } catch (error) {
      console.error('Error fetching package types:', error.message);
    }
  };

  const handlePackageTypeChange = (e) => {
    const selectedPackageId = e.target.value;
    setMemberData((prevData) => {
      const selectedPackage = packageTypes.find(pkg => pkg.id === parseInt(selectedPackageId));
      const totalPackageFee = selectedPackage ? selectedPackage.price : '';
      const discount = prevData.discount || 0;
      const finalAmount = totalPackageFee - discount;
      return {
        ...prevData,
        packageType: selectedPackageId,
        totalPackageFee,
        finalAmount,
        initialPaymentAmount: finalAmount,
        totalPaymentsRemaining: finalAmount - prevData.initialPaymentAmount
      };
    });
  };

  const handleDiscountChange = (e) => {
    const discountAmount = e.target.value;
    setMemberData((prevData) => {
      const finalAmount = prevData.totalPackageFee - discountAmount;
      return {
        ...prevData,
        discount: discountAmount,
        finalAmount,
        totalPaymentsRemaining: finalAmount - prevData.initialPaymentAmount
      };
    });
  };

  const handleInitialPaymentAmountChange = (e) => {
    const amount = e.target.value;
    setMemberData((prevData) => {
      const remaining = prevData.finalAmount - amount;
      return {
        ...prevData,
        initialPaymentAmount: amount,
        totalPaymentsRemaining: remaining
      };
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMemberData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/members/${id}`, memberData);
      toast.success('Member details updated successfully');
    } catch (error) {
      console.error('Error updating member details:', error);
      toast.error('Error updating member details');
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className='container'>
        <div className=" border-bottom border-1">
          <div className="row">
            <div className="col pt-4 pb-2">
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="text-center fw-bold mt-3">Edit Member</h3>
              </div>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='mb-5'>
            <h2 className='panel-title fs-3 mb-3 mt-5'>Personal Details</h2>
            <div className='row mb-3'>
              <div className="col">
                <div className="form-floating">
                  <input type="text" className="form-control form-control-sm" id="firstName" name="firstName" placeholder="First Name" value={memberData.firstName} onChange={handleChange} required />
                  <label htmlFor="firstName">First Name</label>
                </div>
              </div>
              <div className="col">
                <div className="form-floating">
                  <input type="text" className="form-control form-control-sm" id="lastName" name="lastName" placeholder="Last Name" value={memberData.lastName} onChange={handleChange} required />
                  <label htmlFor="lastName">Last Name</label>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <div className="form-floating">
                  <select className="form-select form-select-sm" id="gender" name="gender" value={memberData.gender} onChange={handleChange} required>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <label htmlFor="gender">Gender</label>
                </div>
              </div>
              <div className="col">
                <div className="form-floating">
                  <input type="date" className="form-control form-control-sm" id="dob" name="dob" value={memberData.dob} onChange={handleChange} required />
                  <label htmlFor="dob">Date of Birth</label>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <div className="form-floating">
                  <input type="tel" className="form-control form-control-sm" id="mobileNumber" name="mobileNumber" placeholder="Mobile Number" value={memberData.mobileNumber} onChange={handleChange} required />
                  <label htmlFor="mobileNumber">Mobile Number</label>
                </div>
              </div>
              <div className="col">
                <div className="form-floating">
                  <textarea className="form-control form-control-sm" id="homeAddress" name="homeAddress" placeholder="Home Address" value={memberData.homeAddress} onChange={handleChange} required></textarea>
                  <label htmlFor="homeAddress">Home Address</label>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <div className="form-floating">
                  <input type="text" className="form-control form-control-sm" id="aadharNumber" name="aadharNumber" placeholder="Aadhar Card Number" value={memberData.aadharNumber} onChange={handleChange} required />
                  <label htmlFor="aadharNumber">Aadhar Card Number</label>
                </div>
              </div>
              {/* <div className="col">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="medicalDetails" name="medicalDetails" checked={memberData.medicalDetails} onChange={handleChange} />
                  <label className="form-check-label" htmlFor="medicalDetails">
                    Any medical details?
                  </label>
                </div>
              </div> */}
            </div>

            <h2 className='panel-title fs-3 mb-3 mt-5'>Package Plan</h2>
            <div className="row mb-3">
              <div className="col">
                <div className="form-floating">
                  <select
                    className="form-select form-select-sm"
                    id="packageType"
                    name="packageType"
                    value={memberData.packageType}
                    onChange={handlePackageTypeChange}
                    required
                  >
                    <option value="">Select Package Type</option>
                    {packageTypes.map(pkg => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.packageName} {memberData.packageType === pkg.id && "(Selected)"}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="packageType">Package Type</label>
                </div>
              </div>

              <div className="col">
                <div className="form-floating">
                  <input type="date" className="form-control form-control-sm" id="startDate" name="startDate" value={memberData.startDate} onChange={handleChange} required />
                  <label htmlFor="startDate">Start Date</label>
                </div>
              </div>
            </div>
            <div className="col mb-3">
              <div className="form-floating">
                <input type="date" className="form-control form-control-sm" id="endDate" name="endDate" value={memberData.endDate} onChange={handleChange} required />
                <label htmlFor="endDate">End Date</label>
              </div>
            </div>

            <h2 className='panel-title fs-3 mb-3 mt-5'>Billing Details</h2>
            <div className="row mb-3">
              <div className="col">
                <div className="form-floating">
                  <input type="text" className="form-control form-control-sm" id="totalPackageFee" name="totalPackageFee" placeholder="Total Package Fee" value={memberData.totalPackageFee} readOnly />
                  <label htmlFor="totalPackageFee">Total Package Fee</label>
                </div>
              </div>
              <div className="col">
                <div className="form-floating">
                  <select className="form-select form-select-sm" id="paymentPlanType" name="paymentPlanType" value={memberData.paymentPlanType} onChange={handleChange} required>
                    <option value="">Select Payment Plan</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                  <label htmlFor="paymentPlanType">Payment Plan Type</label>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <div className="form-floating">
                  <input type="text" className="form-control form-control-sm" id="initialPaymentAmount" name="initialPaymentAmount" placeholder="Initial Payment Amount" value={memberData.initialPaymentAmount} onChange={handleInitialPaymentAmountChange} required />
                  <label htmlFor="initialPaymentAmount">Initial Payment Amount</label>
                </div>
              </div>
              <div className="col">
                <div className="form-floating">
                  <input type="date" className="form-control form-control-sm" id="initialPaymentDate" name="initialPaymentDate" value={memberData.initialPaymentDate} onChange={handleChange} required />
                  <label htmlFor="initialPaymentDate">Initial Payment Date</label>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <div className="form-floating">
                  <input type="text" className="form-control form-control-sm" id="amountDue" name="amountDue" placeholder="Amount Due" value={memberData.amountDue} onChange={handleChange} required />
                  <label htmlFor="amountDue">Amount Due</label>
                </div>
              </div>
              <div className="col">
                <div className="form-floating">
                  <input type="date" className="form-control form-control-sm" id="dueDate" name="dueDate" value={memberData.dueDate} onChange={handleChange} required />
                  <label htmlFor="dueDate">Due Date</label>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <div className="form-floating">
                  <input type="text" className="form-control form-control-sm" id="totalPaymentsRemaining" name="totalPaymentsRemaining" placeholder="Total Payments Remaining" value={memberData.totalPaymentsRemaining} readOnly />
                  <label htmlFor="totalPaymentsRemaining">Total Payments Remaining</label>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <div className="form-floating">
                  <input type="number" className="form-control form-control-sm" id="discount" name="discount" placeholder="Discount (%)" value={memberData.discount} onChange={handleDiscountChange} required />
                  <label htmlFor="discount">Discount (%)</label>
                </div>
              </div>
              <div className="col">
                <div className="form-floating">
                  <input type="text" className="form-control form-control-sm" id="finalAmount" name="finalAmount" placeholder="Final Amount" value={memberData.finalAmount} readOnly />
                  <label htmlFor="finalAmount">Final Amount</label>
                </div>
              </div>
            </div>
          </div>

          <div className="form-group text-end">
            <button type="submit" id="submit_btn" className="btn btn-md btn-dark">Save Record</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditMember;
