const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL Connection
const db = mysql.createConnection(config.mysql);

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
  createPackagesTable();
  createMembersTable();
});

// Create Packages table if not exists
function createPackagesTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS packages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      packageName VARCHAR(255) NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      duration VARCHAR(50) NOT NULL
    )
  `;
  db.query(query, (err, result) => {
    if (err) {
      throw err;
    }
    console.log('Packages table created or already exists');
  });
}

function createMembersTable() {
  const checkTableQuery = 'SHOW TABLES LIKE "members"';
  db.query(checkTableQuery, (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length === 0) {
      const createQuery = `
        CREATE TABLE members (
          id INT AUTO_INCREMENT PRIMARY KEY,
          firstName VARCHAR(255),
          lastName VARCHAR(255),
          gender ENUM('male', 'female', 'other'),
          dob DATE,
          mobileNumber VARCHAR(20),
          homeAddress TEXT,
          aadharNumber VARCHAR(20),
          medicalDetails TEXT,
          packageType INT,
          startDate DATE,
          endDate DATE,
          totalPackageFee DECIMAL(10, 2),
          paymentPlanType ENUM('monthly', 'quarterly', 'yearly'),
          initialPaymentAmount DECIMAL(10, 2),
          initialPaymentDate DATE,
          amountDue DECIMAL(10, 2),
          dueDate DATE,
          totalPaymentsRemaining DECIMAL(10, 2),
          discount DECIMAL(5, 2),
          finalAmount DECIMAL(10, 2)
        );
      `;
      db.query(createQuery, (createErr, createResult) => {
        if (createErr) {
          throw createErr;
        }
        console.log('Members table created');
      });
    } else {
      console.log('Members table already exists');
    }
  });
}

// Add a member
app.post('/members', (req, res) => {
  const {
    firstName,
    lastName,
    gender,
    dob,
    mobileNumber,
    homeAddress,
    aadharNumber,
    medicalDetails,
    packageType,
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
    finalAmount
  } = req.body;

  const query = `
    INSERT INTO members (
      firstName,
      lastName,
      gender,
      dob,
      mobileNumber,
      homeAddress,
      aadharNumber,
      medicalDetails,
      packageType,
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
      finalAmount
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      firstName,
      lastName,
      gender,
      dob,
      mobileNumber,
      homeAddress,
      aadharNumber,
      medicalDetails,
      packageType,
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
      finalAmount
    ],
    (error, results) => {
      if (error) {
        console.error('Error inserting member data:', error);
        res.status(500).json({ error: 'Failed to insert member data' });
        return;
      }
      console.log('Member data inserted successfully');
      res.json({ success: true });
    }
  );
});

// Get all members
app.get('/members', (req, res) => {
  // Define the SQL query to select all members
  const query = 'SELECT * FROM members';

  // Execute the query
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching member data:', error);
      res.status(500).json({ error: 'Failed to fetch member data' });
      return;
    }
    console.log('Member data fetched successfully');
    res.json(results); // Send the fetched member data as JSON response
  });
});

// Get member by ID
app.get('/members/:id', (req, res) => {
  const memberId = req.params.id;
  const query = 'SELECT * FROM members WHERE id = ?';
  db.query(query, [memberId], (error, results) => {
    if (error) {
      console.error('Error fetching member:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Member not found' });
      return;
    }
    res.json(results[0]);
  });
});

app.put('/members/:id', (req, res) => {
  const memberId = req.params.id;
  const memberData = req.body;

  const query = 'UPDATE members SET firstName = ?, lastName = ?, gender = ?, dob = ?, mobileNumber = ?, homeAddress = ?, aadharNumber = ?, medicalDetails = ?, packageType = ?, startDate = ?, endDate = ?, totalPackageFee = ?, paymentPlanType = ?, initialPaymentAmount = ?, initialPaymentDate = ?, amountDue = ?, dueDate = ?, totalPaymentsRemaining = ?, discount = ?, finalAmount = ? WHERE id = ?';

  const values = [
    memberData.firstName,
    memberData.lastName,
    memberData.gender,
    memberData.dob,
    memberData.mobileNumber,
    memberData.homeAddress,
    memberData.aadharNumber,
    memberData.medicalDetails,
    memberData.packageType,
    memberData.startDate,
    memberData.endDate,
    memberData.totalPackageFee,
    memberData.paymentPlanType,
    memberData.initialPaymentAmount,
    memberData.initialPaymentDate,
    memberData.amountDue,
    memberData.dueDate,
    memberData.totalPaymentsRemaining,
    memberData.discount,
    memberData.finalAmount,
    memberId
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating member:', err);
      res.status(500).json({ error: 'Error updating member' });
    } else {
      res.status(200).json({ message: 'Member updated successfully' });
    }
  });
});

