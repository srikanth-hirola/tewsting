const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');
const Customer = require('../models/Customer');

exports.registerUser = async (req, res) => {
  const { username,
     password ,
     email,
    age,
    website,
    introduction,
    address,
    street,
    getUser
  } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'Username already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
      email,
      age,
      website,
      introduction,
      address,
      street,
      getUser
    });

    await user.save();
    const customer = await Customer.findById(getUser)
    customer.user.push()
    await customer.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = jwt.sign({ username: user.username }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Authentication failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
exports.getAllUsers = async(req,res)=>{
  try {
    const user = await User.find({});

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    res.status(200).json(user)
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}