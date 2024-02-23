const express = require('express');
const Customer = require('../models/customer');

const router = express.Router();

router.post('/customer', (req, res) =>{
    const customer = new Customer(req.body);
    customer.save()
    .then( c => res.status(200).json({success: true, message: 'Customer saved successfully'}))
    .catch(err => res.status(500).json({error: err}));
});


router.get('/customer', (req, res) => {
    Customer.find()
 .then( customers => res.status(200).json({customers: customers}))
 .catch(err => res.status(500).json({error: err}))
});

router.put('/customer', (req, res) => {
    // Customer.findByIdAndUpdate(req.body._id, req.body, {new: true})
    Customer.findByIdAndUpdate(req.body._id, {$set: req.body})
 .then(customer => res.status(200).json({success: true, message: 'Customer updated successfully'}))
 .catch(err => res.status(500).json({error: err}));
});

router.delete('/customer/:id', (req, res) => {
    Customer.findByIdAndDelete(req.params.id)
    .then(customer => res.status(200).json({success:true, message: 'Customer deleted successfully'}))
    .catch(err => res.status(500).json({error: err}));
});

module.exports = router;