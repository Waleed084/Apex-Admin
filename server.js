// server.js (or index.js)
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');

const app = express();
const PORT = 4000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://kamran123:yDW7yklOOCuVd6nd@serverlessinstance0.28e8a8n.mongodb.net/RootData?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Event listener for successful connection
mongoose.connection.on('connected', () => {
  console.log('Connected to the database');
});

// Event listener for connection errors
mongoose.connection.on('error', (err) => {
  console.error(`Database connection error: ${err}`);
});

// Event listener for disconnected state
mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from the database');
});

// Close the Mongoose connection if the Node process ends
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose connection disconnected through app termination');
    process.exit(0);
  });
});


// Define MongoDB Schema and Model
const sleighSchema = new mongoose.Schema({
  submissionDate: {
    type: Date,
    required: true
  },
  Type: {
    type: String,
    required: true
  },
  status:{
    type: String,
    required: true
  },
  Seller:{
    type: String,
    required: true
  },
  route: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  Color: {
    type: String,
    required: true
  },
  HeadBoard: {
    type: String,
    required: true
  },
  mattress: {
    type: String,
    required: true
  },
  ottoman: {
    type: String,
    required: true
  },
  Glift: {
    type: String,
    required: true
  },
  threeD: {
    type: String,
    required: true
  },
  totalPrice: {
    type: String,
    required: true
  },
  customerDetails: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  },
  remarks: {
    type: String,
    required: true
  },
  sprice: {
    type: String,
    required: true
  },
  profit: {
    type: String,
    required: true
  }
});


const SleighModel = mongoose.model('SleighModel', sleighSchema);

const DevanSchema = new mongoose.Schema({
  submissionDate: {
    type: Date,
    default: Date.now
  },
  Type: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  Seller: {
    type: String,
    required: true
  },
  route: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  Color: {
    type: String,
    required: true
  },
  HeadBoard: {
    type: String,
    required: true
  },
  mattress: {
    type: String,
    required: true
  },
  Set: {
    type: String,
    required: true
  },
  assembly: {
    type: String,
    required: true
  },
  siplet: {
    type: String,
    required: true
  },
  threeD: {
    type: String,
    required: true
  },
  totalPrice: {
    type: String,
    required: true
  },
  customerDetails: {
    type: String,
    required: true
  },
  sprice: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  },
  remarks: {
    type: String,
    required: true
  },
  profit: {
    type: String,
    required: true
  }
});
const DevanModel = mongoose.model('DevanModel', DevanSchema); // Create a Mongoose model

const MattressSchema = new mongoose.Schema({
  submissionDate: {
    type: Date,
    required: true
  },
  Type: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  Seller: {
    type: String,
    required: true
  },
  route: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  mattress: {
    type: String,
    required: true
  },
  totalPrice: {
    type: String,
    required: true
  },
  Company: {
    type: String,
    required: true
  },
  customerDetails: {
    type: String,
    required: true
  },
  sprice: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  },
  remarks: {
    type: String
  },
  profit: {
    type: String,
    required: true
  }
});

const MattressModel = mongoose.model('MattressModel', MattressSchema); // Create a Mongoose model


app.use(cors());
app.use(express.json());
let server;

// Define a route to stop the server intentionally
app.get('/stop-server', (req, res) => {
  console.log('Stopping the server intentionally.');
  res.send('Server is stopping intentionally.');

  // Perform any necessary cleanup or tasks before stopping the server
  // ...

  // Close the server after a short delay (for demonstration purposes)
  setTimeout(() => {
    server.close(() => {
      console.log('Server stopped.');
      process.exit(0);
    });
  }, 2000);
});

