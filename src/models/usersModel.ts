import mongoose from 'mongoose';

const UserSchema=new mongoose.Schema({
    userEmail:{type:String,required:true},
    orgUniqName:{type:String,required:true},
    firstName:{type:String, required:true},
    lastName:{type:String,required:true},
    wfh:{type:Number, required:true},
    dateOfJoining:{type:Date,required:true},
    dateOfBirth:{type:Date,required:true},
    deleted:{type:Boolean,required:true}  
});

export const UserModel=mongoose.model("Users",UserSchema);