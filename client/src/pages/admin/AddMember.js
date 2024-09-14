import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css';

function AddMember() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [medicalDetails, setMedicalDetails] = useState('');

  const [packageTypes, setPackageTypes] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedPackageId, setSelectedPackageId] = useState('');
  const [totalPackageFee, setTotalPackageFee] = useState('');

  const [paymentPlanType, setPaymentPlanType] = useState('');
  const [initialPaymentAmount, setInitialPaymentAmount] = useState('');
  const [initialPaymentDate, setInitialPaymentDate] = useState('');
  const [amountDue, setAmountDue] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [totalPaymentsRemaining, setTotalPaymentsRemaining] = useState('');
  const [discount, setDiscount] = useState('');
  const [finalAmount, setFinalAmount] = useState('');

  useEffect(() => {
    fetchPackageTypes();
  }, []);

  const fetchPackageTypes = async () => {
    try {
      const response = await fetch('http://localhost:3001/packages');
      if (response.ok) {
        const data = await response.json();
        setPackageTypes(data);
      } else {
        throw new Error('Failed to fetch package types');
      }
    } catch (error) {
      console.error('Error fetching package types:', error.message);
    }
  };

  const handlePackageTypeChange = (e) => {
    const selectedPackageId = e.target.value;
    setSelectedPackageId(selectedPackageId);
    const selectedPackage = packageTypes.find(pkg => pkg.id === parseInt(selectedPackageId));
    if (selectedPackage) {
      setTotalPackageFee(selectedPackage.price);
      calculateFinalAmount(selectedPackage.price, discount);
    }
  };

  const handleDiscountChange = (e) => {
    const discountAmount = e.target.value;
    setDiscount(discountAmount);
    calculateFinalAmount(totalPackageFee, discountAmount);
  };

  const calculateFinalAmount = (packagePrice, discountAmount) => {
    const finalAmount = packagePrice - discountAmount;
    setFinalAmount(finalAmount);
    // Assuming initialPaymentAmount is same as finalAmount initially
    setInitialPaymentAmount(finalAmount);
    // Calculate remaining amount after initial payment
    const remaining = finalAmount - initialPaymentAmount;
    setTotalPaymentsRemaining(remaining);
  };

  const handleInitialPaymentAmountChange = (e) => {
    const amount = e.target.value;
    setInitialPaymentAmount(amount);
    const remaining = finalAmount - amount;
    setTotalPaymentsRemaining(remaining);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/members', {
        firstName,
        lastName,
        gender,
        dob,
        mobileNumber,
        homeAddress,
        aadharNumber,
        medicalDetails,
        packageType: parseInt(selectedPackageId),
        startDate,
        endDate,
        totalPackageFee,
        paymentPlanType,
        initialPaymentAmount,
        initialPaymentDate,
        amountDue,
        dueDate,
        totalPaymentsRemaining,
        discount,
        finalAmount,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        toast.success('Member added successfully!');
        // Clear form fields
        setFirstName('');
        setLastName('');
        setGender('');
        setDob('');
        setMobileNumber('');
        setHomeAddress('');
        setAadharNumber('');
        setMedicalDetails('');
        setSelectedPackageId('');
        setTotalPackageFee('');
        setPaymentPlanType('');
        setInitialPaymentAmount('');
        setInitialPaymentDate('');
        setAmountDue('');
        setDueDate('');
        setTotalPaymentsRemaining('');
        setDiscount('');
        setFinalAmount('');
      }
    } catch (error) {
      toast.error('Error submitting form data');
      console.error('Error submitting form data:', error);
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
                <h3 className="text-center fw-bold mt-3">Add New Member</h3>
                <a className='btn btn-dark fw-bold btn-md' href='/admin/allmembers'>Go to Members List</a>
              </div>
            </div>
          </div>
        </div>
        <div className='d-flex justify-content-center align-items-center mt-5'>
          <div className="col-md-8 border p-5 rounded">
            <form onSubmit={handleSubmit}>
              <div className='mb-5'>
                <h2 className='panel-title fs-3 mb-3 mt-5'>Personal Details</h2>
                <div className='row mb-3'>
                  <div className="col">
                    <div className="form-floating">
                      <input type="text" className="form-control form-control-sm" id="firstName" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                      <label htmlFor="firstName">First Name</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating">
                      <input type="text" className="form-control form-control-sm" id="lastName" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                      <label htmlFor="lastName">Last Name</label>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <div className="form-floating">
                      <select className="form-select form-select-sm" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} required>
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
                      <input type="date" className="form-control form-control-sm" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} required />
                      <label htmlFor="dob">Date of Birth</label>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <div className="form-floating">
                      <input
                        type="tel"
                        className="form-control form-control-sm"
                        id="mobileNumber"
                        placeholder="Mobile Number"
                        value={mobileNumber}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value.length <= 10 && /^\d*$/.test(value)) {
                            setMobileNumber(value);
                          }
                        }}
                        required
                      />
                      <label htmlFor="mobileNumber">Mobile Number</label>
                      <small className="form-text text-muted">
                        Mobile number must be exactly 10 digits long.
                      </small>
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-floating">
                      <textarea className="form-control form-control-sm" id="homeAddress" placeholder="Home Address" value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)} required></textarea>
                      <label htmlFor="homeAddress">Home Address</label>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="aadharNumber"
                        placeholder="Aadhar Card Number"
                        value={aadharNumber}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value.length <= 12 && /^\d*$/.test(value)) {
                            setAadharNumber(value);
                          }
                        }}
                        required
                      />
                      <label htmlFor="aadharNumber">Aadhar Card Number</label>
                      <small className="form-text text-muted">
                        Aadhar number must be exactly 12 digits long.
                      </small>
                    </div>
                  </div>

                  {/* <div className="col">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="medicalDetails" value={medicalDetails} onChange={(e) => setMedicalDetails(e.target.checked)} />
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
                        id="packagetype"
                        onChange={handlePackageTypeChange}
                        required
                      >
                        <option value="">Select Package Type</option>
                        {packageTypes.map(pkg => (
                          <option key={pkg.id} value={pkg.id}>
                            {pkg.packageName} {packageTypes === pkg.id && "(Selected)"}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="packagetype">Package Type</label>
                    </div>



                  </div>

                  <div className="col">
                    <div className="form-floating">
                      <input type="date" className="form-control form-control-sm" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                      <label htmlFor="startDate">Start Date</label>
                    </div>
                  </div>
                </div>
                <div className="col mb-3">
                  <div className="form-floating">
                    <input type="date" className="form-control form-control-sm" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                    <label htmlFor="endDate">End Date</label>
                  </div>
                </div>


                <h2 className='panel-title fs-3 mb-3 mt-5'>Billing Details</h2>
                <div className="row mb-3">
                  <div className="col">
                    <div className="form-floating">
                      <input type="text" className="form-control form-control-sm" id="totalPackageFee" placeholder="Total Package Fee" value={totalPackageFee} readOnly />
                      <label htmlFor="totalPackageFee">Total Package Fee</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating">
                      <select className="form-select form-select-sm" id="paymentPlanType" value={paymentPlanType} onChange={(e) => setPaymentPlanType(e.target.value)} required>
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
                      <input type="text" className="form-control form-control-sm" id="initialPaymentAmount" placeholder="Initial Payment Amount" value={initialPaymentAmount} onChange={handleInitialPaymentAmountChange} required />
                      <label htmlFor="initialPaymentAmount">Initial Payment Amount</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating">
                      <input type="date" className="form-control form-control-sm" id="initialPaymentDate" value={initialPaymentDate} onChange={(e) => setInitialPaymentDate(e.target.value)} required />
                      <label htmlFor="initialPaymentDate">Initial Payment Date</label>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <div className="form-floating">
                      <input type="text" className="form-control form-control-sm" id="amountDue" placeholder="Amount Due" value={amountDue} onChange={(e) => setAmountDue(e.target.value)} required />
                      <label htmlFor="amountDue">Amount Due</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating">
                      <input type="date" className="form-control form-control-sm" id="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
                      <label htmlFor="dueDate">Due Date</label>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <div className="form-floating">
                      <input type="text" className="form-control form-control-sm" id="totalPaymentsRemaining" placeholder="Total Payments Remaining" value={totalPaymentsRemaining} readOnly />
                      <label htmlFor="totalPaymentsRemaining">Total Payments Remaining</label>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <div className="form-floating">
                      <input type="number" className="form-control form-control-sm" id="discount" placeholder="Discount (%)" value={discount} onChange={handleDiscountChange} required />
                      <label htmlFor="discount">Discount (%)</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating">
                      <input type="text" className="form-control form-control-sm" id="finalAmount" placeholder="Final Amount" value={finalAmount} readOnly />
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
        </div>
      </div >
      <ToastContainer />
    </>
  );
}

export default AddMember;
