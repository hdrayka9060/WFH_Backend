import mongoose from 'mongoose';

const SystemUserSchema=new mongoose.Schema({
    email:{type:String, required:true},
});

export const SystemUserModel=mongoose.model("SystemUser",SystemUserSchema);