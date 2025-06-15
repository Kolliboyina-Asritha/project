const express = require('express');
const router = express.Router();
const verifyJWT = require('../../middleware/verifyJWT');
const Hackathon = require('../../model/hackathon');
const Failathon = require('../../model/failathon');
const Quiz = require('../../model/quiz');

// Middleware to protect routes
router.use(verifyJWT);

// POST: Hackathon
router.post('/hackathon', async (req, res) => {
  try {
    console.log("Received data:", req.body); 
    
    const newEntry = new Hackathon({
      ...req.body,
      username: req.user
    });
    await newEntry.save();
    res.status(201).json({ message: 'Hackathon registration successful' });
  } catch (err) {
    console.log('Error occurred:', err.message);
    res.status(400).json({ error: err.message });
  }
});

// POST: Failathon
router.post('/failathon', async (req, res) => {
  try {
    const newEntry = new Failathon({
      ...req.body,
      username: req.user
    });
    await newEntry.save();
    res.status(201).json({ message: 'Failathon registration successful' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST: Quiz
router.post('/quiz', async (req, res) => {
  try {
    const newEntry = new  Quiz({
      ...req.body,
      username: req.user
    });
    await newEntry.save();
    res.status(201).json({ message: 'Quiz registration successful' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
