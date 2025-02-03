const express = require('express');
const {Users} = require('../models/user');
const { Hospitals } = require('../models/hospital');
const { jwtsign } = require('./auth');
const Beds = require('../models/beds');
const OPDQueue = require('../models/opd');
const userRouter = express.Router();
const zod = require('zod');
const mongoose = require('mongoose');
const signupBody = zod.object({
    name:zod.string(),
    email:zod.string(),
    password:zod.string()
});
const signinBody = zod.object({
    username:zod.string().email(),
    password:zod.string()
});


userRouter.post('/signup',async (req,res)=>{
    const data = req.body;
    const {success} = await signupBody.safeParse(data);
    console.log(data);
    if(!success) return res.json({message:"wrong input format"});

    const existingUser = await Users.findOne({ email: data.email });

    if (existingUser) {
        return res.status(400).json({ error: 'User with the same email already exists' });
    }
    console.log(existingUser);

    const savedata = new Users(data);
    await savedata.save();
    
    const id = savedata._id;
    const token = jwtsign(id);
    res.json({
        data:savedata,
        token
    })    
})

userRouter.post('/signin',async (req,res)=>{
    const {success} = signinBody.safeParse(req.body);
    const userData = await Users.findOne({
        username:req.body.username
    })
    if(!userData || !success){
        return res.status(411).json({
            message:"Wrong username or password"
        });
    }


   const result =  await bcrypt.compare(req.body.password,userData.password);

    if(!result){
        return res.status(411).json({
            message:"Wrong username or password"
        });
    }
    const token = jwt.sign({
        user_id:userData._id
    },JWT_SECRET);

    res.status(200).json({
        token
    })
    

});


userRouter.get('/home',async (req,res)=>{
    const filter = req.query.filter || "";

    const hospital = await Hospitals.find({
        name:{
            "$regex":filter
        }
    });
    res.json({
        hospital
    })
});

userRouter.get('/:id',async (req,res)=>{
    const _id = req.params.id;
    const data = await Hospitals.findOne({
        _id
    });
    res.json({
        data
    })

});

userRouter.post('/bookbed',async(req,res)=>{
    const data = req.body;
    const newBed = new Beds(data);
    newBed.patient = req.userId;
    await newBed.save();
    res.json({
        message:"Bed booked successfullly"
    })

})

userRouter.post('/opd/booking',async (req,res)=>{
    const userId = req.body.userId;
    const queueNumber = 1;
    const status = "waiting";
    const department = "Eye doctor";
    const hospital = req.body.hospital;
    const newopd = new OPDQueue({
        userId,
        queueNumber,
        department,
        hospital
    });
    await newopd.save();
    res.json({
        newopd
    });
})

userRouter.post('/opd',async (req,res)=>{
    const hospital = new mongoose.Types.ObjectId(req.query.hospital);
    const department = req.query.department;
    const opd = await OPDQueue.find({
        hospital,
        department
    });

    res.json({
        opd
    });
})

module.exports = {userRouter}