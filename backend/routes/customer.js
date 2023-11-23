const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.post('/register', customerController.registerCustomer);
router.post('/login', customerController.loginCustomer);
router.get('/get-customers', customerController.getAllCustomers);

module.exports = router;
