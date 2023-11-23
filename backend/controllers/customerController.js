const Customer = require('../models/Customer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

exports.registerCustomer = async (req, res) => {
  const { username,
     password ,
     email,
    age,
    website,
    introduction,
    address,
    street
  } = req.body;

  try {
    const existingCustomer = await Customer.findOne({ username });

    if (existingCustomer) {
      return res.status(400).json({ message: 'Username already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const customer = new Customer({
      username,
      password: hashedPassword,
      email,
      age,
      website,
      introduction,
      address,
      street
    });

    await customer.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.loginCustomer = async (req, res) => {
  const { username, password } = req.body;

  try {
    const customer = await Customer.findOne({ username });

    if (!customer) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const passwordMatch = await bcrypt.compare(password, customer.password);

    if (passwordMatch) {
      const token = jwt.sign({ username: customer.username }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Authentication failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllCustomers = async(req,res)=>{
  try {
    const customer = await Customer.find({});

    if (!customer) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    res.status(200).json(customer)
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
