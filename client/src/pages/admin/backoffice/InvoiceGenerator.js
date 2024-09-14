import React, { useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../../../components/Navbar';

const InvoiceGenerator = () => {
  const [customerName, setCustomerName] = useState('');
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [invoiceData, setInvoiceData] = useState(null);

  const handleGenerateInvoice = async (e) => {
    e.preventDefault();
    const invoice = { customerName, amount, description };

    try {
      const response = await axios.post('http://localhost:3001/invoices', invoice);
      setInvoiceData(response.data);
    } catch (error) {
      console.error('Error generating invoice:', error);
    }
  };

  const handleDownloadPDF = () => {
    if (!invoiceData) return;

    const { customerName, amount, description } = invoiceData;
    const doc = new jsPDF();
    doc.text(`Invoice for ${customerName}`, 10, 10);
    doc.text(`Amount: ${amount}`, 10, 20);
    doc.text(`Description: ${description}`, 10, 30);
    doc.save(`${customerName}_invoice.pdf`);
  };

  return (
    <>
    <Navbar />
    <div className="container mt-0 d-flex justify-content-center align-items-center mt-5">

<div className="container">
  <h1 className="text-center mb-4">Invoice Generator</h1>
  <div className="row justify-content-center">
    <div className="col-md-8">
      <div className="card">
        <h5 className="card-header">Enter Invoice Details</h5>
        <div className="card-body">
          <form onSubmit={handleGenerateInvoice}>
            <div className="form-group">
              <label htmlFor="customerName">Customer Name:</label>
              <input
                type="text"
                className="form-control"
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="amount">Amount:</label>
              <input
                type="number"
                className="form-control"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-warning mr-2 mt-4">
              Generate Invoice
            </button>
          </form>
        </div>
      </div>
    </div>
    {invoiceData && (
      <div className="col-md-8 mt-4 mb-3">
        <div className="card">
          <h5 className="card-header">Invoice Details</h5>
          <div className="card-body">
            <p className="card-text">
              <strong>Customer Name:</strong> {invoiceData.customerName}
            </p>
            <p className="card-text">
              <strong>Amount:</strong> {invoiceData.amount}
            </p>
            <p className="card-text">
              <strong>Description:</strong> {invoiceData.description}
            </p>
            <button onClick={handleDownloadPDF} className="btn btn-success">
              <FontAwesomeIcon icon={faDownload} className="mr-2" /> Download PDF
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
</div>
</div>
    </>
  
  );
};

export default InvoiceGenerator;
