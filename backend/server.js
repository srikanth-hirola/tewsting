const app = require('./app');
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://srikanthhirolahrm:Hirola@cluster0.xfk1et6.mongodb.net', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('MongoDB connected successfully');
});