const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const dotenv = require('dotenv');

// dotenv.config();
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

const contactRoutes = require('./routes/ContactRoutes');
app.use('/contacts', contactRoutes);

mongoose.connect(process.env.DB_URI, { 
    // useNewUrlParser: true, 
    //  useUnifiedTopology: true 
    serverSelectionTimeoutMS: 5000
 })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));