const express = require('express');
const cors = require('cors');
const {userRouter} = require('./routes/user');
const { default: mongoose } = require('mongoose');
const { hospitalRouter } = require('./routes/hospital');
require('dotenv').config()
const app = express();
app.use(cors());
app.use(express.json());
app.get('/',(req,res)=>{
    // heath check
    res.send("hello world")
});
app.use("/user",userRouter);
app.use("/doctor",userRouter);
app.use("/receptionist",userRouter);
app.use("/pharmacy",userRouter);
app.use("/admin",userRouter);
app.use("/hospital",hospitalRouter);

mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log('app connected to database');
        app.listen(3000,()=> {
            console.log(`app is listening to port:3000`);
        });
    })
    .catch((error)=>{
        console.log(error);
    });