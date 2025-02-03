const express = require('express');
const { Hospitals } = require('../models/hospital');
const hospitalRouter  = express.Router();
hospitalRouter.get("/all",async(req,res)=>{
    const hospitals =await Hospitals.find();
    res.json({
        hospitals
    })
});
hospitalRouter.get("/:id",(req,res)=>{
    const id = req.params.id;
    const data = Hospitals.findOne({
        _id:id
    })
    res.json({
        data
    })
})
module.exports = {hospitalRouter}