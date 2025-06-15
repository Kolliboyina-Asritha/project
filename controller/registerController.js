const User=require('../model/user');

const bcrypt=require('bcrypt');


const handleNewUser=async (req,res)=>{
    const{name,email,user,pwd}=req.body;
    if(!user||!pwd||!email) return res.status(400).json({'message':'username and password are required'});
    


    //check for duplicate username in the db
    const duplicate = await User.findOne({ $or: [{ username: user }, { email: email }]}).exec();

    if(duplicate) return res.status(409).json({'message':'duplicate'});//conflict
    try{
       //encrypt the password
       const hashedpwd=await bcrypt.hash(pwd,10);//It hashes the plain-text password (pwd) using bcrypt, and stores the result in the variable hashedpwd
       //create and store new user
       const result= await User.create({
          name,
          email,
          "username":user,
          "password":hashedpwd
        });

        //const newUser=new User();
        //const result=await newUser.save()

       
       console.log(result);
       res.status(201).json({'success':`new user ${user} created!`});
    }
    catch (err){
        res.status(500).json({'message':err.message});
    }

}
module.exports={handleNewUser};