// Delete a member
app.delete('/members/:id', (req, res) => {
  const memberId = req.params.id;
  const query = 'DELETE FROM members WHERE id = ?';

  db.query(query, [memberId], (error, results) => {
    if (error) {
      console.error('Error deleting member:', error);
      res.status(500).json({ error: 'Failed to delete member' });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Member not found' });
      return;
    }
    res.json({ success: true, message: 'Member deleted successfully' });
  });
});


// Create a package
app.post('/packages', (req, res) => {
  const { packageName, price, duration } = req.body;
  const query = 'INSERT INTO packages (packageName, price, duration) VALUES (?, ?, ?)';
  db.query(query, [packageName, price, duration], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error creating package' });
    } else {
      res.status(201).json({ message: 'Package created successfully' });
    }
  });
});

// Get all packages
app.get('/packages', (req, res) => {
  const query = 'SELECT * FROM packages';
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching packages' });
    } else {
      res.status(200).json(result);
    }
  });
});

app.get('/packages/:id', (req, res) => {
  const { id } = req.params; // Extract package ID from URL parameters
  const query = 'SELECT * FROM packages WHERE id = ?'; // Query to fetch package by ID
  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching package' });
    } else {
      if (result.length === 0) {
        res.status(404).json({ error: 'Package not found' });
      } else {
        res.status(200).json(result[0]); // Send the first (and only) result as JSON
      }
    }
  });
});

// Update a package
app.put('/packages/:id', (req, res) => {
  const { id } = req.params;
  const { packageName, price, duration } = req.body;
  const query = 'UPDATE packages SET packageName = ?, price = ?, duration = ? WHERE id = ?';
  db.query(query, [packageName, price, duration, id], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error updating package' });
    } else {
      res.status(200).json({ message: 'Package updated successfully' });
    }
  });
});

// Delete a package
app.delete('/packages/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM packages WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error deleting package' });
    } else {
      res.status(200).json({ message: 'Package deleted successfully' });
    }
  });
});


app.get('/renewals', (req, res) => {
  const query = `
    SELECT * FROM members 
    WHERE dueDate BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 5 DAY)
  `;
  
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching renewal data:', error);
      res.status(500).json({ error: 'Failed to fetch renewal data' });
      return;
    }
    res.json(results);
  });
});

// Total Members API
app.get('/total-members', (req, res) => {
  const query = 'SELECT COUNT(*) AS totalMembers FROM members';

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching total members:', error);
      res.status(500).json({ error: 'Failed to fetch total members' });
      return;
    }

    const totalMembers = results[0].totalMembers;
    res.json({ totalMembers });
  });
});

// Total Renewals API
app.get('/total-renewals', (req, res) => {
  const query = `
    SELECT COUNT(*) AS totalRenewals FROM members 
    WHERE dueDate BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 5 DAY)
  `;
  
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching total renewals:', error);
      res.status(500).json({ error: 'Failed to fetch total renewals' });
      return;
    }

    const totalRenewals = results[0].totalRenewals;
    res.json({ totalRenewals });
  });
});

// Total Amount Dues API
app.get('/total-amount-dues', (req, res) => {
  const query = 'SELECT SUM(amountDue) AS totalAmountDues FROM members';

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching total amount dues:', error);
      res.status(500).json({ error: 'Failed to fetch total amount dues' });
      return;
    }

    const totalAmountDues = results[0].totalAmountDues || 0;
    res.json({ totalAmountDues });
  });
});

// Total Amount Paid API
app.get('/total-amount-paid', (req, res) => {
  const query = 'SELECT SUM(finalAmount) AS totalAmountPaid FROM members';

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching total amount paid:', error);
      res.status(500).json({ error: 'Failed to fetch total amount paid' });
      return;
    }

    const totalAmountPaid = results[0].totalAmountPaid || 0;
    res.json({ totalAmountPaid });
  });
});

// Sample in-memory storage for invoices (replace with database in production)
let invoices = [];

// Endpoint to create a new invoice
app.post('/invoices', (req, res) => {
  const { customerName, amount, description } = req.body;
  const newInvoice = {
    id: uuidv4(), // Generate unique ID for the invoice
    customerName,
    amount,
    description,
    createdAt: new Date() // Timestamp for when the invoice was created
  };

  invoices.push(newInvoice);
  res.status(201).json(newInvoice);
});

// Endpoint to fetch all invoices
app.get('/invoices', (req, res) => {
  res.json(invoices);
});

// Endpoint to fetch a specific invoice by ID
app.get('/invoices/:id', (req, res) => {
  const { id } = req.params;
  const invoice = invoices.find(inv => inv.id === id);

  if (!invoice) {
    res.status(404).json({ error: 'Invoice not found' });
    return;
  }

  res.json(invoice);
});




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
