
require('dotenv').config();
const express=require('express');
const app=express();
const path=require('path');
const verifyJWT=require('./middleware/verifyJWT');
const cors=require('cors');
const corsOptions=require('./config/corsOptions');
const mongoose=require('mongoose');
const connectDB=require('./config/dbConn.js');
const credentials = require('./middleware/credentials.js');

const cookieParser=require('cookie-parser');
const PORT=process.env.PORT||8080;
connectDB();
app.use(credentials);
//cors cross origin resource sharing

app.use(cors(corsOptions));

//middleware to get the data from form submitted
app.use(express.urlencoded({ extended:false }));

app.use(express.json());
app.use(cookieParser());


app.use('/',express.static(path.join(__dirname, 'public')));
app.use('/',require('./routes/root'));
app.use('/register',require('./routes/api/register.js'));
app.use('/auth',require('./routes/api/auth'));
app.use('/refresh',require('./routes/api/refresh.js'));
app.use('/logout',require('./routes/api/logout.js'));

app.use('/profile',verifyJWT,require('./routes/api/profile.js'));
app.use('/api/register',verifyJWT,require('./routes/api/eventRegister.js'));


mongoose.connection.once('open',()=>{
    console.log('connected to mongodb');
    app.listen(PORT,()=>console.log(`server running on ${PORT}`));
})
