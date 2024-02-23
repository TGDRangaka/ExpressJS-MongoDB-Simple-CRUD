const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
const uri = require('./atlas_uri');
const router = require('./routes/customer_route');

app.use(express.json());
app.use(router);

// Conect to Database
mongoose.connect(uri)
.then(()=>{
    console.log('Connected to MongoDB');
}).catch(err => console.error(err));

// Start server in port 3000
app.listen(port, () => console.log(`listening on port ${port}...`));
