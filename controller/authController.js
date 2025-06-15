require('dotenv').config();

const User=require('../model/user');

const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
console.log('ACCESS_TOKEN_SECRET:', process.env.ACCESS_TOKEN_SECRET);



const handleLogin=async (req,res)=>{
    const{user,pwd}=req.body;
    if(!user||!pwd) return res.status(400).json({'message':'username and password must required'});
    const foundUser = await User.findOne({$or: [{ username: user }, { email: user }]}).exec();

    if(!foundUser) return res.sendStatus(401);
    //evaluate password
    const match=await bcrypt.compare(pwd,foundUser.password);
    if(match){
        const roles=Object.values(foundUser.roles);
        //create jwts
        const accessToken=jwt.sign(
            {
              "UserInfo":{
                   "username":foundUser.username,
                   "roles":roles
                }           
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'10m'}
        );
        const refreshToken=jwt.sign(
            {"username":foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:'1d'}
        );
        //saving refresh token with current user
        foundUser.refreshToken=refreshToken;
        const result=await foundUser.save();
        console.log(result);
        
        res.cookie('jwt', refreshToken, {
         httpOnly: true,
         maxAge: 24*60*60*1000, // 10 minutes
         sameSite: 'Lax'
        });//If you're testing locally (e.g., http://localhost:3000), secure: true and sameSite: 'none' will silently block the cookie.

        res.json({accessToken});
    }
    else{
        res.sendStatus(401);
    }
}
module.exports={handleLogin};