// API Endpoint to Get All Data Submitted-Sleigh
app.get('/api/submissions/all-sleigh', async (req, res) => {
  try {
    const submissions = await SleighModel.find();
    res.json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API Endpoint to Get All Data Submitted-Devan
app.get('/api/submissions/all-devan', async (req, res) => {
  try {
    const submissions = await DevanModel.find();
    res.json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API Endpoint to Get All Data Submitted-Mattress
app.get('/api/submissions/all-mattress', async (req, res) => {
  try {
    const submissions = await MattressModel.find();
    res.json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API Endpoint to Get Data Submitted Today
app.get('/api/submissions/today-sleigh', async (req, res) => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  try {
    const submissions = await SleighModel.find({
      submissionDate: { $gte: todayStart, $lte: todayEnd },
    });
    res.json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/submissions/today-devan', async (req, res) => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  try {
    const submissions = await DevanModel.find({
      submissionDate: { $gte: todayStart, $lte: todayEnd },
    });
    res.json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/submissions/today-mattress', async (req, res) => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  try {
    const submissions = await MattressModel.find({
      submissionDate: { $gte: todayStart, $lte: todayEnd },
    });
    res.json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// ... (your existing imports and configurations)

// API Endpoint to Get Orders Submitted This Month


app.get('/api/submissions/this-month-sleigh', async (req, res) => {
  const currentMonthStart = new Date();
  currentMonthStart.setDate(1);
  currentMonthStart.setHours(0, 0, 0, 0);
  const nextMonthStart = new Date();
  nextMonthStart.setMonth(nextMonthStart.getMonth() + 1);
  nextMonthStart.setDate(1);
  nextMonthStart.setHours(0, 0, 0, 0);

  try {
    const submissions = await SleighModel.find({
      submissionDate: { $gte: currentMonthStart, $lt: nextMonthStart },
    });
    res.json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// ... Devan

app.get('/api/submissions/this-month-devan', async (req, res) => {
  const currentMonthStart = new Date();
  currentMonthStart.setDate(1);
  currentMonthStart.setHours(0, 0, 0, 0);
  const nextMonthStart = new Date();
  nextMonthStart.setMonth(nextMonthStart.getMonth() + 1);
  nextMonthStart.setDate(1);
  nextMonthStart.setHours(0, 0, 0, 0);

  try {
    const submissions = await DevanModel.find({
      submissionDate: { $gte: currentMonthStart, $lt: nextMonthStart },
    });
    res.json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/submissions/this-month-mattress', async (req, res) => {
  const currentMonthStart = new Date();
  currentMonthStart.setDate(1);
  currentMonthStart.setHours(0, 0, 0, 0);
  const nextMonthStart = new Date();
  nextMonthStart.setMonth(nextMonthStart.getMonth() + 1);
  nextMonthStart.setDate(1);
  nextMonthStart.setHours(0, 0, 0, 0);

  try {
    const submissions = await MattressModel.find({
      submissionDate: { $gte: currentMonthStart, $lt: nextMonthStart },
    });
    res.json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// .Status Update-devan
app.put('/api/submissions/update-status-devan', async (req, res) => {
  const { orders, status } = req.body;

  try {
    // Use Mongoose to update the status of submissions based on order IDs
    await DevanModel.updateMany(
      { _id: { $in: orders } }, // Update documents where _id is in the orders array
      { $set: { status } } // Set the new status
    );

    res.status(200).json({ message: 'Status updated successfully' });
  } catch (error) {
    // Handle error (e.g., send an error response)
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// .Status Update-sleigh
app.put('/api/submissions/update-status-sleigh', async (req, res) => {
  const { orders, status } = req.body;

  try {
    // Use Mongoose to update the status of submissions based on order IDs
    await SleighModel.updateMany(
      { _id: { $in: orders } }, // Update documents where _id is in the orders array
      { $set: { status } } // Set the new status
    );

    res.status(200).json({ message: 'Status updated successfully' });
  } catch (error) {
    // Handle error (e.g., send an error response)
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// .Status Update-Mattress
app.put('/api/submissions/update-status-mattress', async (req, res) => {
  const { orders, status } = req.body;

  try {
    // Use Mongoose to update the status of submissions based on order IDs
    await MattressModel.updateMany(
      { _id: { $in: orders } }, // Update documents where _id is in the orders array
      { $set: { status } } // Set the new status
    );

    res.status(200).json({ message: 'Status updated successfully' });
  } catch (error) {
    // Handle error (e.g., send an error response)
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Search Results
// Add the following code to your server.js or app.js

app.get('/api/submissions/search-by-postal-code-Sleigh', async (req, res) => {
  const searchQuery = req.query.query;

  try {
    const submissions = await SleighModel.find({
      postalCode: { $regex: new RegExp(searchQuery, 'i') }, // Case-insensitive search
    });
    res.json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/submissions/search-by-postal-code-Devan', async (req, res) => {
  const searchQuery = req.query.query;

  try {
    const submissions = await DevanModel.find({
      postalCode: { $regex: new RegExp(searchQuery, 'i') }, // Case-insensitive search
    });
    res.json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/submissions/search-by-postal-code-Mattress', async (req, res) => {
  const searchQuery = req.query.query;

  try {
    const submissions = await MattressModel.find({
      postalCode: { $regex: new RegExp(searchQuery, 'i') }, // Case-insensitive search
    });
    res.json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const AdminSchema = new mongoose.Schema({
  sellerPin: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const Admin = mongoose.model('Admin', AdminSchema); // Create a Mongoose model
// ...

app.post('/api/authenticate', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Please provide both username and password.' });
  }

  

  try {
    const user = await Admin.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Authentication failed. Please check your credentials.' });
    }

    // Check if the provided password matches the stored password
    if (password === user.password) {
      return res.status(200).json({ message: 'Authentication successful.' });
    } 
      return res.status(401).json({ error: 'Authentication failed. Please check your credentials.' });
    
  } catch (error) {
    console.error('Error during authentication:', error);
    return res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
  }
});
// ... (rest of your existing code)
// Define user schema
const userSchema = new mongoose.Schema({
  username: String,
  cnicNumber: String,
  accountNumber: String,
  bankName: String,
  password: String
});

const User = mongoose.model('User', userSchema);

// API endpoint to get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Route to get number of documents in User collection
app.get('/api/users/count', async (req, res) => {
  try {
      const count = await User.countDocuments();
      res.json({ count });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
  }
});

// Route to fetch booked orders from DevanModel
app.get('/api/devan/booked', async (req, res) => {
  const currentMonthStart = new Date();
  currentMonthStart.setDate(1);
  currentMonthStart.setHours(0, 0, 0, 0);
  const nextMonthStart = new Date();
  nextMonthStart.setMonth(nextMonthStart.getMonth() + 1);
  nextMonthStart.setDate(1);
  nextMonthStart.setHours(0, 0, 0, 0);
  try {
      const bookedOrders = await DevanModel.find({
        status: 'Booked',
        submissionDate: { $gte: currentMonthStart, $lt: nextMonthStart },
     });
      res.json(bookedOrders);
  } catch (error) {
      console.error('Error fetching booked orders from DevanModel:', error);
      res.status(500).json({ message: 'Server Error' });
  }
});

// Route to fetch booked orders from SleighModel
app.get('/api/sleigh/booked', async (req, res) => {
  const currentMonthStart = new Date();
  currentMonthStart.setDate(1);
  currentMonthStart.setHours(0, 0, 0, 0);
  const nextMonthStart = new Date();
  nextMonthStart.setMonth(nextMonthStart.getMonth() + 1);
  nextMonthStart.setDate(1);
  nextMonthStart.setHours(0, 0, 0, 0);
  try {
      const bookedOrders = await SleighModel.find({
        status: 'Booked',
        submissionDate: { $gte: currentMonthStart, $lt: nextMonthStart },
      });
      res.json(bookedOrders);
  } catch (error) {
      console.error('Error fetching booked orders from SleighModel:', error);
      res.status(500).json({ message: 'Server Error' });
  }
});
const documentSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  size: Number,
  content: Buffer, // Store file content as a Buffer
  // Define other fields as needed
});

const DocumentModel = mongoose.model('Document', documentSchema);

// Set up multer for file uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

// Route for file upload
// eslint-disable-next-line consistent-return
app.post('/api/upload', upload.single('files'), async (req, res) => {
  try {
    const { file } = req;

    // Ensure file was provided in the request
    if (!file) {
      return res.status(400).json({ error: 'No file was provided for upload.' });
    }

    // Create a new document instance
    const newDocument = new DocumentModel({
      filename: file.originalname,
      contentType: file.mimetype,
      size: file.size,
      content: file.buffer, // Store file content as Buffer
    });

    // Save the document to MongoDB
    const savedDocument = await newDocument.save();

    res.status(200).json({ message: 'File uploaded successfully', document: savedDocument });
  } catch (err) {
    console.error('Error uploading file:', err);
    res.status(500).json({ error: 'Error uploading file. Please try again.' });
  }
});

// Fetch all sellers
app.get('/api/sellers', async (req, res) => {
  try {
    const sellers = await User.find({}, 'username');
    res.json(sellers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch orders for a specific seller
const moment = require('moment');

app.get('/api/orders/:username', async (req, res) => {
  const { username } = req.params;
  try {

    // Find sleigh orders with status "Booked" and placed in the current month
    const sleighOrders = await SleighModel.find({
      Seller: username,
      status: 'Booked',
      submissionDate: {
        $gte: moment().startOf('month').toDate(), // Start of the current month
        $lte: moment().endOf('month').toDate() // End of the current month
      }
    }, 'sprice');

    // Find devan orders with status "Booked" and placed in the current month
    const devanOrders = await DevanModel.find({
      Seller: username,
      status: 'Booked',
      submissionDate: {
        $gte: moment().startOf('month').toDate(), // Start of the current month
        $lte: moment().endOf('month').toDate() // End of the current month
      }
    }, 'sprice');

    // Combine sleigh and devan orders
    const orders = [...sleighOrders, ...devanOrders].map(order => ({
      sprice: parseFloat(order.sprice)
    }));

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Define Commission model
const commissionSchema = new mongoose.Schema({
  username: String,
  commissionAmount: Number,
});
const Commission = mongoose.model('Commission', commissionSchema);

// Save commission
app.post('/api/commissions', async (req, res) => {
  const { username, commissionAmount } = req.body;
  try {
    const commissionData = new Commission({ username, commissionAmount });
    await commissionData.save();
    res.status(201).json({ message: 'Commission saved successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Middleware to handle error
const errorHandler = (err, res) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
};

app.get('/api/ordersystem/:orderType/:timeRange', async (req, res) => {
  const { orderType, timeRange } = req.params;

  try {
    let startDate;
    let endDate;

    // Set start and end dates based on time range
    switch (timeRange) {
      case 'weekly':
        startDate = moment().startOf('week');
        endDate = moment().endOf('week');
        break;
      case 'monthly':
        startDate = moment().startOf('month');
        endDate = moment().endOf('month');
        break;
      default: // 'all'
        startDate = null;
        endDate = null;
        break;
    }

    let orders;

    // Fetch orders based on order type
    switch (orderType) {
      case 'divan':
        orders = await DevanModel.find({
          ...(startDate && endDate && { submissionDate: { $gte: startDate, $lte: endDate } })
        });
        break;
      case 'sleigh':
        orders = await SleighModel.find({
          ...(startDate && endDate && { submissionDate: { $gte: startDate, $lte: endDate } })
        });
        break;
      case 'mattress':
        orders = await MattressModel.find({
          ...(startDate && endDate && { submissionDate: { $gte: startDate, $lte: endDate } })
        });
        break;
      default:
        return res.status(400).json({ error: 'Invalid order type' });
    }

    return res.json(orders);
  } catch (error) {
    return errorHandler(error, res);
  }
});

// API endpoint to handle updating a Devan order
// API endpoint to handle updating a Devan order
app.post('/api/commission/devan/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { ...update } = req.body; // Exclude Type and Seller from updates

    // Find the order by ID and update it
    const updatedOrder = await DevanModel.findByIdAndUpdate(id, update, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    return res.json(updatedOrder); // Return the updated order
  } catch (error) {
    console.error('Error updating order:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get all documents
app.get('/api/files', async (req, res) => {
  try {
    // Assuming you have a Document model defined in your backend
    const files = await DocumentModel.find(); // Retrieve files from your database
    res.status(200).json({ files });
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ error: 'Error fetching files' });
  }
});

// eslint-disable-next-line consistent-return
app.get('/api/download/:fileId', async (req, res) => {
  const { fileId } = req.params;

  try {
    // Retrieve the document from the database
    const document = await DocumentModel.findById(fileId);

    if (!document) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Set the content type header based on the document's content type
    res.setHeader('Content-Type', document.contentType);

    // Set the content-disposition header to force download
    res.setHeader('Content-Disposition', `attachment; filename=${document.filename}`);

    // Stream the binary content of the document to the client
    res.send(document.content);

    // Do not send any more responses or modify headers after sending the document content
  } catch (error) {
    console.error('Error fetching file:', error);
    return res.status(500).json({ error: 'Error fetching file' });
  }
});




// Route to delete a document
// Route to delete a file
app.delete('/api/files/delete/:fileId', async (req, res) => {
  const { fileId } = req.params;

  try {
    // Delete the document from the database
    await DocumentModel.findByIdAndDelete(fileId);

    // Send a success response
    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ error: 'Error deleting file' });
  }
});

// Route to get Booked orders:
app.get('/api/orders/booked/:orderType/:timeRange', async (req, res) => {
  const { orderType, timeRange } = req.params;

  try {
    let startDate;
    let endDate;

    // Set start and end dates based on time range
    switch (timeRange) {
      case 'weekly':
        startDate = moment().startOf('week');
        endDate = moment().endOf('week');
        break;
      case 'monthly':
        startDate = moment().startOf('month');
        endDate = moment().endOf('month');
        break;
      default: // 'all'
        startDate = null;
        endDate = null;
        break;
    }

    let orders;

    // Fetch orders based on order type
    switch (orderType) {
      case 'divan':
        orders = await DevanModel.find({
          ...(startDate && endDate && { submissionDate: { $gte: startDate, $lte: endDate } }),
          status: 'Booked' // Add condition for status
        });
        break;
      case 'sleigh':
        orders = await SleighModel.find({
          ...(startDate && endDate && { submissionDate: { $gte: startDate, $lte: endDate } }),
          status: 'Booked' // Add condition for status
        });
        break;
      case 'mattress':
        orders = await MattressModel.find({
          ...(startDate && endDate && { submissionDate: { $gte: startDate, $lte: endDate } }),
          status: 'Booked' // Add condition for status
        });
        break;
      default:
        return res.status(400).json({ error: 'Invalid order type' });
    }

    return res.json(orders);
  } catch (error) {
    return errorHandler(error, res);
  }
});

// Route to get Cancelled orders:
app.get('/api/orders/cancelled/:orderType/:timeRange', async (req, res) => {
  const { orderType, timeRange } = req.params;
  console.log('Received orderType:', orderType);
  console.log('Received timeRange:', timeRange);

  try {
    let startDate;
    let endDate;

    // Set start and end dates based on time range
    switch (timeRange) {
      case 'weekly':
        startDate = moment().startOf('week');
        endDate = moment().endOf('week');
        break;
      case 'monthly':
        startDate = moment().startOf('month');
        endDate = moment().endOf('month');
        break;
      default: // 'all'
        startDate = null;
        endDate = null;
        break;
    }

    let orders;

    // Fetch orders based on order type
    switch (orderType) {
      case 'divan':
        orders = await DevanModel.find({
          ...(startDate && endDate && { submissionDate: { $gte: startDate, $lte: endDate } }),
          status: 'Cancelled' // Add condition for status
        });
        break;
      case 'sleigh':
        orders = await SleighModel.find({
          ...(startDate && endDate && { submissionDate: { $gte: startDate, $lte: endDate } }),
          status: 'Cancelled' // Add condition for status
        });
        break;
      case 'mattress':
        orders = await MattressModel.find({
          ...(startDate && endDate && { submissionDate: { $gte: startDate, $lte: endDate } }),
          status: 'Cancelled' // Add condition for status
        });
        break;
      default:
        return res.status(400).json({ error: 'Invalid order type' });
    }

    return res.json(orders);
  } catch (error) {
    return errorHandler(error, res);
  }
});

// Backend API to get the total number of items ordered this month
app.get('/api/ordermonthly', async (req, res) => {
  try {
    // Get the current month's start and end dates
    const startDate = moment().startOf('month');
    const endDate = moment().endOf('month');

    // Fetch orders from SleighModel, DevanModel, and MattressModel for the current month
    const sleighOrders = await SleighModel.countDocuments({ submissionDate: { $gte: startDate, $lte: endDate } });
    const devanOrders = await DevanModel.countDocuments({ submissionDate: { $gte: startDate, $lte: endDate } });
    const mattressOrders = await MattressModel.countDocuments({ submissionDate: { $gte: startDate, $lte: endDate } });

    // Calculate total number of items ordered this month
    const totalItemsOrderedThisMonth = sleighOrders + devanOrders + mattressOrders;

    // Send the total number of items ordered this month to the frontend
    return res.json({ totalItemsOrderedThisMonth });
  } catch (error) {
    return errorHandler(error, res);
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


