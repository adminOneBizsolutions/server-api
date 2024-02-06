process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const locationRoutes = require('./routes/locationRoutes');
const businessRoutes = require('./routes/businessRoutes');
const clientRoutes = require('./routes/clientRoutes');

dotenv.config()

const app = express()
const port = process.env.PORT || 8008 
const dbURL = process.env.DATABASE_URL;

// MongoDB Connection
mongoose.connect(dbURL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

mongoose.set('strictQuery', false)
 
let db = mongoose.connection
db.once('open', () => console.log('Connected to MongoDB!'))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/location', locationRoutes);
app.use('/api/v1/business', businessRoutes);
app.use('/api/v1/client', clientRoutes);

app.listen(port, () => {
	console.log(`API is now running on localhost: ${port}`)
})