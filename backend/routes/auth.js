const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const authmiddleware=async(req,res,next)=>{
    const jwtToken = req.headers.authorization.split(" ")[1];
    try{
        const {user_id} = jwt.verify(jwtToken,JWT_SECRET);
        req.userId = user_id; 
        next();
    }catch(err){
        return res.status(403).json({
            message:"some error occured"
        });
    }
}   
const jwtsign =(id)=>{
    const result =jwt.sign({id},JWT_SECRET);
    return result;
}
module.exports = {authmiddleware,jwtsign};