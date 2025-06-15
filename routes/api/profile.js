const express = require('express');
const router = express.Router();
const verifyJWT = require('../../middleware/verifyJWT');
const UserDetails = require('../../model/userDetails');
const Hackathon = require('../../model/hackathon');
const Failathon = require('../../model/failathon');
const Quiz = require('../../model/quiz');
const eventInfo = require('../../utils/eventInfo');
router.get('/',verifyJWT, async (req,res)=>{
    try{
        console.log('Accessing /profile for user:', req.user);
        
       const foundUserDetails = await UserDetails.findOne({ username: req.user });
       console.log('foundUserDetails:', foundUserDetails);
       if (foundUserDetails) {
         // If profile exists, send it
         res.json({ exists: true, profile:foundUserDetails });
        }
       else{
          res.json({ exists: false });
       }
    }   
    catch (err){
        console.log(err);
    }
});
router.post('/',verifyJWT,async (req,res)=>{
    try{
        const { name, email, phone, college, course, year } = req.body;
        const newDetails = new UserDetails({username: req.user,name, email, phone,college,course,year});
        await newDetails.save();
        res.status(201).json({ message: 'Profile saved successfully' });
    }
    catch (err){
        console.log(err);
    }
});
router.get('/registrations', verifyJWT, async (req, res) => {
  const username = req.user;

  try {
    const [hackathons, failathons, quizzes] = await Promise.all([
      Hackathon.find({ username }),
      Failathon.find({ username }),
      Quiz.find({ username })
    ]);

    const mappedHackathons = hackathons.map(reg => ({
      ...reg.toObject(),
      ...eventInfo.hackathon
    }));

    const mappedFailathons = failathons.map(reg => ({
      ...reg.toObject(),
      ...eventInfo.failathon
    }));

    const mappedQuizzes = quizzes.map(reg => ({
      ...reg.toObject(),
      ...eventInfo.quiz
    }));

    res.json({
      hackathons: mappedHackathons,
      failathons: mappedFailathons,
      quizzes: mappedQuizzes
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching registered events." });
  }
});


module.exports=router;