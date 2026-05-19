const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// User Model
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);

// Patient Model
const PatientSchema = new mongoose.Schema({
  username: { type: String, required: true },
  firstName: String,
  lastName: String,
  dateOfBirth: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  zipCode: String,
});

const Patient = mongoose.model('Patient', PatientSchema);

// Medical History Model
const MedicalHistorySchema = new mongoose.Schema({
  username: { type: String, required: true },
  conditions: [String],
  additionalNotes: String,
});
const MedicalHistory = mongoose.model('MedicalHistory', MedicalHistorySchema);

// Medical History
app.post('/api/patient/medical-history', async (req, res) => {
  try {
    const history = new MedicalHistory(req.body);
    await history.save();
    res.json({ message: 'Medical history saved!' });
  } catch (err) {
    res.status(400).json({ error: 'Could not save medical history' });
  }
});

// Register
app.post('/api/auth/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashed });
    await user.save();
    res.json({ message: 'User created!' });
  } catch (err) {
    res.status(400).json({ error: 'Username already exists' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'User not found' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Wrong password' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, username });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Save Patient Info
app.post('/api/patient/info', async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.json({ message: 'Patient info saved!' });
  } catch (err) {
    res.status(400).json({ error: 'Could not save patient info' });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});