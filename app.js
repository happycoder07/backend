const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const billRoutes = require('./routes/billRoutes');
const brandRoutes = require('./routes/brandRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const customerRoutes = require('./routes/customerRoutes');
const addressRoutes = require('./routes/addressRoutes');
const authRoutes = require('./routes/authRoutes');
const cookieParser= require('cookie-parser')
const listEndpoints = require('express-list-endpoints');
dotenv.config();

connectDB();

const app = express();
const corsOptions = {
  origin: '*', 
  credentials: true// Replace with your allowed origin
};
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use('/api/users', userRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/auth', authRoutes);


app.get('/api/data', (req, res) => {
    // Example data (you can replace this with any data you want to return)
    const data = {
      message: 'Hello, this is your Express API!',
      timestamp: new Date()
    };
  
    // Send the data as JSON
    res.json(data);
  });
  

const PORT = process.env.EXPRESS_PORT || 5000 ;
console.log(listEndpoints(app));


app.listen(PORT, console.log(`Server running on port ${PORT}`));
