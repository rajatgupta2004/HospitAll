const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})
userSchema.pre('save',function(next){
    if(this.isModified('password')){
        bcrypt.hash(this.password,10,(err,hashed)=>{
            if(err)return next(err);
            this.password = hashed;
            next();
        })
    }
})
userSchema.methods.comparePass = async(password)=>{
 if(!password) return new Error("password is empty");
 try{
    const result = bcrypt.compare(password , this.password);
    return result;
 }catch(err) {
    console.log(err);
 }
}
const Users =  mongoose.model('Users',userSchema);
module.exports = {Users};