import mongoose from 'mongoose';

const UserSchema=new mongoose.Schema({
    userId:{type:String, required:true},
    userEmail:{type:String,required:true},
    orgUniqName:{type:String,required:true},
    firstName:{type:String, required:true},
    lastName:{type:String,required:true},
    wfh:{type:Number, required:true},
    deleted:{type:Boolean,required:true},

    dateOfBirthDay:{type:Number,required:true},
    dateOfBirthMonth:{type:Number,required:true},
    dateOfBirthYear:{type:Number,required:true},
    
    dateOfJoiningDay:{type:Number,required:true},
    dateOfJoiningMonth:{type:Number,required:true},
    dateOfJoiningYear:{type:Number,required:true},
});

export const UserModel=mongoose.model("Users",UserSchema);